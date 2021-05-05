import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";

function RelativeFreqGraph(props) {
  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="relativeFreqGraph">
      {Object.entries(props.dataRel).length !== 0 ? (
        <div>
          {" "}
          <h5>
            <b>{props.title}</b>
          </h5>
          <CanvasJSChart options={props.dataRel} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default RelativeFreqGraph;
