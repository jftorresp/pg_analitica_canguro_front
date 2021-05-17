import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

//* Actions Imports
import {
  getEtapasCrecimiento,
  RCIUFreqDiasH,
  RCIUFreqUCI,
  RCIUFreqEGEntrada,
  parallelPMC,
  RCIUPromPesoPMC,
  RCIUOxiEntrada,
  RCIULecheMaterna,
  RCIULecheMaternaTime,
  RCIUAbsLecheMaternaTime,
  parallelCoordsLecheMaterna,
  getVarsByEtapaCrecimiento,
  RCIUNut4012,
} from "../actions/medidasCrecimientoAction";

//* Components Imports
import ParallelCoord from "./ParallelCoord";
import GenderBase from "./GenderBase";
import Handle from "./Handle";
import TooltipRail from "./TooltipRail";
import { Track } from "./Track";
import { Tick } from "./Tick";
import GroupedBar from "./GroupedBar";

//* Library Imports
import CanvasJSReact from "../assets/canvasjs.react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Select from "react-select";

const AnalysisGrowth = () => {
  // States for variables select
  const [variables, setVariables] = useState([]);
  const [varsSelected, setVarsSelected] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [etapasSelected, setEtapasSelected] = useState([]);
  //* States for data vis
  // States for Dias Hospitalizacion
  const [dataRCIUdiasH, setDataRCIUdiasH] = useState({});
  // States for UCI
  const [dataRCIUFreqUCIPrem, setDataRCIUFreqUCIPrem] = useState({});
  const [dataRCIUFreqUCITerm, setDataRCIUFreqUCITerm] = useState({});
  // States for EG
  const [dataRCIUFreqEGEntrada, setDataRCIUFreqEGEntrada] = useState({});
  const [dataRCIUFreqEGSalida, setDataRCIUFreqEGSalida] = useState({});
  // States for parallel coordinates
  const [dataParallelPMC1, setDataParallelPMC1] = useState([]);
  const [dataParallelPMC2, setDataParallelPMC2] = useState([]);
  const [dataParallelPMC3, setDataParallelPMC3] = useState([]);
  // States fro promedio peso
  const [dataRCIUPromPeso1, setDataRCIUPromPeso1] = useState({});
  const [dataRCIUPromPeso2, setDataRCIUPromPeso2] = useState({});
  const [dataRCIUPromPeso3, setDataRCIUPromPeso3] = useState({});
  // States for Oxigeno Entrada
  const [dataRCIUOxiEntrada, setDataRCIUOxiEntrada] = useState({});
  // States for Consumo Leche Materna
  const [dataRCIULecheMaterna, setDataRCIULecheMaterna] = useState({});
  const [dataRCIULecheMaterna40, setDataRCIULecheMaterna40] = useState({});
  const [dataRCIULecheMaterna40With, setDataRCIULecheMaterna40With] = useState(
    {}
  );
  const [
    dataRCIULecheMaterna40Without,
    setDataRCIULecheMaterna40Without,
  ] = useState({});
  const [dataRCIULecheMaterna3, setDataRCIULecheMaterna3] = useState({});
  const [dataRCIULecheMaterna3With, setDataRCIULecheMaterna3With] = useState(
    {}
  );
  const [
    dataRCIULecheMaterna3Without,
    setDataRCIULecheMaterna3Without,
  ] = useState({});
  const [dataRCIULecheMaterna6, setDataRCIULecheMaterna6] = useState({});
  const [dataRCIULecheMaterna6With, setDataRCIULecheMaterna6With] = useState(
    {}
  );
  const [
    dataRCIULecheMaterna6Without,
    setDataRCIULecheMaterna6Without,
  ] = useState({});
  const [dataRCIULecheMaterna9, setDataRCIULecheMaterna9] = useState({});
  const [dataRCIULecheMaterna9With, setDataRCIULecheMaterna9With] = useState(
    {}
  );
  const [
    dataRCIULecheMaterna9Without,
    setDataRCIULecheMaterna9Without,
  ] = useState({});
  const [dataRCIULecheMaterna12, setDataRCIULecheMaterna12] = useState({});
  const [dataRCIULecheMaterna12With, setDataRCIULecheMaterna12With] = useState(
    {}
  );
  const [
    dataRCIULecheMaterna12Without,
    setDataRCIULecheMaterna12Without,
  ] = useState({});
  // States for parallel coords milk
  const [
    dataParallelCoordsLecheMaterna40With,
    setDataParallelCoordsLecheMaterna40With,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna40Without,
    setDataParallelCoordsLecheMaterna40Without,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna3With,
    setDataParallelCoordsLecheMaterna3With,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna3Without,
    setDataParallelCoordsLecheMaterna3Without,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna6With,
    setDataParallelCoordsLecheMaterna6With,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna6Without,
    setDataParallelCoordsLecheMaterna6Without,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna9With,
    setDataParallelCoordsLecheMaterna9With,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna9Without,
    setDataParallelCoordsLecheMaterna9Without,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna12With,
    setDataParallelCoordsLecheMaterna12With,
  ] = useState([]);
  const [
    dataParallelCoordsLecheMaterna12Without,
    setDataParallelCoordsLecheMaterna12Without,
  ] = useState([]);

  const [dataRCIUNut40, setDataRCIUNut40] = useState({});
  const [dataRCIUNut12, setDataRCIUNut12] = useState({});

  //* States for years
  const [anioInicial, setAnioInicial] = useState(1993);
  const [anioFinal, setAnioFinal] = useState(2020);

  //* States for slider
  const defaultValues = [1993, 2020];
  const [domain, setDomain] = useState([1993, 2020]);
  const [values, setValues] = useState(defaultValues.slice());
  const [update, setUpdate] = useState(defaultValues.slice());

  const sliderStyle = {
    position: "relative",
    width: "100%",
  };

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
    maintainAspectRatio: false,
    responsive: true,
  };

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  CanvasJS.addColorSet("customColorSetPrem", ["#0E7FA6", "#FF955B"]);
  CanvasJS.addColorSet("customColorSetTerm", ["#70D6BC", "#A6330A"]);
  CanvasJS.addColorSet("customColorSetWith", ["#0E7FA6"]);
  CanvasJS.addColorSet("customColorSetWithout", ["#FF955B"]);

  //* API Calls

  const getEtapas = async () => {
    const response = await getEtapasCrecimiento();
    setEtapas(response);
  };

  const getVarsEtapas = async (selected) => {
    const etapasPOST = selected.map((e) => e.value);
    const response = await getVarsByEtapaCrecimiento(etapasPOST);
    setVariables(response);
  };

  const getRCIUFreqDiasH = async () => {
    const response = await RCIUFreqDiasH(anioInicial, anioFinal);
    setDataRCIUdiasH(response);
  };

  const getRCIUFreqUCI = async () => {
    const responsePrem = await RCIUFreqUCI(anioInicial, anioFinal, "true");
    setDataRCIUFreqUCIPrem(responsePrem);
    const responseTerm = await RCIUFreqUCI(anioInicial, anioFinal, "false");
    setDataRCIUFreqUCITerm(responseTerm);
  };

  const getRCIUFreqEGEntrada = async () => {
    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "true"
    );
    formatAxisTooltip(response);
    setDataRCIUFreqEGEntrada(response);
  };

  const getRCIUFreqEGSalida = async () => {
    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "false"
    );
    formatAxisTooltip(response);
    setDataRCIUFreqEGSalida(response);
  };

  const getparallelPMC = async () => {
    const response1 = await parallelPMC(anioInicial, anioFinal, "1");
    setDataParallelPMC1(response1);
    ReactDOM.render(<p></p>, document.getElementById("parOne"));
    const div = (
      <ParallelCoord
        data={response1}
        title={"Bebés sin RCIU y con RCEU"}
        width={500}
      />
    );
    ReactDOM.render(div, document.getElementById("parOne"));

    const response2 = await parallelPMC(anioInicial, anioFinal, "2");
    setDataParallelPMC2(response2);
    ReactDOM.render(<p></p>, document.getElementById("parTwo"));
    const div2 = (
      <ParallelCoord
        data={response2}
        title={"Bebés sin RCIU y sin RCEU"}
        width={500}
      />
    );
    ReactDOM.render(div2, document.getElementById("parTwo"));

    const response3 = await parallelPMC(anioInicial, anioFinal, "3");
    setDataParallelPMC3(response3);
    ReactDOM.render(<p></p>, document.getElementById("parThree"));
    const div3 = (
      <ParallelCoord data={response3} title={"Bebés con RCIU"} width={500} />
    );
    ReactDOM.render(div3, document.getElementById("parThree"));
  };

  const getRCIUPromPesoPMC = async () => {
    const response1 = await RCIUPromPesoPMC(anioInicial, anioFinal, "1");
    setDataRCIUPromPeso1(response1);

    const response2 = await RCIUPromPesoPMC(anioInicial, anioFinal, "2");
    setDataRCIUPromPeso2(response2);

    const response3 = await RCIUPromPesoPMC(anioInicial, anioFinal, "3");
    setDataRCIUPromPeso3(response3);
  };

  const getRCIUOxiEntrada = async () => {
    const response = await RCIUOxiEntrada(anioInicial, anioFinal);
    setDataRCIUOxiEntrada(response);
  };

  const getRCIULecheMaterna = async () => {
    const response = await RCIULecheMaterna(anioInicial, anioFinal);
    setDataRCIULecheMaterna(response);
  };

  const getRCIULecheMaternaTime40 = async () => {
    const response40 = await RCIULecheMaternaTime(anioInicial, anioFinal, "40");
    const response40With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "40",
      1
    );
    const response40Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "40",
      0
    );

    formatAxisTooltip(response40);
    setDataRCIULecheMaterna40(response40);
    setDataRCIULecheMaterna40With(response40With);
    setDataRCIULecheMaterna40Without(response40Without);
  };

  const getRCIULecheMaternaTime3 = async () => {
    const response3 = await RCIULecheMaternaTime(anioInicial, anioFinal, "3");
    const response3With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "3",
      1
    );
    const response3Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "3",
      0
    );
    formatAxisTooltip(response3);
    setDataRCIULecheMaterna3(response3);
    setDataRCIULecheMaterna3With(response3With);
    setDataRCIULecheMaterna3Without(response3Without);
  };

  const getRCIULecheMaternaTime6 = async () => {
    const response6 = await RCIULecheMaternaTime(anioInicial, anioFinal, "6");
    const response6With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "6",
      "1"
    );
    const response6Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "6",
      "0"
    );
    formatAxisTooltip(response6);
    setDataRCIULecheMaterna6(response6);
    setDataRCIULecheMaterna6With(response6With);
    setDataRCIULecheMaterna6Without(response6Without);
  };

  const getRCIULecheMaternaTime9 = async () => {
    const response9 = await RCIULecheMaternaTime(anioInicial, anioFinal, "9");
    const response9With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "9",
      1
    );
    const response9Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "9",
      0
    );
    formatAxisTooltip(response9);
    setDataRCIULecheMaterna9(response9);
    setDataRCIULecheMaterna9With(response9With);
    setDataRCIULecheMaterna9Without(response9Without);
  };

  const getRCIULecheMaternaTime12 = async () => {
    const response12 = await RCIULecheMaternaTime(anioInicial, anioFinal, "12");
    const response12With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "12",
      1
    );
    const response12Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "12",
      0
    );
    formatAxisTooltip(response12);
    setDataRCIULecheMaterna12(response12);
    setDataRCIULecheMaterna12With(response12With);
    setDataRCIULecheMaterna12Without(response12Without);
  };

  const getparallelCoordsLecheMaterna = async (time) => {
    const responseWith = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "1"
    );

    if (time === "40") {
      setDataParallelCoordsLecheMaterna40With(responseWith);
    } else if (time === "3") {
      setDataParallelCoordsLecheMaterna3With(responseWith);
    } else if (time === "6") {
      setDataParallelCoordsLecheMaterna6With(responseWith);
    } else if (time === "9") {
      setDataParallelCoordsLecheMaterna9With(responseWith);
    } else if (time === "12") {
      setDataParallelCoordsLecheMaterna12With(responseWith);
    }
    ReactDOM.render(<p></p>, document.getElementById(`par${time}With`));
    const div = (
      <ParallelCoord data={responseWith} title={"Con RCIU"} width={680} />
    );
    ReactDOM.render(div, document.getElementById(`par${time}With`));

    const responseWithout = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "0"
    );

    if (time === "40") {
      setDataParallelCoordsLecheMaterna40Without(responseWithout);
    } else if (time === "3") {
      setDataParallelCoordsLecheMaterna3Without(responseWithout);
    } else if (time === "6") {
      setDataParallelCoordsLecheMaterna6Without(responseWithout);
    } else if (time === "9") {
      setDataParallelCoordsLecheMaterna9Without(responseWithout);
    } else if (time === "12") {
      setDataParallelCoordsLecheMaterna12Without(responseWithout);
    }
    ReactDOM.render(<p></p>, document.getElementById(`par${time}Without`));
    const div2 = (
      <ParallelCoord data={responseWithout} title={"Sin RCIU"} width={680} />
    );
    ReactDOM.render(div2, document.getElementById(`par${time}Without`));
  };

  const getRCIUNut4012 = async () => {
    const response40 = await RCIUNut4012(anioInicial, anioFinal, "40");
    setDataRCIUNut40(response40);
    const response12 = await RCIUNut4012(anioInicial, anioFinal, "12");
    setDataRCIUNut12(response12);
  };

  // * Helper functions
  const formatAxisTooltip = (response) => {
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
          return yearsInterval[i] + ": " + e.entries[0].dataPoint.y + "%";
        }
      }
    };
  };

  // Handlers para los Selects
  const onChangeEtapas = (selectedOption) => {
    setEtapasSelected(selectedOption);
    getVarsEtapas(selectedOption);
  };

  const onChangeVars = (selectedOption) => {
    setVarsSelected(selectedOption);
  };

  const cleanFields = () => {
    setEtapasSelected([]);
    setVarsSelected([]);
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "TotalDiasHospitalizacion") {
        setDataRCIUdiasH({});
      }

      if (varsSelected[i].value === "UCI") {
        setDataRCIUFreqUCIPrem({});
        setDataRCIUFreqUCITerm({});
      }

      if (varsSelected[i].value === "edadgestacionalalaentrada") {
        setDataRCIUFreqEGEntrada({});
      }

      if (varsSelected[i].value === "edadgestasalPC") {
        setDataRCIUFreqEGSalida({});
      }

      if (varsSelected[i].value === "medidasEntrada") {
        setDataParallelPMC1([]);
        ReactDOM.render(<p></p>, document.getElementById("parOne"));
        setDataParallelPMC2([]);
        ReactDOM.render(<p></p>, document.getElementById("parTwo"));
        setDataParallelPMC3([]);
        ReactDOM.render(<p></p>, document.getElementById("parThree"));
      }

      if (varsSelected[i].value === "pesoEntradaSalida") {
        setDataRCIUPromPeso1([]);
        setDataRCIUPromPeso2([]);
        setDataRCIUPromPeso3([]);
      }

      if (varsSelected[i].value === "oxigenoentrada") {
        setDataRCIUOxiEntrada({});
      }

      if (varsSelected[i].value === "alimentacion.sem40") {
        setDataRCIULecheMaterna40({});
        setDataRCIULecheMaterna40With({});
        setDataRCIULecheMaterna40Without({});
      }

      if (varsSelected[i].value === "alimentacion.mes3") {
        setDataRCIULecheMaterna3({});
        setDataRCIULecheMaterna3With({});
        setDataRCIULecheMaterna3Without({});
      }

      if (varsSelected[i].value === "alimentacion.mes6") {
        setDataRCIULecheMaterna6({});
        setDataRCIULecheMaterna6With({});
        setDataRCIULecheMaterna6Without({});
      }

      if (varsSelected[i].value === "alimentacion.mes9") {
        setDataRCIULecheMaterna9({});
        setDataRCIULecheMaterna9With({});
        setDataRCIULecheMaterna9Without({});
      }

      if (varsSelected[i].value === "alimentacion.mes12") {
        setDataRCIULecheMaterna12({});
        setDataRCIULecheMaterna12With({});
        setDataRCIULecheMaterna12Without({});
      }

      if (varsSelected[i].value === "medidasLecheSem40") {
        setDataParallelCoordsLecheMaterna40With([]);
        ReactDOM.render(<p></p>, document.getElementById("par40With"));
        setDataParallelCoordsLecheMaterna40Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par40Without"));
      }

      if (varsSelected[i].value === "medidasLecheMes3") {
        setDataParallelCoordsLecheMaterna3With([]);
        ReactDOM.render(<p></p>, document.getElementById("par3With"));
        setDataParallelCoordsLecheMaterna3Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par3Without"));
      }

      if (varsSelected[i].value === "medidasLecheMes6") {
        setDataParallelCoordsLecheMaterna6With([]);
        ReactDOM.render(<p></p>, document.getElementById("par6With"));
        setDataParallelCoordsLecheMaterna6Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par6Without"));
      }

      if (varsSelected[i].value === "medidasLecheMes9") {
        setDataParallelCoordsLecheMaterna9With([]);
        ReactDOM.render(<p></p>, document.getElementById("par9With"));
        setDataParallelCoordsLecheMaterna9Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par9Without"));
      }

      if (varsSelected[i].value === "medidasLecheMes12") {
        setDataParallelCoordsLecheMaterna12With([]);
        ReactDOM.render(<p></p>, document.getElementById("par12With"));
        setDataParallelCoordsLecheMaterna12Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par12Without"));
      }

      if (varsSelected[i].value === "nut4012") {
        setDataRCIUNut40({});
        setDataRCIUNut12({});
      }
    }
  };

  const onUpdate = (update) => {
    setUpdate(update);
  };

  const graphData = () => {
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "TotalDiasHospitalizacion") {
        getRCIUFreqDiasH();
      }

      if (varsSelected[i].value === "UCI") {
        getRCIUFreqUCI();
      }

      if (varsSelected[i].value === "edadgestacionalalaentrada") {
        getRCIUFreqEGEntrada();
      }

      if (varsSelected[i].value === "edadgestasalPC") {
        getRCIUFreqEGSalida();
      }

      if (varsSelected[i].value === "medidasEntrada") {
        getparallelPMC();
      }

      if (varsSelected[i].value === "pesoEntradaSalida") {
        getRCIUPromPesoPMC();
      }

      if (varsSelected[i].value === "oxigenoentrada") {
        getRCIUOxiEntrada();
      }

      if (varsSelected[i].value === "alimentacion.sem40") {
        getRCIULecheMaternaTime40();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes3") {
        getRCIULecheMaternaTime3();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes6") {
        getRCIULecheMaternaTime6();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes9") {
        getRCIULecheMaternaTime9();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes12") {
        getRCIULecheMaternaTime12();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheSem40") {
        getparallelCoordsLecheMaterna("40");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes3") {
        getparallelCoordsLecheMaterna("3");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes6") {
        getparallelCoordsLecheMaterna("6");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes9") {
        getparallelCoordsLecheMaterna("9");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes12") {
        getparallelCoordsLecheMaterna("12");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "nut4012") {
        getRCIUNut4012();
      }
    }
  };

  const onChange = (valuesNew) => {
    setValues(valuesNew);
    setAnioInicial(valuesNew[0]);
    setAnioFinal(valuesNew[1]);
    for (let i = 0; i < varsSelected.length; i++) {
      if (varsSelected[i].value === "TotalDiasHospitalizacion") {
        getRCIUFreqDiasH();
      }

      if (varsSelected[i].value === "UCI") {
        getRCIUFreqUCI();
      }

      if (varsSelected[i].value === "edadgestacionalalaentrada") {
        getRCIUFreqEGEntrada();
      }

      if (varsSelected[i].value === "edadgestasalPC") {
        getRCIUFreqEGSalida();
      }

      if (varsSelected[i].value === "medidasEntrada") {
        getparallelPMC();
      }

      if (varsSelected[i].value === "pesoEntradaSalida") {
        getRCIUPromPesoPMC();
      }

      if (varsSelected[i].value === "oxigenoentrada") {
        getRCIUOxiEntrada();
      }

      if (varsSelected[i].value === "alimentacion.sem40") {
        getRCIULecheMaternaTime40();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes3") {
        getRCIULecheMaternaTime3();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes6") {
        getRCIULecheMaternaTime6();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes9") {
        getRCIULecheMaternaTime9();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "alimentacion.mes12") {
        getRCIULecheMaternaTime12();
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheSem40") {
        getparallelCoordsLecheMaterna("40");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes3") {
        getparallelCoordsLecheMaterna("3");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes6") {
        getparallelCoordsLecheMaterna("6");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes9") {
        getparallelCoordsLecheMaterna("9");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "medidasLecheMes12") {
        getparallelCoordsLecheMaterna("12");
        getRCIULecheMaterna();
      }

      if (varsSelected[i].value === "nut4012") {
        getRCIUNut4012();
      }
    }
  };

  useEffect(() => {
    getEtapas();
  }, []);

  return (
    <div className="analysisGrowth">
      <div className="container">
        <GenderBase inicio={anioInicial} fin={anioFinal} />
        <div className="row pt-4">
          <h1 className="text-start">
            <b>Análisis Crecimiento - RCIU</b>
          </h1>
        </div>
        <div className="row pt-2">
          <p className="text-start text-justify">
            En esta sección se podrán estudiar las variables antropomórficas
            para neonatos con diferentes tipos de RCIU en diferentes intervalos
            de tiempo. Se podrán comparar de a dos tipos de RCIU y seleccionar
            la etapa de crecimiento de interés. La muestra de datos
            característica es de neonatos con{" "}
            <b>35 o menos semanas de edad gestacional</b>
          </p>
        </div>
        <div className="row">
          <p>
            Seleccione una o varias variables de interés para poder visualizar
            los diferentes datos. Para hacer efectiva su consulta por favor dar
            click en <i>"Consultar"</i>, si desea limpiar las variables y datos
            dar click en <i>"Limpiar"</i>.
          </p>
        </div>
        <div className="row">
          <div className="col-4">
            <label>
              <b>Etapas crecimiento</b>
            </label>
            <Select
              className="basic-single text-start"
              isMulti
              options={etapas}
              value={etapasSelected}
              onChange={onChangeEtapas}
            />
          </div>
          <div className="col-4">
            <label>
              <b>Variables</b>
            </label>
            <Select
              className="basic-single text-start"
              isMulti
              options={variables}
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
        {Object.entries(dataRCIUdiasH).length !== 0 ||
        (Object.entries(dataRCIUFreqUCIPrem).length !== 0 &&
          Object.entries(dataRCIUFreqUCITerm).length !== 0) ? (
          <div className="row pt-4">
            <h3>
              <b>Antecedentes Neonatales</b>
            </h3>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUdiasH).length !== 0 ? (
          <div className="diasH">
            <div className="row">
              <h5>
                <b>Promedio días de hospitalización con y sin RCIU</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12">
                {" "}
                <GroupedBar
                  data={dataRCIUdiasH}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUFreqUCIPrem).length !== 0 &&
        Object.entries(dataRCIUFreqUCITerm).length !== 0 ? (
          <div className="uci">
            <div className="row">
              <h5>
                <b>Unidad de cuidados intensivos (UCI)</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-6">
                <CanvasJSChart options={dataRCIUFreqUCIPrem} />
              </div>
              <div className="col-6">
                <CanvasJSChart options={dataRCIUFreqUCITerm} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUFreqEGEntrada).length !== 0 ||
        Object.entries(dataRCIUFreqEGSalida).length !== 0 ||
        (dataParallelPMC1.length > 0 &&
          dataParallelPMC2.length > 0 &&
          dataParallelPMC3.length > 0) ||
        (Object.entries(dataRCIUPromPeso1).length !== 0 &&
          Object.entries(dataRCIUPromPeso2).length !== 0 &&
          Object.entries(dataRCIUPromPeso3).length !== 0) ||
        Object.entries(dataRCIUOxiEntrada).length !== 0 ? (
          <div className="row pt-4">
            <h3>
              <b>Antecedentes ingreso al Programa Madre Canguro (PMC)</b>
            </h3>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUFreqEGEntrada).length !== 0 ? (
          <div className="EGEntrada">
            <div className="row">
              <h5>
                <b>Promedio edad gestacional entrada al programa</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs2">
                <CanvasJSChart options={dataRCIUFreqEGEntrada} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUFreqEGSalida).length !== 0 ? (
          <div className="EGSalida">
            <div className="row">
              <h5>
                <b>Promedio edad gestacional salida al programa</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs2">
                <CanvasJSChart options={dataRCIUFreqEGSalida} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelPMC1.length > 0 &&
        dataParallelPMC2.length > 0 &&
        dataParallelPMC3.length > 0 ? (
          <div className="parallelPMC">
            <div className="row">
              <h5>
                <b>Medidas antropométricas entrada al programa</b>
              </h5>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-4" id="parOne"></div>
          <div className="col-4" id="parTwo"></div>
          <div className="col-4" id="parThree"></div>
        </div>
        {Object.entries(dataRCIUPromPeso1).length !== 0 &&
        Object.entries(dataRCIUPromPeso2).length !== 0 &&
        Object.entries(dataRCIUPromPeso3).length !== 0 ? (
          <div className="pesoES">
            <div className="row">
              <h5>
                <b>Promedio peso entrada y salida del programa</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4">
                <h6>
                  <b>sin RCIU y con RCEU</b>
                </h6>
                <GroupedBar
                  data={dataRCIUPromPeso1}
                  options={options}
                  height={100}
                />
              </div>
              <div className="col-4">
                <h6>
                  <b>sin RCIU y sin RCEU</b>
                </h6>
                <GroupedBar
                  data={dataRCIUPromPeso2}
                  options={options}
                  height={100}
                />
              </div>
              <div className="col-4">
                <h6>
                  <b>con RCIU</b>
                </h6>
                <GroupedBar
                  data={dataRCIUPromPeso3}
                  options={options}
                  height={100}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUOxiEntrada).length !== 0 ? (
          <div className="oxi">
            <div className="row">
              <h5>
                <b>Ingreso al programa canguro con oxígeno</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs">
                <CanvasJSChart options={dataRCIUOxiEntrada} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}

        {(Object.entries(dataRCIULecheMaterna40).length !== 0 &&
          Object.entries(dataRCIULecheMaterna40With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna40Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna3).length !== 0 &&
          Object.entries(dataRCIULecheMaterna3With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna3Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna6).length !== 0 &&
          Object.entries(dataRCIULecheMaterna6With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna6Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna9).length !== 0 &&
          Object.entries(dataRCIULecheMaterna9With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna9Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna12).length !== 0 &&
          Object.entries(dataRCIULecheMaterna12With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna12Without).length !== 0) ||
        (dataParallelCoordsLecheMaterna40With.length > 0 &&
          dataParallelCoordsLecheMaterna40Without.length > 0) ||
        (dataParallelCoordsLecheMaterna3With.length > 0 &&
          dataParallelCoordsLecheMaterna3Without.length > 0) ||
        (dataParallelCoordsLecheMaterna6With.length > 0 &&
          dataParallelCoordsLecheMaterna6Without.length > 0) ||
        (dataParallelCoordsLecheMaterna9With.length > 0 &&
          dataParallelCoordsLecheMaterna9Without.length > 0) ||
        (dataParallelCoordsLecheMaterna12With.length > 0 &&
          dataParallelCoordsLecheMaterna12Without.length > 0) ? (
          <div className="row pt-4">
            <h3>
              <b>Medidas antropométricas y nutrición</b>
            </h3>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {(Object.entries(dataRCIULecheMaterna40).length !== 0 &&
          Object.entries(dataRCIULecheMaterna40With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna40Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna3).length !== 0 &&
          Object.entries(dataRCIULecheMaterna3With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna3Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna6).length !== 0 &&
          Object.entries(dataRCIULecheMaterna6With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna6Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna9).length !== 0 &&
          Object.entries(dataRCIULecheMaterna9With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna9Without).length !== 0) ||
        (Object.entries(dataRCIULecheMaterna12).length !== 0 &&
          Object.entries(dataRCIULecheMaterna12With).length !== 0 &&
          Object.entries(dataRCIULecheMaterna12Without).length !== 0) ||
        (dataParallelCoordsLecheMaterna40With.length > 0 &&
          dataParallelCoordsLecheMaterna40Without.length > 0) ||
        (dataParallelCoordsLecheMaterna3With.length > 0 &&
          dataParallelCoordsLecheMaterna3Without.length > 0) ||
        (dataParallelCoordsLecheMaterna6With.length > 0 &&
          dataParallelCoordsLecheMaterna6Without.length > 0) ||
        (dataParallelCoordsLecheMaterna9With.length > 0 &&
          dataParallelCoordsLecheMaterna9Without.length > 0) ||
        (dataParallelCoordsLecheMaterna12With.length > 0 &&
          dataParallelCoordsLecheMaterna12Without.length > 0) ? (
          <div className="nut">
            <div className="row">
              <h5>
                <b>Consumo leche materna primer año de vida</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12">
                <GroupedBar
                  data={dataRCIULecheMaterna}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIULecheMaterna40).length !== 0 &&
        Object.entries(dataRCIULecheMaterna40With).length !== 0 &&
        Object.entries(dataRCIULecheMaterna40Without).length !== 0 ? (
          <div className="leche40S">
            {" "}
            <div className="row">
              <h5>
                <b>Consumo leche materna a las 40 semanas</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-8 datAbs2">
                <CanvasJSChart options={dataRCIULecheMaterna40} />
              </div>
              <div className="col-4 datAbs3">
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna40With} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna40Without} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIULecheMaterna3).length !== 0 &&
        Object.entries(dataRCIULecheMaterna3With).length !== 0 &&
        Object.entries(dataRCIULecheMaterna3Without).length !== 0 ? (
          <div className="leche3M">
            {" "}
            <div className="row">
              <h5>
                <b>Consumo leche materna a los 3 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-8 datAbs2">
                <CanvasJSChart options={dataRCIULecheMaterna3} />
              </div>
              <div className="col-4 datAbs3">
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna3With} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna3Without} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIULecheMaterna3).length !== 0 &&
        Object.entries(dataRCIULecheMaterna3With).length !== 0 &&
        Object.entries(dataRCIULecheMaterna3Without).length !== 0 ? (
          <div className="leche6M">
            {" "}
            <div className="row">
              <h5>
                <b>Consumo leche materna a los 6 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-8 datAbs2">
                <CanvasJSChart options={dataRCIULecheMaterna6} />
              </div>
              <div className="col-4 datAbs3">
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna6With} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna6Without} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIULecheMaterna9).length !== 0 &&
        Object.entries(dataRCIULecheMaterna9With).length !== 0 &&
        Object.entries(dataRCIULecheMaterna9Without).length !== 0 ? (
          <div className="leche9M">
            {" "}
            <div className="row">
              <h5>
                <b>Consumo leche materna a los 9 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-8 datAbs2">
                <CanvasJSChart options={dataRCIULecheMaterna9} />
              </div>
              <div className="col-4 datAbs3">
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna9With} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna9Without} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIULecheMaterna12).length !== 0 &&
        Object.entries(dataRCIULecheMaterna12With).length !== 0 &&
        Object.entries(dataRCIULecheMaterna12Without).length !== 0 ? (
          <div className="leche12M">
            {" "}
            <div className="row">
              <h5>
                <b>Consumo leche materna a los 12 meses (1 año)</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-8 datAbs2">
                <CanvasJSChart options={dataRCIULecheMaterna12} />
              </div>
              <div className="col-4 datAbs3">
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna12With} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <CanvasJSChart options={dataRCIULecheMaterna12Without} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {(dataParallelCoordsLecheMaterna40With.length > 0 &&
          dataParallelCoordsLecheMaterna40Without.length > 0) ||
        (dataParallelCoordsLecheMaterna3With.length > 0 &&
          dataParallelCoordsLecheMaterna3Without.length > 0) ||
        (dataParallelCoordsLecheMaterna6With.length > 0 &&
          dataParallelCoordsLecheMaterna6Without.length > 0) ||
        (dataParallelCoordsLecheMaterna9With.length > 0 &&
          dataParallelCoordsLecheMaterna9Without.length > 0) ||
        (dataParallelCoordsLecheMaterna12With.length > 0 &&
          dataParallelCoordsLecheMaterna12Without.length > 0) ? (
          <div className="row">
            <h5>
              <b>
                Tendencias medidas antropométricas con el consumo de leche
                materna
              </b>
            </h5>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsLecheMaterna40With.length > 0 &&
        dataParallelCoordsLecheMaterna40Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>40 semanas</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par40With"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par40Without"></div>
          </div>
        </div>
        {dataParallelCoordsLecheMaterna3With.length > 0 &&
        dataParallelCoordsLecheMaterna3Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>3 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par3With"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par3Without"></div>
          </div>
        </div>
        {dataParallelCoordsLecheMaterna6With.length > 0 &&
        dataParallelCoordsLecheMaterna6Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>6 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par6With"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par6Without"></div>
          </div>
        </div>
        {dataParallelCoordsLecheMaterna9With.length > 0 &&
        dataParallelCoordsLecheMaterna9Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>9 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par9With"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par9Without"></div>
          </div>
        </div>
        {dataParallelCoordsLecheMaterna12With.length > 0 &&
        dataParallelCoordsLecheMaterna12Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>12 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par12With"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par12Without"></div>
          </div>
        </div>
        {Object.entries(dataRCIUNut40).length !== 0 &&
        Object.entries(dataRCIUNut12).length !== 0 ? (
          <div className="row pt-4">
            <h3>
              <b>Medidas antropométricas seguimiento con y sin RCIU</b>
            </h3>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataRCIUNut40).length !== 0 &&
        Object.entries(dataRCIUNut12).length !== 0 ? (
          <div className="nu4012">
            <div className="row">
              <h5>
                <b>
                  Nutrición general 40 semanas y 12 meses ({anioInicial} -{" "}
                  {anioFinal})
                </b>
              </h5>
            </div>
            <div className="row">
              <div className="col-6">
                <GroupedBar
                  data={dataRCIUNut40}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-6">
                <GroupedBar
                  data={dataRCIUNut12}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
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
};

export default AnalysisGrowth;
