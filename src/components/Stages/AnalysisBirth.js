import React, { useState, useEffect } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "../Slider/Handle";
import TooltipRail from "../Slider/TooltipRail";
import { Track } from "../Slider/Track";
import { Tick } from "../Slider/Tick";
import {
  RCIUFreqCesarea,
  RCIUFreqGender,
  RCIUFreqEdadGes,
  RCIUFreqEGPremTerm,
  RCIUAFPromMedidaBebeNacer,
  RCIURCEUFreq,
  RCIUAntNacimientoVars,
} from "../../actions/medidasNacimientoAction";
import CanvasJSReact from "../../assets/canvasjs.react";
import GroupedBar from "../Graphs/GroupedBar";
import GenderBase from "../Graphs/GenderBase";
import Select from "react-select";
import Filters from "../Filter/Filters";
import FilterRange from "../Filter/FilterRange";

function AnalysisBirth(props) {
  // States for slider
  const defaultValues = [1993, 2020];
  const [domain, setDomain] = useState([1993, 2020]);
  const [values, setValues] = useState(defaultValues.slice());
  const [update, setUpdate] = useState(defaultValues.slice());

  // States for years
  const [anioInicial, setAnioInicial] = useState(1993);
  const [anioFinal, setAnioFinal] = useState(2020);

  // States for visualizations
  const [dataRelFreqCesareaPrem, setDataRelFreqCesareaPrem] = useState({});
  const [dataRelFreqCesareaTerm, setDataRelFreqCesareaTerm] = useState({});
  const [dataFreqGenderPremWith, setdataFreqGenderPremWith] = useState({});
  const [dataFreqGenderPremWithout, setdataFreqGenderPremWithout] = useState(
    {}
  );
  const [dataFreqGenderTermWith, setdataFreqGenderTermWith] = useState({});
  const [dataFreqGenderTermWithout, setdataFreqGenderTermWithout] = useState(
    {}
  );
  const [dataFreqEG, setDataFreqEG] = useState({});
  const [dataFreqEGPremTerm, setdataFreqEGPremTerm] = useState({});

  const [pesoNacerPrem, setPesoNacerPrem] = useState({});
  const [tallaNacerPrem, setTallaNacerPrem] = useState({});
  const [pcNacerPrem, setPcNacerPrem] = useState({});

  const [pesoNacerTerm, setPesoNacerTerm] = useState({});
  const [tallaNacerTerm, setTallaNacerTerm] = useState({});
  const [pcNacerTerm, setPcNacerTerm] = useState({});

  const [rciuRceuPrem, setRciuRceuPrem] = useState({});
  const [rciuRceuTerm, setRciuRceuTerm] = useState({});

  // States for variables select
  const [dataGroup, setDataGroup] = useState([]);
  const [varsSelected, setVarsSelected] = useState([]);
  const [filterVars, setFilterVars] = useState(props.inputVars);

  const sliderStyle = {
    position: "relative",
    width: "100%",
  };

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  CanvasJS.addColorSet("customColorSetPrem", ["#0E7FA6", "#FF955B"]);
  CanvasJS.addColorSet("customColorSetTerm", ["#70D6BC", "#A6330A"]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // API Calls

  const getRCIUFreqCesarea = async () => {
    var response = {};
    var response2 = {};

    if (filterVars.length > 0) {
      response = await RCIUFreqCesarea(
        anioInicial,
        anioFinal,
        "true",
        filterVars
      );
      response2 = await RCIUFreqCesarea(
        anioInicial,
        anioFinal,
        "false",
        filterVars
      );
    } else {
      response = await RCIUFreqCesarea(anioInicial, anioFinal, "true", []);
      response2 = await RCIUFreqCesarea(anioInicial, anioFinal, "false", []);
    }

    const yearsInterval = [];

    for (let index = update[0]; index < update[1] + 1; index++) {
      yearsInterval.push(index.toString());
    }
    response.axisX.labelFormatter = function (e) {
      for (let i = 0; i < yearsInterval.length; i++) {
        if (e.value === i) {
          return yearsInterval[i];
        }
      }
      return "";
    };
    response.toolTip.contentFormatter = function (e) {
      for (let i = 0; i < yearsInterval.length; i++) {
        if (e.entries[0].dataPoint.x === i) {
          return (
            yearsInterval[i] +
            ": " +
            (e.entries[0].dataPoint.y * 100).toFixed(2) +
            "%" +
            " (" +
            e.entries[0].dataPoint.absolute +
            " bebés)"
          );
        }
      }
    };

    response2.axisX.labelFormatter = function (e) {
      for (let i = 0; i < yearsInterval.length; i++) {
        if (e.value === i) {
          return yearsInterval[i];
        }
      }
      return "";
    };
    response2.toolTip.contentFormatter = function (e) {
      for (let i = 0; i < yearsInterval.length; i++) {
        if (e.entries[0].dataPoint.x === i) {
          return (
            yearsInterval[i] +
            ": " +
            (e.entries[0].dataPoint.y * 100).toFixed(2) +
            "%" +
            " (" +
            e.entries[0].dataPoint.absolute +
            " bebés)"
          );
        }
      }
    };
    setDataRelFreqCesareaPrem(response);
    setDataRelFreqCesareaTerm(response2);
  };

  const getRCIUFreqGender = async () => {
    var response = {};
    var response2 = {};
    var response3 = {};
    var response4 = {};

    if (filterVars && filterVars.length > 0) {
      response = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "true",
        "true",
        filterVars
      );

      response2 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "true",
        "false",
        filterVars
      );

      response3 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "false",
        "true",
        filterVars
      );

      response4 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "false",
        "false",
        filterVars
      );
    } else {
      response = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "true",
        "true",
        []
      );

      response2 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "true",
        "false",
        []
      );

      response3 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "false",
        "true",
        []
      );

      response4 = await RCIUFreqGender(
        anioInicial,
        anioFinal,
        "false",
        "false",
        []
      );
    }

    setdataFreqGenderPremWith(response);
    setdataFreqGenderPremWithout(response2);
    setdataFreqGenderTermWith(response3);
    setdataFreqGenderTermWithout(response4);
  };

  const getRCIUFreqEdadGes = async () => {
    var response = {};

    if (filterVars && filterVars.length > 0) {
      response = await RCIUFreqEdadGes(anioInicial, anioFinal, filterVars);
    } else {
      response = await RCIUFreqEdadGes(anioInicial, anioFinal, []);
    }

    response.axisX.labelFormatter = function (e) {
      return e.value === 1
        ? "<28"
        : e.value === 2
        ? "28-32"
        : e.value === 3
        ? "32-34"
        : e.value === 4
        ? "34-37"
        : e.value === 5
        ? "37-39"
        : e.value === 6
        ? "39-41"
        : e.value === 7
        ? "41-42"
        : "";
    };
    setDataFreqEG(response);
  };

  const getRCIUFreqEGPremTerm = async () => {
    var response = [];

    if (filterVars.length > 0) {
      response = await RCIUFreqEGPremTerm(anioInicial, anioFinal, filterVars);
    } else {
      response = await RCIUFreqEGPremTerm(anioInicial, anioFinal, []);
    }
    setdataFreqEGPremTerm(response);
  };

  const getRCIUAFPromPesoBebeNacer = async (d = "0", h = "0") => {
    var pesoAlNacerPrem = {};
    var pesoAlNacerTerm = {};

    if (filterVars.length > 0) {
      pesoAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "pesoalnacer",
        filterVars,
        d,
        h
      );

      pesoAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "pesoalnacer",
        filterVars,
        d,
        h
      );
    } else {
      pesoAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "pesoalnacer",
        [],
        d,
        h
      );

      pesoAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "pesoalnacer",
        [],
        d,
        h
      );
    }

    setPesoNacerPrem(pesoAlNacerPrem);
    setPesoNacerTerm(pesoAlNacerTerm);
  };

  const getRCIUAFPromTallaBebeNacer = async (d = "0", h = "0") => {
    var tallaAlNacerPrem = {};
    var tallaAlNacerTerm = {};

    if (filterVars.length > 0) {
      tallaAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "tallaalnacer",
        filterVars,
        d,
        h
      );

      tallaAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "tallaalnacer",
        filterVars,
        d,
        h
      );
    } else {
      tallaAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "tallaalnacer",
        [],
        d,
        h
      );

      tallaAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "tallaalnacer",
        [],
        d,
        h
      );
    }

    setTallaNacerPrem(tallaAlNacerPrem);
    setTallaNacerTerm(tallaAlNacerTerm);
  };

  const getRCIUAFPromPCBebeNacer = async (d = "0", h = "0") => {
    var pcAlNacerPrem = {};
    var pcAlNacerTerm = {};

    if (filterVars.length > 0) {
      pcAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "pcalnacer",
        filterVars,
        d,
        h
      );

      pcAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "pcalnacer",
        filterVars,
        d,
        h
      );
    } else {
      pcAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "true",
        "pcalnacer",
        [],
        d,
        h
      );

      pcAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
        anioInicial,
        anioFinal,
        "false",
        "pcalnacer",
        [],
        d,
        h
      );
    }

    setPcNacerPrem(pcAlNacerPrem);
    setPcNacerTerm(pcAlNacerTerm);
  };

  const getRCIURCEUFreq = async () => {
    var prem = {};
    var term = {};

    if (filterVars.length > 0) {
      prem = await RCIURCEUFreq(anioInicial, anioFinal, "true", filterVars);
      term = await RCIURCEUFreq(anioInicial, anioFinal, "false", filterVars);
    } else {
      prem = await RCIURCEUFreq(anioInicial, anioFinal, "true", []);
      term = await RCIURCEUFreq(anioInicial, anioFinal, "false", []);
    }

    setRciuRceuPrem(prem);
    setRciuRceuTerm(term);
  };

  const getRCIUAntNacimientoVars = async () => {
    const response = await RCIUAntNacimientoVars();
    setDataGroup(response);
  };

  // Handler methods

  const onUpdate = (update) => {
    setUpdate(update);
  };

  const onChange = (valuesNew) => {
    setValues(valuesNew);
    setAnioInicial(valuesNew[0]);
    setAnioFinal(valuesNew[1]);
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "cesarea") {
        getRCIUFreqCesarea();
      }

      if (varsSelected[i].value === "sexo") {
        getRCIUFreqGender();
      }

      if (varsSelected[i].value === "edadgestacional") {
        getRCIUFreqEdadGes();
        getRCIUFreqEGPremTerm();
      }

      if (varsSelected[i].value === "pesoalnacer") {
        getRCIUAFPromPesoBebeNacer();
      }

      if (varsSelected[i].value === "tallaalnacer") {
        getRCIUAFPromTallaBebeNacer();
      }

      if (varsSelected[i].value === "pcalnacer") {
        getRCIUAFPromPCBebeNacer();
      }

      if (varsSelected[i].value === "rciurceu") {
        getRCIURCEUFreq();
      }
    }

    var filArray = [...varsSelected];
    const finalArray = [...new Set(filterVars.concat(filArray))];

    setFilterVars(finalArray);
    props.filterVariables2(finalArray);
  };

  const onChangeVars = (selected) => {
    setVarsSelected(selected);
  };

  const graphData = () => {
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "cesarea") {
        getRCIUFreqCesarea();
      }

      if (varsSelected[i].value === "sexo") {
        getRCIUFreqGender();
      }

      if (varsSelected[i].value === "edadgestacional") {
        getRCIUFreqEdadGes();
        getRCIUFreqEGPremTerm();
      }

      if (varsSelected[i].value === "pesoalnacer") {
        getRCIUAFPromPesoBebeNacer();
      }

      if (varsSelected[i].value === "tallaalnacer") {
        getRCIUAFPromTallaBebeNacer();
      }

      if (varsSelected[i].value === "pcalnacer") {
        getRCIUAFPromPCBebeNacer();
      }

      if (varsSelected[i].value === "rciurceu") {
        getRCIURCEUFreq();
      }
    }

    var filArray = [...varsSelected];
    const finalArray = [...new Set(filterVars.concat(filArray))];
    for (let i = 0; i < finalArray.length; i++) {
      if (
        finalArray[i].value === "edadgestacional" ||
        finalArray[i].value === "rciurceu" ||
        ((finalArray[i].value === "sexo" ||
          finalArray[i].value.includes("peso") ||
          finalArray[i].value.includes("talla") ||
          finalArray[i].value.includes("pc")) &&
          !finalArray[i].hasOwnProperty("filter"))
      ) {
        finalArray.splice(finalArray.indexOf(finalArray[i], 1));
      }
    }

    setFilterVars(finalArray);
    props.filterVariables2(finalArray);
  };
  const cleanFields = () => {
    setVarsSelected([]);
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "cesarea") {
        setDataRelFreqCesareaPrem({});
        setDataRelFreqCesareaTerm({});
      }

      if (varsSelected[i].value === "sexo") {
        setdataFreqGenderPremWith({});
        setdataFreqGenderPremWithout({});
        setdataFreqGenderTermWith({});
        setdataFreqGenderTermWithout({});
      }

      if (varsSelected[i].value === "edadgestacional") {
        setdataFreqEGPremTerm({});
        setDataFreqEG({});
      }

      if (varsSelected[i].value === "pesoalnacer") {
        setPesoNacerPrem({});
        setPesoNacerTerm({});
      }

      if (varsSelected[i].value === "tallaalnacer") {
        setTallaNacerPrem({});
        setTallaNacerTerm({});
      }

      if (varsSelected[i].value === "pcalnacer") {
        setPcNacerPrem({});
        setPcNacerTerm({});
      }

      if (varsSelected[i].value === "rciurceu") {
        setRciuRceuPrem({});
        setRciuRceuTerm({});
      }
    }
  };

  const [genero, setGenero] = useState("");

  const generoSel = (event) => {
    setGenero(event.target.value);
  };

  const generoFilter = () => {
    var filtros = varsSelected;
    setFilterVars(filtros);
    props.filterVariables2(filtros);

    for (let i = 0; i < filtros.length; i++) {
      if (filtros[i].value === "sexo") {
        filtros[i].filter = filtros[i].label + " (" + genero + ")";
      }
    }
    getRCIUFreqGender();
  };

  //* Functions for filters

  //* Refs for filtering data
  let pDRef = React.createRef();
  let pHRef = React.createRef();
  let tDRef = React.createRef();
  let tHRef = React.createRef();
  let pcDRef = React.createRef();
  let pcHRef = React.createRef();

  const medidasPeso = () => {
    var filtros = varsSelected;
    setFilterVars(filtros);
    props.filterVariables2(filtros);

    for (let i = 0; i < filtros.length; i++) {
      if (filtros[i].value === "pesoalnacer") {
        filtros[i].desde = pDRef.current.value;
        filtros[i].hasta = pHRef.current.value;
        filtros[i].filter =
          filtros[i].label +
          " " +
          pDRef.current.value +
          "-" +
          pHRef.current.value;
      }
    }

    getRCIUAFPromPesoBebeNacer(pDRef.current.value, pHRef.current.value);
  };

  const medidasTalla = () => {
    var filtros = varsSelected;
    setFilterVars(filtros);
    props.filterVariables2(filtros);

    for (let i = 0; i < filtros.length; i++) {
      if (filtros[i].value === "tallaalnacer") {
        filtros[i].desde = tDRef.current.value;
        filtros[i].hasta = tHRef.current.value;
        filtros[i].filter =
          filtros[i].label +
          " " +
          tDRef.current.value +
          "-" +
          tHRef.current.value;
      }
    }

    getRCIUAFPromTallaBebeNacer(tDRef.current.value, tHRef.current.value);
  };

  const medidasPc = () => {
    var filtros = varsSelected;
    setFilterVars(filtros);
    props.filterVariables2(filtros);

    for (let i = 0; i < filtros.length; i++) {
      if (filtros[i].value === "pcalnacer") {
        filtros[i].desde = pcDRef.current.value;
        filtros[i].hasta = pcHRef.current.value;
        filtros[i].filter =
          filtros[i].label +
          " " +
          pcDRef.current.value +
          "-" +
          pcHRef.current.value;
      }
    }

    getRCIUAFPromPCBebeNacer(pcDRef.current.value, pcHRef.current.value);
  };

  useEffect(() => {
    getRCIUAntNacimientoVars();
  }, []);

  return (
    <div className="analysisBirth">
      <div className="container">
        <GenderBase
          inicio={anioInicial}
          fin={anioFinal}
          vars={filterVars.length > 0 ? filterVars : []}
        />
        <div className="row pt-4">
          <div className="col-11">
            <h1>
              <b>Análisis Nacimiento - RCIU</b>
            </h1>
          </div>
          <div className="col-1 text-end">
            <Filters filters={filterVars} />
          </div>
        </div>
        <div className="row">
          <p>
            En esta sección se podrá hacer un análisis de diferentes{" "}
            <b>variables perinatales</b> a lo largo del tiempo, para distintas{" "}
            <b>muestras de interés</b> en pacientes{" "}
            <b>
              con y sin Retardo del Crecimiento Intrauterino (RCIU) y bebés
              prematuros (menos de 37 semanas de edad gestacional) o a término
              (más de 37 semanas)
            </b>
            . En algunas de estas visualizaciones se podrá interactuar con zoom
            y movimiento y para todos los datos y gráficas se puede filtrar el
            intervalo de tiempo deseado entre 1993 y 2020.
          </p>
        </div>
        <div className="row">
          <p>
            De igual manera está la función de <b>filtrado</b> en el icono a la
            derecha, donde aparecerán las variables que estén filtrando los
            datos. Cuando el icono cambie de color significa que tiene filtros
            activos. Algunos filtros se agregan al dar click en <i>Consultar</i>{" "}
            y otros se agregan directamente desde la gráfica.
          </p>
        </div>
        <div className="row">
          <p>
            Seleccione una o varias variables de interés para poder visualizar
            los diferentes datos. Para hacer efectiva su consulta por favor dar
            click en <i>"Consultar"</i>, si desea limpiar las variables y datos
            dar click en <i>"Limpiar"</i>. A algunas variables se les puede
            aplicar filtros por rango, en estas dar click en{" "}
            <i>"Aplicar filtro"</i> para hacerlo efectivo. Para reiniciar los
            filtros escribir "0" en ambos rangos o seleccionar el valor inicial
            en casos categóricos.
          </p>
        </div>
        <div className="row">
          <div className="col-4">
            <label>
              <b>Variables</b>
            </label>
            <Select
              className="basic-single text-start"
              isMulti
              options={dataGroup}
              value={varsSelected}
              onChange={onChangeVars}
            />
          </div>
          <div className="col-1 align-self-end">
            {" "}
            <button className="query-btn" onClick={graphData}>
              Consultar
            </button>
          </div>
          <div className="col-1 align-self-end">
            {" "}
            <button className="clean-btn" onClick={cleanFields}>
              Limpiar
            </button>
          </div>
        </div>
        {Object.entries(dataRelFreqCesareaPrem).length !== 0 ? (
          <div className="cesarea">
            <div className="row pt-2">
              <h3>
                <b>Variación de nacimiento por cesárea</b>
              </h3>
            </div>
            <div className="row pt-4">
              <div className="col-6">
                <CanvasJSChart options={dataRelFreqCesareaPrem} />
              </div>
              <div className="col-6">
                <CanvasJSChart options={dataRelFreqCesareaTerm} />
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}

        {Object.entries(dataFreqGenderPremWith).length !== 0 &&
        Object.entries(dataFreqGenderPremWithout).length &&
        Object.entries(dataFreqGenderTermWith).length &&
        Object.entries(dataFreqGenderTermWithout).length ? (
          <div className="genero">
            <div className="row pt-2">
              <h3>
                <b>Distribución de género</b>
              </h3>
            </div>
            <div className="row pt-2">
              <div className="col-5">
                <div className="input-group pb-3">
                  <select class="form-select" onChange={generoSel}>
                    <option value="">Seleccione un género</option>
                    <option value="niño">Niño</option>
                    <option value="niña">Niña</option>
                  </select>
                  <button
                    className="input-group-text aply-btn"
                    onClick={generoFilter}
                  >
                    Aplicar Filtro
                  </button>
                </div>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-6">
                <CanvasJSChart options={dataFreqGenderPremWith} />
              </div>
              <div className="col-6">
                <CanvasJSChart options={dataFreqGenderPremWithout} />
              </div>
            </div>
            <div className="row pt-4">
              <div className="col-6">
                <CanvasJSChart options={dataFreqGenderTermWith} />
              </div>
              <div className="col-6">
                <CanvasJSChart options={dataFreqGenderTermWithout} />
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
        {Object.entries(dataFreqEG).length !== 0 &&
        Object.entries(dataFreqEGPremTerm).length !== 0 ? (
          <div className="edadGes">
            <div className="row pt-2">
              <h3>
                <b>
                  Distribución de edades gestacionales {anioInicial} -{" "}
                  {anioFinal}
                </b>
              </h3>
            </div>
            <div className="row pt-4">
              <div className="col-10">
                <CanvasJSChart options={dataFreqEG} />
              </div>
              <div className="col-2 align-self-center">
                <p className="text-center">
                  RCIU en niños prematuros ({"<"} 37 semanas):{" "}
                  <b>{dataFreqEGPremTerm.prematurosRCIU} %</b>
                </p>
                <p className="text-center">
                  RCIU en niños a término ({">="} 37 semanas):{" "}
                  <b>{dataFreqEGPremTerm.terminoRCIU} %</b>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p></p>
        )}
        {Object.entries(pesoNacerPrem).length !== 0 ||
        Object.entries(tallaNacerPrem).length !== 0 ||
        Object.entries(pcNacerPrem).length !== 0 ||
        Object.entries(pesoNacerTerm).length !== 0 ||
        Object.entries(tallaNacerTerm).length !== 0 ||
        Object.entries(pcNacerTerm).length !== 0 ? (
          <div className="row pt-4">
            <h3>
              <b>Medidas antropométricas al nacer</b>
            </h3>
          </div>
        ) : (
          ""
        )}
        <div className="row">
          {Object.entries(pesoNacerPrem).length !== 0 ? (
            <div className="peso col-4 group">
              <FilterRange
                medida={"peso"}
                medidaFilter={medidasPeso}
                desdeInput={pDRef}
                hastaInput={pHRef}
              />
              <GroupedBar data={pesoNacerPrem} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(tallaNacerPrem).length !== 0 ? (
            <div className="talla col-4 group">
              <FilterRange
                medida={"talla"}
                medidaFilter={medidasTalla}
                desdeInput={tDRef}
                hastaInput={tHRef}
              />
              <GroupedBar
                data={tallaNacerPrem}
                options={options}
                height={200}
              />
            </div>
          ) : (
            ""
          )}

          {Object.entries(pcNacerPrem).length !== 0 ? (
            <div className="pc col-4 group">
              <FilterRange
                medida={"pc"}
                medidaFilter={medidasPc}
                desdeInput={pcDRef}
                hastaInput={pcHRef}
              />
              <GroupedBar data={pcNacerPrem} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(pesoNacerTerm).length !== 0 ? (
            <div className="peso col-4 group pt-5">
              <GroupedBar data={pesoNacerTerm} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(tallaNacerTerm).length !== 0 ? (
            <div className="talla col-4 group pt-5">
              <GroupedBar
                data={tallaNacerTerm}
                options={options}
                height={200}
              />
            </div>
          ) : (
            ""
          )}
          {Object.entries(pcNacerTerm).length !== 0 ? (
            <div className="pc col-4 group pt-5">
              <GroupedBar data={pcNacerTerm} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
        </div>
        {Object.entries(rciuRceuPrem).length !== 0 &&
        Object.entries(rciuRceuTerm).length !== 0 ? (
          <div className="rciu">
            <div className="row pt-5">
              <h3>
                <b>Relación RCIU - RCEU</b>
              </h3>
            </div>
            <div className="row edadG">
              <div className="col-6">
                <h5>Bebés prematuros con y sin RCIU</h5>
                <GroupedBar
                  data={rciuRceuPrem}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-6">
                <h5>Bebés a término con y sin RCIU</h5>
                <GroupedBar
                  data={rciuRceuTerm}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="slide row pt-3">
          <div className="col-12 slider">
            <p>Años de interés</p>
            <Slider
              mode={1}
              step={1}
              domain={domain}
              rootStyle={sliderStyle}
              onUpdate={onUpdate}
              onChange={onChange}
              values={values}
            >
              <Rail>{(railProps) => <TooltipRail {...railProps} />}</Rail>
              <Handles>
                {({ handles, activeHandleID, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map((handle) => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        isActive={handle.id === activeHandleID}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={20}>
                {({ ticks }) => (
                  <div className="slider-ticks">
                    {ticks.map((tick) => (
                      <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisBirth;
