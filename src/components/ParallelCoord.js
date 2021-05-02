import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const ParallelCoord = (props) => {
  const svgRef = useRef();
  const preRef = useRef();
  const [filtered, setFiltered] = useState([]);
  var margin = { top: 30, right: 10, bottom: 10, left: -127 };
  var width = 800 - margin.left - margin.right;
  var height = 550 - margin.top - margin.bottom;

  const color = () => {
    const colors = [
      "rgba(1,40,64,0.4)",
      "rgba(3,101,140,0.4)",
      "rgba(3,115,140,0.4)",
      "rgba(4,173,191,0.4)",
      "rgba(97,217,41,0.4)",
    ];
    const foreground = document.querySelectorAll(".foreground path");

    if (foreground) {
      for (let i = 0; i < foreground.length; i++) {
        var item = colors[Math.floor(Math.random() * colors.length)];
        foreground[i].style.stroke = item;
      }
    }
  };

  const drawChart = () => {
    if (props.data && props.data.length > 0) {
      const svg = d3.select(svgRef.current);

      var x = d3.scalePoint().range([0, width]).padding(1),
        y = {};

      var line = d3.line(),
        axis = d3.axisLeft(),
        background,
        foreground;

      var dimensions = null;

      const svg_adjusted = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var out = d3.select(preRef.current);
      out.text(d3.tsvFormat(props.data.slice(0, 24)));

      // Extract the list of dimensions and create a scale for each.
      x.domain(
        (dimensions = Object.keys(props.data[0]).filter(function (d) {
          return (
            d !== "color" &&
            (y[d] = d3
              .scaleLinear()
              .domain(
                d3.extent(props.data, function (p) {
                  return +p[d];
                })
              )
              .range([height, 0]))
          );
        }))
      );

      // Add grey background lines for context.
      background = svg_adjusted
        .append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(props.data)
        .enter()
        .append("path")
        .attr("d", path);

      // Add blue foreground lines for focus.
      foreground = svg_adjusted
        .append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(props.data)
        .enter()
        .append("path")
        .attr("d", path);

      // Add a group element for each dimension.
      const g = svg_adjusted
        .selectAll(".dimension")
        .data(dimensions)
        .enter()
        .append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) {
          return "translate(" + x(d) + ")";
        });

      // Add an axis and title.
      g.append("g")
        .attr("class", "axis")
        .each(function (d) {
          d3.select(this).call(axis.scale(y[d]));
        })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function (d) {
          return d;
        });

      // Add and store a brush for each axis.
      g.append("g")
        .attr("class", "brush")
        .each(function (d) {
          d3.select(this).call(
            (y[d].brush = d3
              .brushY()
              .extent([
                [-10, 0],
                [10, height],
              ])
              .on("brush", brush)
              .on("end", brush))
          );
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

      // Returns the path for a given data point.
      function path(d) {
        return line(
          dimensions.map(function (p) {
            return [x(p), y[p](d[p])];
          })
        );
      }

      // Handles a brush event, toggling the display of foreground lines.
      function brush() {
        var actives = [];
        svg
          .selectAll(".brush")
          .filter(function (d) {
            y[d].brushSelectionValue = d3.brushSelection(this);
            return d3.brushSelection(this);
          })
          .each(function (d) {
            // Get extents of brush along each active selection axis (the Y axes)
            actives.push({
              dimension: d,
              extent: d3.brushSelection(this).map(y[d].invert),
            });
          });

        var selected = [];
        // Update foreground to only display selected values
        foreground.style("display", function (d) {
          let isActive = actives.every(function (active) {
            let result =
              active.extent[1] <= d[active.dimension] &&
              d[active.dimension] <= active.extent[0];
            return result;
          });
          // Only render rows that are active across all selectors
          if (isActive) selected.push(d);
          return isActive ? null : "none";
        });

        // Render data as asimple grid
        actives.length > 0
          ? out.text(d3.tsvFormat(selected))
          : out.text(d3.tsvFormat(props.data));

        setFiltered(selected);
      }

      svg.property("value", props.data).node();
    }
  };

  useEffect(() => {
    drawChart();
    color();
  }, [props.data]);

  return (
    <div className="parallelCoord">
      <div className="row">
        <div className="col-12">
          {props.data.length > 0 ? (
            <div>
              <h4>
                <b>Tipo RCIU:</b> {props.tipo}
              </h4>
              <svg
                ref={svgRef}
                height={height + margin.top + margin.bottom}
                width={width + margin.left + margin.right}
                className="parallel-svg"
              ></svg>
              <h3 className="pt-3">Datos Seleccionados</h3>
              <div className="tableData">
                {props.data.length > 0 ? (
                  <pre ref={preRef} className="pt-3"></pre>
                ) : (
                  <p className="p-3 text-center">
                    Por favor selecciona variables de consulta
                  </p>
                )}
              </div>
              <div className="pt-3">
                <p>
                  Registros:{" "}
                  {props.data && props.data.length > 0
                    ? filtered && filtered.length > 0
                      ? filtered.length
                      : props.data.length
                    : 0}
                </p>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParallelCoord;
