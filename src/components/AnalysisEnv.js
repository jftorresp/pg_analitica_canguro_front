import React, { useState, useEffect } from "react";
import {
  RCIUAbsFrequencyYears,
  RCIURelativeFrequencyYears,
  RCIURelativeFrequencyPremature,
  RCIUAbsoluteFrequencyPremature,
  RCIUAFPromMedidaMadre,
  RCIUAFMedidaMadre,
  RCIUAntEntornoVars,
  RCIURFEstudiosMadre,
  RCIURFIngresosMadre,
} from "../actions/medidasEntornoAction";
import CanvasJSReact from "../assets/canvasjs.react";
import Select from "react-select";
import MedidasGraphs from "./MedidasGrahps";
import GenderBase from "./GenderBase";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import TooltipRail from "./TooltipRail";
import { Track } from "./Track";
import { Tick } from "./Tick";

import Filters from "./Filters";

const AnalysisEnv = (props) => {
  /* States gráficas principales */
  const [dataAbsFreq, setDataAbsFreq] = useState({});
  const [dataRelFreq, setDataRelFreq] = useState({});
  /* Frecuencias muestras bebés prematuros o a término */
  const [dataRelIFreqPrem, setdataRelIFreqPrem] = useState({});
  const [dataAbsolutePrem, setdataAbsolutePrem] = useState([]);
  const [dataRelIFreqTerm, setdataRelIFreqTerm] = useState({});
  const [dataAbsoluteTerm, setdataAbsoluteTerm] = useState([]);

  /* Medidas Madre prematuros */
  const [dataPesoMadrePrem, setDataPesoMadrePrem] = useState({});
  const [dataTallaMadrePrem, setDataTallaMadrePrem] = useState({});
  const [dataEstudiosMadrePrem, setDataEstudiosMadrePrem] = useState({});
  const [dataIngresosMadrePrem, setDataIngresosMadrePrem] = useState({});
  //// const [dataPromPesoMadre, setDataPromPesoMadre] = useState({});
  //// const [promediosPeso, setpromediosPeso] = useState([]);
  //// const [dataPromTallaMadre, setDataPromTallaMadre] = useState({});
  //// const [promediosTalla, setpromediosTalla] = useState([]);

  /* Medidas Madre a término */
  const [dataPesoMadreTerm, setDataPesoMadreTerm] = useState({});
  const [dataTallaMadreTerm, setDataTallaMadreTerm] = useState({});
  const [dataEstudiosMadreTerm, setDataEstudiosMadreTerm] = useState({});
  const [dataIngresosMadreTerm, setDataIngresosMadreTerm] = useState({});

  /* Medidas Padre prematuros */
  const [dataPesoPadrePrem, setDataPesoPadrePrem] = useState({});
  const [dataTallaPadrePrem, setDataTallaPadrePrem] = useState({});
  //// const [dataPromPesoPadre, setDataPromPesoPadre] = useState({});
  //// const [promediosPesoP, setpromediosPesoP] = useState([]);
  //// const [dataPromTallaPadre, setDataPromTallaPadre] = useState({});
  //// const [promediosTallaP, setpromediosTallaP] = useState([]);

  /* Medidas Padre a término */
  const [dataPesoPadreTerm, setDataPesoPadreTerm] = useState({});
  const [dataTallaPadreTerm, setDataTallaPadreTerm] = useState({});

  /* States for years */
  const [anioInicial, setAnioInicial] = useState(1993);
  const [anioFinal, setAnioFinal] = useState(2020);

  // States for variables select
  const [dataGroup, setDataGroup] = useState([]);
  const [varsSelected, setVarsSelected] = useState([]);
  const [filterVars, setFilterVars] = useState(props.inputVars);

  // States for slider
  const defaultValues = [1993, 2020];
  const [domain, setDomain] = useState([1993, 2020]);
  const [values, setValues] = useState(defaultValues.slice());
  const [update, setUpdate] = useState(defaultValues.slice());

  const [anchorEl, setAnchorEl] = useState();

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  CanvasJS.addColorSet("customColorSet", [
    "#001747",
    "#11487D",
    "#0E7FA6",
    "#38C7BD",
    "#70D6BC",
  ]);

  CanvasJS.addColorSet("customColorSet1", ["#001747"]);
  CanvasJS.addColorSet("customColorSetPrem", ["#0E7FA6", "#FF955B"]);
  CanvasJS.addColorSet("customColorSetTerm", ["#70D6BC", "#A6330A"]);
  CanvasJS.addColorSet("customColorSet3", ["#008C70", "#FF5517"]);
  CanvasJS.addColorSet("customColorSet4", ["#70D6BC"]);
  CanvasJS.addColorSet("customColorSet5", ["#0E7FA6"]);
  CanvasJS.addColorSet("customColorSet6", ["#A6330A"]);
  CanvasJS.addColorSet("customColorSet7", ["#F28C0F"]);

  //* API Calls

  /* Gráfica de barras con valores absolutos de RCIU en intervalos de años */
  const getRCIUAbsFreqYears = async () => {
    const response = await RCIUAbsFrequencyYears();
    setDataAbsFreq(response);
  };

  // Gráfica lineal con valores relativos de RCIU en intervalos de años
  const getRCIURelFreqYears = async () => {
    const response = await RCIURelativeFrequencyYears();
    response.toolTip.contentFormatter = function (e) {
      return (e.entries[0].dataPoint.y * 100).toFixed(2) + "%";
    };
    response.axisX.labelFormatter = function (e) {
      return e.value === 1
        ? "1993 - 1998"
        : e.value === 2
        ? "1999 - 2004"
        : e.value === 3
        ? "2005 - 2010"
        : e.value === 4
        ? "2011 - 2016"
        : e.value === 5
        ? "2017 - 2020"
        : "";
    };
    setDataRelFreq(response);
  };

  //* PREMATUROS

  // Trae los datos de frecuencias relativas para muestras de bebés prematuros sin variables
  const getRCIURelInitFreqPremature = async () => {
    const response = await RCIURelativeFrequencyPremature(
      anioInicial,
      anioFinal,
      [],
      true
    );

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

    setdataRelIFreqPrem(response);
  };

  // Trae los datos de frecuencias relativas para muestras de bebés prematuros con variables
  const getRCIURelFreqPremature = async () => {
    for (let i = 0; i < varsSelected.length; i++) {
      if (
        varsSelected[i].value !== "pesomama" &&
        varsSelected[i].value !== "tallamama" &&
        varsSelected[i].value !== "pesopapa" &&
        varsSelected[i].value !== "tallapapa" &&
        varsSelected[i].value !== "nivelmama" &&
        varsSelected[i].value !== "percapitasalariominimo"
      ) {
        const vars = varsSelected.filter(
          (obj) =>
            obj.value !== "pesomama" &&
            obj.value !== "tallamama" &&
            obj.value !== "pesopapa" &&
            obj.value !== "tallapapa" &&
            obj.value !== "nivelmama" &&
            obj.value !== "percapitasalariominimo"
        );

        const response = await RCIURelativeFrequencyPremature(
          anioInicial,
          anioFinal,
          vars.length > 0 ? vars.map((variable) => variable.value) : "",
          true
        );

        const arr = [];
        for (let i = 0; i < vars.length; i++) {
          arr.push(await getRCIUAbsoluteFrequencyPremature(i));
        }
        setdataAbsolutePrem(arr);

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

        setdataRelIFreqPrem(response);
      }
    }
  };

  // Trae los datos de frecuencias absolutas para muestras de bebés prematuros con variables
  const getRCIUAbsoluteFrequencyPremature = async (i) => {
    const response = await RCIUAbsoluteFrequencyPremature(
      anioInicial,
      anioFinal,
      varsSelected[i].value,
      true
    );
    return response;
  };

  //* A TÉRMINO

  // Trae los datos de frecuencias relativas para muestras de bebés prematuros sin variables
  const getRCIURelInitFreqTerm = async () => {
    const response = await RCIURelativeFrequencyPremature(
      anioInicial,
      anioFinal,
      [],
      false
    );

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

    setdataRelIFreqTerm(response);
  };

  // Trae los datos de frecuencias relativas para muestras de bebés prematuros con variables
  const getRCIURelFreqTerm = async () => {
    for (let i = 0; i < varsSelected.length; i++) {
      if (
        varsSelected[i].value !== "pesomama" &&
        varsSelected[i].value !== "tallamama" &&
        varsSelected[i].value !== "pesopapa" &&
        varsSelected[i].value !== "tallapapa" &&
        varsSelected[i].value !== "nivelmama" &&
        varsSelected[i].value !== "percapitasalariominimo"
      ) {
        const vars = varsSelected.filter(
          (obj) =>
            obj.value !== "pesomama" &&
            obj.value !== "tallamama" &&
            obj.value !== "pesopapa" &&
            obj.value !== "tallapapa" &&
            obj.value !== "nivelmama" &&
            obj.value !== "percapitasalariominimo"
        );
        const response = await RCIURelativeFrequencyPremature(
          anioInicial,
          anioFinal,
          vars.length > 0 ? vars.map((variable) => variable.value) : "",
          false
        );

        const arr = [];
        for (let i = 0; i < vars.length; i++) {
          arr.push(await getRCIUAbsoluteFrequencyTerm(i));
        }
        setdataAbsoluteTerm(arr);
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

        setdataRelIFreqTerm(response);
      }
    }
  };

  // Trae los datos de frecuencias absolutas para muestras de bebés prematuros con variables
  const getRCIUAbsoluteFrequencyTerm = async (i) => {
    const response = await RCIUAbsoluteFrequencyPremature(
      anioInicial,
      anioFinal,
      varsSelected[i].value,
      false
    );
    return response;
  };

  const getRCIUAntEntornoVars = async () => {
    const response = await RCIUAntEntornoVars();
    setDataGroup(response);
  };

  const getRCIUPesoMama = async (d = "0", h = "0") => {
    const responsePM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "pesomama",
      "true",
      d,
      h
    );
    setDataPesoMadrePrem(responsePM);

    const responseTM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "pesomama",
      "false",
      d,
      h
    );
    setDataPesoMadreTerm(responseTM);
  };

  const getRCIUTallaMama = async (d = "0", h = "0") => {
    const responsePM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "tallamama",
      "true",
      d,
      h
    );
    setDataTallaMadrePrem(responsePM);

    const responseTM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "tallamama",
      "false",
      d,
      h
    );
    setDataTallaMadreTerm(responseTM);
  };

  const getRCIUPesoPapa = async (d = "0", h = "0") => {
    const responsePM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "pesopapa",
      "true",
      d,
      h
    );
    setDataPesoPadrePrem(responsePM);

    const responseTM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "pesopapa",
      "false",
      d,
      h
    );
    setDataPesoPadreTerm(responseTM);
  };

  const getRCIUTallaPapa = async (d = "0", h = "0") => {
    const responsePM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "tallapapa",
      "true",
      d,
      h
    );
    setDataTallaPadrePrem(responsePM);

    const responseTM = await RCIUAFMedidaMadre(
      anioInicial,
      anioFinal,
      "tallapapa",
      "false",
      d,
      h
    );
    setDataTallaPadreTerm(responseTM);
  };

  const getRCIUIngresosMama = async (d = "0", h = "0") => {
    const responsePM = await RCIURFIngresosMadre(
      anioInicial,
      anioFinal,
      "true",
      d,
      h
    );
    setDataIngresosMadrePrem(responsePM);

    const responseTM = await RCIURFIngresosMadre(
      anioInicial,
      anioFinal,
      "false",
      d,
      h
    );
    setDataIngresosMadreTerm(responseTM);
  };

  const getRCIUEstudiosMama = async (e = "") => {
    const responseEM = await RCIURFEstudiosMadre(
      anioInicial,
      anioFinal,
      "true",
      e
    );
    setDataEstudiosMadrePrem(responseEM);

    const responseTM = await RCIURFEstudiosMadre(
      anioInicial,
      anioFinal,
      "false",
      e
    );
    setDataEstudiosMadreTerm(responseTM);
  };

  // const getRCIUPromMadre = async () => {
  //   const responsePeso = await RCIUAFPromMedidaMadre(
  //     anioInicial.value,
  //     anioFinal.value,
  //     "pesomama"
  //   );

  //   const responseTalla = await RCIUAFPromMedidaMadre(
  //     anioInicial.value,
  //     anioFinal.value,
  //     "tallamama"
  //   );
  //   setpromediosPeso([
  //     responsePeso.promedioConRCIU,
  //     responsePeso.promedioSinRCIU,
  //   ]);
  //   setDataPromPesoMadre(responsePeso);

  //   setpromediosTalla([
  //     responseTalla.promedioConRCIU,
  //     responseTalla.promedioSinRCIU,
  //   ]);
  //   setDataPromTallaMadre(responseTalla);
  // };

  // const getRCIUPromPadre = async () => {
  //   const responsePeso = await RCIUAFPromMedidaMadre(
  //     anioInicial.value,
  //     anioFinal.value,
  //     "pesopapa"
  //   );

  //   const responseTalla = await RCIUAFPromMedidaMadre(
  //     anioInicial.value,
  //     anioFinal.value,
  //     "tallapapa"
  //   );
  //   setpromediosPesoP([
  //     responsePeso.promedioConRCIU,
  //     responsePeso.promedioSinRCIU,
  //   ]);
  //   setDataPromPesoPadre(responsePeso);

  //   setpromediosTallaP([
  //     responseTalla.promedioConRCIU,
  //     responseTalla.promedioSinRCIU,
  //   ]);
  //   setDataPromTallaPadre(responseTalla);
  // };

  useEffect(() => {
    getRCIUAbsFreqYears();
    getRCIURelFreqYears();
    getRCIUAntEntornoVars();

    // Prematuros
    getRCIURelInitFreqPremature();
    getRCIURelFreqPremature();

    // A término
    getRCIURelInitFreqTerm();
    getRCIURelFreqTerm();
  }, []);

  const graphData = () => {
    // getRCIUPromMadre();
    // getRCIUPromPadre();

    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "toxemia") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "Embarazomultiple") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "primipara") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "adolescentes") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "mayores") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "pesomama") {
        getRCIUPesoMama();
      }

      if (varsSelected[i].value === "tallamama") {
        getRCIUTallaMama();
      }

      if (varsSelected[i].value === "pesopapa") {
        getRCIUPesoPapa();
      }

      if (varsSelected[i].value === "tallapapa") {
        getRCIUTallaPapa();
      }

      if (varsSelected[i].value === "nivelmama") {
        getRCIUEstudiosMama();
      }

      if (varsSelected[i].value === "percapitasalariominimo") {
        getRCIUIngresosMama();
      }
    }

    setFilterVars(varsSelected);
    props.filterVariables(varsSelected);
  };

  // Vacía los campos de los selects y de los estados relacionados con los datos
  const cleanFields = () => {
    // setDataPromPesoMadre({});
    // setpromediosPeso([]);
    // setDataPromTallaMadre({});
    // setpromediosTalla([]);

    // setDataPromPesoPadre({});
    // setpromediosPesoP([]);
    // setDataPromTallaPadre({});
    // setpromediosTallaP([]);

    setVarsSelected([]);

    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "toxemia") {
        setdataRelIFreqPrem({});
        setdataAbsolutePrem([]);
        setdataRelIFreqTerm({});
        setdataAbsoluteTerm([]);
      }

      if (varsSelected[i].value === "Embarazomultiple") {
        setdataRelIFreqPrem({});
        setdataAbsolutePrem([]);
        setdataRelIFreqTerm({});
        setdataAbsoluteTerm([]);
      }

      if (varsSelected[i].value === "primipara") {
        setdataRelIFreqPrem({});
        setdataAbsolutePrem([]);
        setdataRelIFreqTerm({});
        setdataAbsoluteTerm([]);
      }

      if (varsSelected[i].value === "adolescentes") {
        setdataRelIFreqPrem({});
        setdataAbsolutePrem([]);
        setdataRelIFreqTerm({});
        setdataAbsoluteTerm([]);
      }

      if (varsSelected[i].value === "mayores") {
        setdataRelIFreqPrem({});
        setdataAbsolutePrem([]);
        setdataRelIFreqTerm({});
        setdataAbsoluteTerm([]);
      }

      if (varsSelected[i].value === "pesomama") {
        setDataPesoMadrePrem([]);
        setDataPesoMadreTerm([]);
      }

      if (varsSelected[i].value === "tallamama") {
        setDataTallaMadrePrem([]);
        setDataTallaMadreTerm([]);
      }

      if (varsSelected[i].value === "pesopapa") {
        setDataPesoPadrePrem([]);
        setDataPesoPadreTerm([]);
      }

      if (varsSelected[i].value === "tallapapa") {
        setDataTallaPadrePrem([]);
        setDataTallaPadreTerm([]);
      }

      if (varsSelected[i].value === "nivelmama") {
        setDataEstudiosMadrePrem([]);
      }

      if (varsSelected[i].value === "percapitasalariominimo") {
        setDataIngresosMadrePrem([]);
      }
    }

    // Prematuros
    getRCIURelInitFreqPremature();

    // A término
    getRCIURelInitFreqTerm();
  };

  const sliderStyle = {
    position: "relative",
    width: "100%",
  };

  //* Handler methods

  const onUpdate = (update) => {
    setUpdate(update);
    setAnioInicial(update[0]);
    setAnioFinal(update[1]);
  };

  const onChange = (valuesNew) => {
    setValues(valuesNew);
    setAnioInicial(valuesNew[0]);
    setAnioFinal(valuesNew[1]);

    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "toxemia") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "Embarazomultiple") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "primipara") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "adolescentes") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "mayores") {
        getRCIURelFreqPremature();
        getRCIURelFreqTerm();
      }

      if (varsSelected[i].value === "pesomama") {
        getRCIUPesoMama();
      }

      if (varsSelected[i].value === "tallamama") {
        getRCIUTallaMama();
      }

      if (varsSelected[i].value === "pesopapa") {
        getRCIUPesoPapa();
      }

      if (varsSelected[i].value === "tallapapa") {
        getRCIUTallaPapa();
      }

      if (varsSelected[i].value === "nivelmama") {
        getRCIUEstudiosMama();
      }

      if (varsSelected[i].value === "percapitasalariominimo") {
        getRCIUIngresosMama();
      }
    }
  };

  const onChangeVars = (selectedOption) => {
    setVarsSelected(selectedOption);
  };

  //* Refs for filtering data
  let pMamaDRef = React.createRef();
  let pMamaHRef = React.createRef();
  let tMamaDRef = React.createRef();
  let tMamaHRef = React.createRef();
  let pPapaDRef = React.createRef();
  let tPapaDRef = React.createRef();
  let pPapaHRef = React.createRef();
  let tPapaHRef = React.createRef();
  let ingresosDRef = React.createRef();
  let ingresosHRef = React.createRef();

  const medidasPMama = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "pesomama") {
        filterVars[i].desde = pMamaDRef.current.value;
        filterVars[i].hasta = pMamaHRef.current.value;
        filterVars[i].filter =
          filterVars[i].label +
          " " +
          pMamaDRef.current.value +
          "-" +
          pMamaHRef.current.value;

        getRCIUPesoMama(pMamaDRef.current.value, pMamaHRef.current.value);
      }
    }
  };

  const medidasTMama = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "tallamama") {
        filterVars[i].desde = tMamaDRef.current.value;
        filterVars[i].hasta = tMamaHRef.current.value;
        filterVars[i].filter =
          filterVars[i].label +
          " " +
          tMamaDRef.current.value +
          "-" +
          tMamaHRef.current.value;

        getRCIUTallaMama(tMamaDRef.current.value, tMamaHRef.current.value);
      }
    }
  };

  const medidasPPapa = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "pesopapa") {
        filterVars[i].desde = pPapaDRef.current.value;
        filterVars[i].hasta = pPapaHRef.current.value;
        filterVars[i].filter =
          filterVars[i].label +
          " " +
          pPapaDRef.current.value +
          "-" +
          pPapaHRef.current.value;

        getRCIUPesoPapa(pPapaDRef.current.value, pPapaHRef.current.value);
      }
    }
  };

  const medidasTPapa = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "tallapapa") {
        filterVars[i].desde = tPapaDRef.current.value;
        filterVars[i].hasta = tPapaHRef.current.value;
        filterVars[i].filter =
          filterVars[i].label +
          " " +
          tPapaDRef.current.value +
          "-" +
          tPapaHRef.current.value;

        getRCIUTallaPapa(tPapaDRef.current.value, tPapaHRef.current.value);
      }
    }
  };

  const ingresosMama = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "percapitasalariominimo") {
        filterVars[i].desde = ingresosDRef.current.value;
        filterVars[i].hasta = ingresosHRef.current.value;
        filterVars[i].filter =
          filterVars[i].label +
          " " +
          ingresosDRef.current.value +
          "-" +
          ingresosHRef.current.value;

        getRCIUIngresosMama(
          ingresosDRef.current.value,
          ingresosHRef.current.value
        );
      }
    }
  };

  const [estudio, setEstudio] = useState("");

  const estudioSel = (estudio) => {
    setEstudio(estudio);
  };

  const estudioFilter = () => {
    for (let i = 0; i < filterVars.length; i++) {
      if (filterVars[i].value === "nivelmama") {
        filterVars[i].filter = filterVars[i].label + " (" + estudio + ")";

        getRCIUEstudiosMama(estudio);
      }
    }
  };

  //* Render

  return (
    <div className="analysisRCIU">
      <div className="container">
        <GenderBase
          inicio={anioInicial}
          fin={anioFinal}
          vars={filterVars.length > 0 ? filterVars : []}
        />
        <div className="row pt-4">
          <div className="col-11">
            <h1>
              <b>Análisis del Entorno - RCIU</b>
            </h1>
          </div>
          <div className="col-1 text-end">
            <Filters filters={filterVars} />
          </div>
        </div>
        <div className="row">
          <p>
            En esta sección se encuentran diferentes visualizaciones referentes
            a variables prenatales y del entorno previo al nacimiento del bebé
            comparalables para pacientes con y sin RCIU a término y prematuros.
            En algunas de estas visualizaciones se podrá interactuar con zoom y
            movimiento y para todos los análisis se puede escoger el intervalo
            de tiempo deseado entre 1993 a 2020.
          </p>
        </div>
        <div className="row pt-2">
          <h3>
            <b>Frecuencia de RCIU en intervalos de años</b>
          </h3>
          <p>
            A continuación, se muestran las frecuencias absolutas y relativas de
            RCIU en intervalos de años. Estas gráficas iniciales toman como
            muestra todos los datos y los procentajes son relativos a este. Más
            adelante será posible realizar comparaciones con distintas muestras
            de interés.
          </p>
        </div>
        <div className="row pt-4">
          <div className="col-4 datAbs">
            <CanvasJSChart options={dataAbsFreq} />
          </div>
          <div className="col-8 datRel">
            <CanvasJSChart options={dataRelFreq} />
          </div>
        </div>
        <div className="antecedentesEntorno">
          <div className="row">
            <h3>
              <b>Antecedentes entorno en pacientes con y sin RCIU </b>
            </h3>
          </div>
          <div className="row">
            <p>
              Los datos mostrados a continuación muestran{" "}
              <b>frecuencias relativas</b> a una muestra total. Para el análisis
              de los datos se tomarán <b>cuatro muestras</b> significativas
              separadas en dos. La primera distinción es la de bebés{" "}
              <b>prematuros</b>, que son aquellos que tienen{" "}
              <b>menos de 37 semanas de edad gestacional al nacer</b> y los{" "}
              <b> a término</b> que tienen más de 37 semanas. De igual manera la
              otra distinción es la muestra de <b>RCIU</b>, para esta se tomó en
              cuenta el <b>peso de los bebés</b> como variable común para poder
              clasificar a los bebés con Restricción del Crecimiento
              Intrauterino. Para todas las gráficas mostradas se pueden agregar{" "}
              <b>variables prenatales</b> de interés que cambiarán el
              comportamiento de las curvas. Igualmente se pueden seleccionar los{" "}
              <b>años de interés</b> entre 1993 a 2020.
            </p>
          </div>
          <div className="graphsEntorno">
            <div className="row">
              <p>
                Seleccione una o varias variables de interés para poder
                visualizar los diferentes datos. Para hacer efectiva su consulta
                por favor dar click en <i>"Consultar"</i>, si desea limpiar las
                variables y datos dar click en <i>"Limpiar"</i>.
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
            <div className="row pt-4">
              <div className="col-9">
                {" "}
                <CanvasJSChart options={dataRelIFreqPrem} />
              </div>
              <div className="col-3">
                <h4>
                  <b>Valores Absolutos</b>
                </h4>
                {dataAbsolutePrem &&
                  dataAbsolutePrem
                    .filter((dat) => !dat.message)
                    .map((dat) => <CanvasJSChart options={dat} />)}
              </div>
            </div>
            <div className="row">
              {filterVars &&
                filterVars.map((variable) =>
                  variable.value === "pesomama" ? (
                    <MedidasGraphs
                      dataMedida={dataPesoMadrePrem}
                      title={"Distribución peso mamá"}
                      filter={true}
                      variablesSel={filterVars}
                      medidaFilter={medidasPMama}
                      desdeInput={pMamaDRef}
                      hastaInput={pMamaHRef}
                      estudios={false}
                    />
                  ) : variable.value === "tallamama" ? (
                    <MedidasGraphs
                      dataMedida={dataTallaMadrePrem}
                      filter={true}
                      variablesSel={filterVars}
                      title={"Distribución talla mamá"}
                      medidaFilter={medidasTMama}
                      desdeInput={tMamaDRef}
                      hastaInput={tMamaHRef}
                      estudios={false}
                    />
                  ) : variable.value === "pesopapa" ? (
                    <MedidasGraphs
                      dataMedida={dataPesoPadrePrem}
                      filter={true}
                      variablesSel={filterVars}
                      title={"Distribución peso papá"}
                      medidaFilter={medidasPPapa}
                      desdeInput={pPapaDRef}
                      hastaInput={pPapaHRef}
                      estudios={false}
                    />
                  ) : variable.value === "tallapapa" ? (
                    <MedidasGraphs
                      dataMedida={dataTallaPadrePrem}
                      filter={true}
                      variablesSel={filterVars}
                      title={"Distribución talla papá"}
                      medidaFilter={medidasTPapa}
                      desdeInput={tPapaDRef}
                      hastaInput={tPapaHRef}
                      estudios={false}
                    />
                  ) : variable.value === "nivelmama" ? (
                    <MedidasGraphs
                      dataMedida={dataEstudiosMadrePrem}
                      filter={true}
                      variablesSel={filterVars}
                      title={"Estudios mamá"}
                      medidaFilter={estudioFilter}
                      estudioSel={estudioSel}
                      estudios={true}
                    />
                  ) : variable.value === "percapitasalariominimo" ? (
                    <MedidasGraphs
                      dataMedida={dataIngresosMadrePrem}
                      filter={true}
                      variablesSel={filterVars}
                      title={"Ingresos per cápita"}
                      medidaFilter={ingresosMama}
                      estudios={false}
                      desdeInput={ingresosDRef}
                      hastaInput={ingresosHRef}
                    />
                  ) : (
                    <p></p>
                  )
                )}
            </div>
            <div className="row pt-4">
              <div className="col-9">
                {" "}
                <CanvasJSChart options={dataRelIFreqTerm} />
              </div>
              <div className="col-3">
                <h4>
                  <b>Valores Absolutos</b>
                </h4>
                {dataAbsoluteTerm &&
                  dataAbsoluteTerm
                    .filter((dat) => !dat.message)
                    .map((dat) => <CanvasJSChart options={dat} />)}
              </div>
            </div>
          </div>
          <div className="row">
            {filterVars &&
              filterVars.map((variable) =>
                variable.value === "pesomama" ? (
                  <MedidasGraphs
                    dataMedida={dataPesoMadreTerm}
                    filter={false}
                    title={"Distribución peso mamá"}
                  />
                ) : variable.value === "tallamama" ? (
                  <MedidasGraphs
                    dataMedida={dataTallaMadreTerm}
                    filter={false}
                    title={"Distribución talla mamá"}
                  />
                ) : variable.value === "pesopapa" ? (
                  <MedidasGraphs
                    dataMedida={dataPesoPadreTerm}
                    filter={false}
                    title={"Distribución peso papá"}
                  />
                ) : variable.value === "tallapapa" ? (
                  <MedidasGraphs
                    dataMedida={dataTallaPadreTerm}
                    filter={false}
                    title={"Distribución talla papá"}
                  />
                ) : variable.value === "nivelmama" ? (
                  <MedidasGraphs
                    dataMedida={dataEstudiosMadreTerm}
                    filter={false}
                    title={"Estudios mamá"}
                  />
                ) : variable.value === "percapitasalariominimo" ? (
                  <MedidasGraphs
                    dataMedida={dataIngresosMadreTerm}
                    filter={false}
                    title={"Ingresos per cápita"}
                  />
                ) : (
                  <p></p>
                )
              )}
          </div>
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
    </div>
  );
};

export default AnalysisEnv;
