import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { getStages } from "../actions/etapasAction";
import { getTopics } from "../actions/temasAction";
import {
  getData,
  getYears,
  getVars,
  getValuesByVar,
  getDictByVar,
  getDiscreteDist,
  getContinuosDist,
  groupByYearsVar,
} from "../actions/medidasAction";
import CanvasJSReact from "../assets/canvasjs.react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import GroupedBar from "../components/GroupedBar";
// import * as d3 from "d3";
// import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";

const Home = () => {
  // Estados de interacción con el usuario
  const [etapas, setEtapas] = useState([]);
  const [etapaSelected, setEtapaSelected] = useState("");
  const [temasInteres, setTemas] = useState([]);
  const [temaSelected, setTemaSelected] = useState([]);
  const [anios, setAnios] = useState([]);
  const [aniosSelected, setAniosSelected] = useState([]);
  const [variables, setVariables] = useState([]);
  const [varsSelected, setVarsSelected] = useState([]);

  // Estados para gráficas y datos de visualizaciones
  const [data, setData] = useState([]);
  const [dataBar, setDataBar] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataDist, setDataDist] = useState([]);
  const [dataUnit, setDataUnits] = useState("");
  const [valores, setValores] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [tipoGraph, setTipoGraph] = useState("column");
  const [dataGroup, setDataGroup] = useState([]);
  const [error, setError] = useState(false);
  const [tipoData, settipoData] = useState("ninguno");
  const [lineType, setLineType] = useState("line");
  const [groupData, setGroupData] = useState([]);

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // Definición parámetros para gráfica de datos agrupados por año y variable
  // Conjunto de datos
  const datasetGroup = {
    labels: valores.map((valor) => valor.valor),
    datasets: groupData,
  };

  // Opciones del gráfico
  const optionsGroup = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Custom Chart Title",
      },
    },
    responsive: true,
  };

  // Definición parámetros para gráfica de datos continuos (una variable)
  // Configuración del gráfico
  const optionsContinuo = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    zoomEnabled: true,
    zoomType: "xy",
    subtitles: [
      {
        text: "Selecciona una zona para hacer zoom",
        fontStyle: "italic",
      },
    ],
    title: {
      text: `${
        varsSelected.length > 0 && aniosSelected.length > 0
          ? "Gráfica " + varsSelected[0].value + " en " + aniosSelected[0].value
          : "Gráfica"
      }`,
    },
    axisY: {
      includeZero: true,
      title: `Cantidad`,
    },
    axisX: {
      title: varsSelected.length > 0 ? varsSelected[0].value + dataUnit : "",
    },
    data: [
      {
        type: lineType,
        color: "LightSeaGreen",
        //indexLabel: "{y}", //Shows y value on all Data Points
        markerType: "none",
        toolTipContent: `Valor: {x} ${dataUnit}, Cantidad : {y}`,
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: dataDist,
      },
    ],
  };

  // Definición parámetros para gráfica de datos discretos (una variable)
  // Configuración del gráfico
  const optionsDiscreto = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", //"light1", "dark1", "dark2"
    zoomEnabled: true,
    zoomType: "xy",
    subtitles: [
      {
        text: "Selecciona una zona para hacer zoom",
        fontStyle: "italic",
      },
    ],
    title: {
      text: `${
        varsSelected.length > 0 && aniosSelected.length > 0
          ? "Gráfica " + varsSelected[0].value + " en " + aniosSelected[0].value
          : "Gráfica"
      }`,
    },
    axisY: {
      includeZero: true,
      title: `Cantidad`,
    },
    axisX: {
      title: varsSelected.length > 0 ? varsSelected[0].value + dataUnit : "",
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        toolTipContent: `Valor: {x} ${dataUnit}, Cantidad : {y}`,
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: dataDist,
      },
    ],
  };

  // Definición parámetros para gráfica de datos ordinales y nominales (una variable)
  // Configuración del gráfico
  const optionsNominalOrdinal = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: `${
        varsSelected.length > 0 && aniosSelected.length > 0
          ? "Gráfica " + varsSelected[0].value + " en " + aniosSelected[0].value
          : "Gráfica"
      }`,
    },
    axisY: {
      title: `Cantidad`,
    },
    axisX: {
      title: varsSelected.length > 0 ? varsSelected[0].value + dataUnit : "",
    },
    data: [
      {
        type: tipoGraph,
        startAngle: tipoGraph === "pie" ? 75 : 0,
        showInLegend: tipoGraph === "pie" ? "true" : "false",
        legendText: tipoGraph === "pie" ? "{label}" : " ",
        toolTipContent:
          tipoGraph === "pie"
            ? "{y}%"
            : `Valor: {x} ${dataUnit}, Cantidad : {y}`,
        dataPoints: tipoGraph === "column" ? dataBar : dataPie,
      },
    ],
  };

  // Define las unidades de medida de los datos dependiendo de la variable seleccionada
  const getDataUnits = () => {
    if (varsSelected[0].label.includes("peso")) {
      setDataUnits(" (kg)");
    } else if (varsSelected[0].label.includes("talla")) {
      setDataUnits(" (cm)");
    } else if (varsSelected[0].label.includes("Dias")) {
      setDataUnits(" (días)");
    } else if (varsSelected[0].label.includes("gestacional")) {
      setDataUnits(" (semana)");
    } else if (varsSelected[0].label.includes("edad")) {
      setDataUnits(" (años)");
    }
  };

  // API Calls
  const getEtapas = async () => {
    const data = await getStages();
    setEtapas(data);
  };

  // Fetch de los temas de interés
  const getTemas = async () => {
    const data = await getTopics();
    setTemas(data);
  };

  // Fetch de query principal de datos
  const getDatos = useCallback(async () => {
    if (
      variables.length > 0 ||
      etapaSelected ||
      aniosSelected.length > 0 ||
      temaSelected.length > 0
    ) {
      setClicked(!clicked);

      const data = await getData(
        etapaSelected,
        temaSelected,
        aniosSelected,
        varsSelected
      );
      setData(data);

      defineData(varsSelected[0]);

      if (
        varsSelected[0].tipo === "ordinal" ||
        varsSelected[0].tipo === "nominal"
      ) {
        if (varsSelected.length > 0) {
          const fields = await getValuesByVar(varsSelected[0].value);

          const values = await getDictByVar(varsSelected[0].value);
          setValores(values);

          const dataChart = [];
          const dataPie = [];
          const total = data.length;

          if (!aniosSelected) {
            for (let i = 0; i < anios.length; i++) {
              dataChart.push({
                x: anios[i],
                y: fields[i],
              });
            }
            setDataBar(dataChart);
          } else {
            if (aniosSelected.length === 1) {
              var split = varsSelected[0].value.split(".");
              var first = split[0];
              var second = split[1];

              for (let i = 0; i < values.length; i++) {
                if (fields[i] === values[i]["key"]) {
                  dataChart.push({
                    label: values[i]["valor"],
                    y: varsSelected[0].value.includes(".")
                      ? data
                          .filter((obj) => !!obj[first])
                          .filter(
                            (obj) => obj[first][second] === values[i]["key"]
                          ).length
                      : data.filter(
                          (obj) =>
                            obj[varsSelected[0].value] === values[i]["key"]
                        ).length,
                  });
                }
              }

              for (let i = 0; i < values.length; i++) {
                var porcentaje = varsSelected[0].value.includes(".")
                  ? (data
                      .filter((obj) => !!obj[first])
                      .filter((obj) => obj[first][second] === values[i]["key"])
                      .length /
                      total) *
                    100
                  : (data.filter(
                      (obj) => obj[varsSelected[0].value] === values[i]["key"]
                    ).length /
                      total) *
                    100;
                dataPie.push({
                  label: values[i]["valor"],
                  y: Math.round(porcentaje * 100) / 100,
                });
              }
              setDataBar(dataChart);
              setDataPie(dataPie);
              getDataUnits();
            } else {
              // Mostrar gráfico agrupado por años

              const groupedData = await groupByYearsVar(
                aniosSelected.map((anios) => anios.value),
                varsSelected.map((vars) => vars.value)
              );

              setGroupData(groupedData);
            }
          }
        } else {
          setError(true);

          if (etapaSelected || temaSelected.length > 0 || aniosSelected > 0) {
            setError(false);
          }
        }
      } else if (varsSelected[0].tipo === "discreto") {
        const dist = await getDiscreteDist(
          varsSelected[0].value,
          aniosSelected[0].value
        );

        setDataDist(dist);
        getDataUnits();
      } else if (varsSelected[0].tipo === "continuo") {
        const dist = await getContinuosDist(
          varsSelected[0].value,
          aniosSelected[0].value
        );

        setDataDist(dist);
        getDataUnits();
      }
    }
  }, [aniosSelected, etapaSelected, temaSelected, varsSelected]);

  // Fetch de los años
  const getAnios = async () => {
    const data = await getYears();
    setAnios(data);
  };

  // Fetch de las variables de los datos
  const getVariables = async () => {
    const data = await getVars(etapaSelected, temaSelected);
    const groupsNominal = [];
    const groupsOrdinal = [];
    const groupsDiscreto = [];
    const groupsContinuo = [];
    const groups = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i]["tipo"] === "nominal") {
        groupsNominal.push(data[i]);
      } else if (data[i]["tipo"] === "ordinal") {
        groupsOrdinal.push(data[i]);
      } else if (data[i]["tipo"] === "discreto") {
        groupsDiscreto.push(data[i]);
      } else if (data[i]["tipo"] === "continuo") {
        groupsContinuo.push(data[i]);
      }
    }

    groups.push({ label: "NOMINALES", options: groupsNominal });
    groups.push({ label: "ORDINALES", options: groupsOrdinal });
    groups.push({ label: "DISCRETOS", options: groupsDiscreto });
    groups.push({ label: "CONTINUOS", options: groupsContinuo });

    setDataGroup(groups);
    setVariables(data);
  };

  //Funciones de interacción

  // Define el tipo de gráfico para datos nominales y ordinales (pie o bar)
  const defineChart = (event) => {
    setTipoGraph(event.target.value);
  };

  // Vacía los campos de los selects y de los estados relacionados con los datos
  const cleanFields = () => {
    setEtapaSelected("");
    setTemaSelected([]);
    setAniosSelected([]);
    setVarsSelected([]);
    setData([]);
    setClicked(false);
    setTipoGraph("column");
    setDataPie([]);
    setDataBar([]);
    setDataDist([]);
    setDataUnits("");
    setGroupData([]);
  };

  // Determina los tipos de datos para saber qué graficar
  const defineData = (valueSelected) => {
    if (valueSelected.tipo === "nominal") {
      settipoData("nominal");
    } else if (valueSelected.tipo === "ordinal") {
      settipoData("ordinal");
    } else if (valueSelected.tipo === "discreto") {
      settipoData("discreto");
    } else if (valueSelected.tipo === "continuo") {
      settipoData("continuo");
    }
  };

  // Define el tipo de gráfico para datos nominales
  const defineLineType = (event) => {
    setLineType(event.target.value);
  };

  // Handlers para los Selects
  const onChangeEtapa = (selectedOption) => {
    setEtapaSelected(selectedOption);
    setError(false);
  };

  const onChangeTema = (selectedOption) => {
    setTemaSelected(selectedOption);
    setError(false);
  };

  const onChangeAnios = (selectedOption) => {
    setAniosSelected(selectedOption);
    setError(false);
  };

  const onChangeVars = (selectedOption) => {
    setVarsSelected(selectedOption);
    defineData(selectedOption);
  };

  // UseEffect
  useEffect(() => {
    getAnios();
    getVariables();
    getEtapas();
    getTemas();
  }, [temaSelected, etapaSelected, aniosSelected]);

  // Render
  return (
    <div className="home">
      <Navbar />
      <div className="container">
        <div className="row pt-4">
          <h1 className="text-start">
            <b>Análisis Exploratorio de Datos</b>
          </h1>
        </div>
        <div className="row pt-2">
          <p className="text-start text-justify">
            A continuación encontrará un panel de búsqueda para filtrar los
            datos por etapa, años, temas de interés y variables. Al filtrar los
            datos se podrá ver gráficamente el comportamiento de las variables
            seleccionadas. Estas se ajustarán dependiendo del tipo de variable y
            cantidad seleccionadas, por lo que pueden generarse una o más
            gráficas. Se pueden comparar las variables por diferentes años
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-lg-2 col-md-4 col-sm-6">
            <h2 className="text-start">Etapa</h2>
            <Select
              placeholder="Select..."
              className="basic-single text-start"
              options={etapas}
              value={etapaSelected}
              onChange={onChangeEtapa}
            />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <h2 className="text-start">Años</h2>
            <Select
              className="basic-single text-start"
              isMulti
              value={aniosSelected}
              options={anios}
              onChange={onChangeAnios}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-8">
            <h2 className="text-start">Temas de interés</h2>
            <Select
              className="basic-single text-start"
              isMulti
              value={temaSelected}
              options={temasInteres}
              onChange={onChangeTema}
            />
          </div>
          <div className="col-lg-3 col-md-6 col-sm-8">
            <h2 className="text-start">Variables</h2>
            <Select
              className="basic-single text-start"
              isMulti
              options={dataGroup}
              value={varsSelected}
              onChange={onChangeVars}
            />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 align-self-end">
            <div className="row">
              <div className="col-6">
                {" "}
                <button onClick={getDatos}>Consultar</button>
              </div>
              <div className="col-4">
                {" "}
                <button onClick={cleanFields}>Limpiar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          {error === false ? (
            clicked === true ? (
              data && data.length > 0 ? (
                <div>
                  <h6 className="text-start info-tag col-6">
                    Cantidad de datos: <b>{data.length} registros</b>
                  </h6>
                  <h6 className="text-start info-tag col-6">
                    Cantidad de datos que contienen la variable:{" "}
                    <b>
                      {" "}
                      {varsSelected.length > 0
                        ? tipoData === "nominal" || tipoData === "ordinal"
                          ? aniosSelected.length === 1
                            ? dataBar.reduce((a, b) => a + (b["y"] || 0), 0)
                            : !varsSelected[0].value.includes(".")
                            ? data.filter(
                                (obj) => obj[varsSelected[0].value] != null
                              ).length
                            : data
                                .filter(
                                  (obj) =>
                                    !!obj[varsSelected[0].value.split(".")[0]]
                                )
                                .filter(
                                  (obj) =>
                                    obj[varsSelected[0].value.split(".")[0]][
                                      varsSelected[0].value.split(".")[1]
                                    ] != null
                                ).length
                          : dataDist.reduce((a, b) => a + (b["y"] || 0), 0)
                        : "N/A"}{" "}
                      registros
                    </b>
                  </h6>
                  {tipoData === "nominal" || tipoData === "ordinal" ? (
                    aniosSelected && aniosSelected.length === 1 ? (
                      <div className="graph pt-4">
                        <CanvasJSChart
                          options={optionsNominalOrdinal}
                          /* onRef={ref => this.chart = ref} */
                        />
                        <div className="pt-4">
                          {" "}
                          <select onChange={defineChart}>
                            <option name="column" id="column" value="column">
                              Bar chart
                            </option>
                            <option name="pie" id="pie" value="pie">
                              Pie graph
                            </option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="row pt-4 text-center pb-4">
                        <h3>
                          Gráfica {varsSelected[0].value} comparada en los años:{" "}
                          {aniosSelected.map((anios) => anios.label).join(",")}
                        </h3>{" "}
                        <GroupedBar
                          data={datasetGroup}
                          options={optionsGroup}
                        />
                      </div>
                    )
                  ) : tipoData === "discreto" ? (
                    <div className="graph pt-4">
                      <CanvasJSChart
                        options={optionsDiscreto}
                        /* onRef={ref => this.chart = ref} */
                      />
                    </div>
                  ) : tipoData === "continuo" ? (
                    <div className="graph pt-4">
                      <CanvasJSChart
                        options={optionsContinuo}
                        /* onRef={ref => this.chart = ref} */
                      />
                      <div className="pt-4">
                        {" "}
                        <select onChange={defineLineType}>
                          <option name="line" id="line" value="line">
                            Línea recta
                          </option>
                          <option name="spline" id="spline" value="spline">
                            Línea curva
                          </option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              ) : (
                <div className="col-12">
                  {" "}
                  <p>
                    Cargando datos{" "}
                    <Loading type={"spin"} color={"#0b486b"}></Loading>{" "}
                  </p>
                </div>
              )
            ) : (
              <p></p>
            )
          ) : (
            <p>Por favor selecciona una etapa, años o tema de interés</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
