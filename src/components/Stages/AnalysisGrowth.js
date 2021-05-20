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
  getGriffiths,
  RCIUInfanibProm,
  RCIUInfanibTime,
  RCIUoftalmologia,
  RCIUoptometria,
  RCIUaudiometria,
  RCIUPromMedidasGrowth,
  RCIUMedidaAnio,
} from "../../actions/medidasCrecimientoAction";

//* Components Imports
import ParallelCoord from "../Graphs/ParallelCoord";
import GenderBase from "../Graphs/GenderBase";
import Handle from "../Slider/Handle";
import TooltipRail from "../Slider/TooltipRail";
import { Track } from "../Slider/Track";
import { Tick } from "../Slider/Tick";
import GroupedBar from "../Graphs/GroupedBar";

//* Library Imports
import CanvasJSReact from "../../assets/canvasjs.react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Select from "react-select";
import Filters from "../Filter/Filters";

const AnalysisGrowth = (props) => {
  // States for variables select
  const [variables, setVariables] = useState([]);
  const [varsSelected, setVarsSelected] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [etapasSelected, setEtapasSelected] = useState([]);
  const [filterVars, setFilterVars] = useState(props.inputVars);

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

  const [dataGriffiths1, setDataGriffiths1] = useState({});
  const [dataGriffiths2, setDataGriffiths2] = useState({});
  const [dataGriffiths3, setDataGriffiths3] = useState({});

  const [dataInfanib1, setDataInfanib1] = useState({});
  const [dataInfanib2, setDataInfanib2] = useState({});
  const [dataInfanib3, setDataInfanib3] = useState({});

  const [data3MInfanib1, setData3MInfanib1] = useState({});
  const [data3MInfanib2, setData3MInfanib2] = useState({});
  const [data3MInfanib3, setData3MInfanib3] = useState({});
  const [data6MInfanib1, setData6MInfanib1] = useState({});
  const [data6MInfanib2, setData6MInfanib2] = useState({});
  const [data6MInfanib3, setData6MInfanib3] = useState({});
  const [data9MInfanib1, setData9MInfanib1] = useState({});
  const [data9MInfanib2, setData9MInfanib2] = useState({});
  const [data9MInfanib3, setData9MInfanib3] = useState({});
  const [data12MInfanib1, setData12MInfanib1] = useState({});
  const [data12MInfanib2, setData12MInfanib2] = useState({});
  const [data12MInfanib3, setData12MInfanib3] = useState({});

  const [dataOft1, setDataOft1] = useState({});
  const [dataOft2, setDataOft2] = useState({});
  const [dataOft3, setDataOft3] = useState({});
  const [dataOpt1, setDataOpt1] = useState({});
  const [dataOpt2, setDataOpt2] = useState({});
  const [dataOpt3, setDataOpt3] = useState({});
  const [dataAud1, setDataAud1] = useState({});
  const [dataAud2, setDataAud2] = useState({});
  const [dataAud3, setDataAud3] = useState({});

  //* States for years
  const [anioInicial, setAnioInicial] = useState(1993);
  const [anioFinal, setAnioFinal] = useState(2020);

  //* States for slider
  const defaultValues = [1993, 2020];
  const [domain, setDomain] = useState([1993, 2020]);
  const [values, setValues] = useState(defaultValues.slice());
  const [update, setUpdate] = useState(defaultValues.slice());

  // * States data parallel coords medidas

  const [
    dataParallelCoordsMedidas40With,
    setDataParallelCoordsMedidas40With,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas40Without,
    setDataParallelCoordsMedidas40Without,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas3With,
    setDataParallelCoordsMedidas3With,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas3Without,
    setDataParallelCoordsMedidas3Without,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas6With,
    setDataParallelCoordsMedidas6With,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas6Without,
    setDataParallelCoordsMedidas6Without,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas9With,
    setDataParallelCoordsMedidas9With,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas9Without,
    setDataParallelCoordsMedidas9Without,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas12With,
    setDataParallelCoordsMedidas12With,
  ] = useState([]);
  const [
    dataParallelCoordsMedidas12Without,
    setDataParallelCoordsMedidas12Without,
  ] = useState([]);

  const [dataPromPeso40, setDataPromPeso40] = useState({});
  const [dataPromPeso3, setDataPromPeso3] = useState({});
  const [dataPromPeso6, setDataPromPeso6] = useState({});
  const [dataPromPeso9, setDataPromPeso9] = useState({});
  const [dataPromPeso12, setDataPromPeso12] = useState({});
  const [dataPromTalla40, setDataPromTalla40] = useState({});
  const [dataPromTalla3, setDataPromTalla3] = useState({});
  const [dataPromTalla6, setDataPromTalla6] = useState({});
  const [dataPromTalla9, setDataPromTalla9] = useState({});
  const [dataPromTalla12, setDataPromTalla12] = useState({});
  const [dataPromPc40, setDataPromPc40] = useState({});
  const [dataPromPc3, setDataPromPc3] = useState({});
  const [dataPromPc6, setDataPromPc6] = useState({});
  const [dataPromPc9, setDataPromPc9] = useState({});
  const [dataPromPc12, setDataPromPc12] = useState({});

  const [dataPesoAnio, setDataPesoAnio] = useState({});
  const [dataTallaAnio, setDataTallaAnio] = useState({});
  const [dataPcAnio, setDataPcAnio] = useState({});

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

  CanvasJS.addColorSet("customColorSet", [
    "#0E7FA6",
    "#FF955B",
    "#70D6BC",
    "#A6330A",
  ]);
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
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUFreqDiasH(anioInicial, anioFinal, variables);

    setDataRCIUdiasH(response);
  };

  const getRCIUFreqUCI = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const responsePrem = await RCIUFreqUCI(
      anioInicial,
      anioFinal,
      "true",
      variables
    );
    const responseTerm = await RCIUFreqUCI(
      anioInicial,
      anioFinal,
      "false",
      variables
    );

    setDataRCIUFreqUCIPrem(responsePrem);
    setDataRCIUFreqUCITerm(responseTerm);
  };

  const getRCIUFreqEGEntrada = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "true",
      variables
    );

    formatAxisTooltip(response);
    setDataRCIUFreqEGEntrada(response);
  };

  const getRCIUFreqEGSalida = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }
    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "false",
      variables
    );

    formatAxisTooltip(response);
    setDataRCIUFreqEGSalida(response);
  };

  const getparallelPMC = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await parallelPMC(anioInicial, anioFinal, "1", variables);
    const response2 = await parallelPMC(anioInicial, anioFinal, "2", variables);
    const response3 = await parallelPMC(anioInicial, anioFinal, "3", variables);

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

    setDataParallelPMC3(response3);
    ReactDOM.render(<p></p>, document.getElementById("parThree"));
    const div3 = (
      <ParallelCoord data={response3} title={"Bebés con RCIU"} width={500} />
    );
    ReactDOM.render(div3, document.getElementById("parThree"));
  };

  const getRCIUPromPesoPMC = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUPromPesoPMC(
      anioInicial,
      anioFinal,
      "1",
      variables
    );
    const response2 = await RCIUPromPesoPMC(
      anioInicial,
      anioFinal,
      "2",
      variables
    );
    const response3 = await RCIUPromPesoPMC(
      anioInicial,
      anioFinal,
      "3",
      variables
    );

    setDataRCIUPromPeso1(response1);

    setDataRCIUPromPeso2(response2);

    setDataRCIUPromPeso3(response3);
  };

  const getRCIUOxiEntrada = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUOxiEntrada(anioInicial, anioFinal, variables);
    setDataRCIUOxiEntrada(response);
  };

  const getRCIULecheMaterna = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIULecheMaterna(anioInicial, anioFinal, variables);

    setDataRCIULecheMaterna(response);
  };

  const getRCIULecheMaternaTime40 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response40 = await RCIULecheMaternaTime(
      anioInicial,
      anioFinal,
      "40",
      variables
    );
    const response40With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "40",
      "1",
      variables
    );
    const response40Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "40",
      "0",
      variables
    );

    formatAxisTooltip(response40);
    setDataRCIULecheMaterna40(response40);
    setDataRCIULecheMaterna40With(response40With);
    setDataRCIULecheMaterna40Without(response40Without);
  };

  const getRCIULecheMaternaTime3 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response3 = await RCIULecheMaternaTime(
      anioInicial,
      anioFinal,
      "3",
      variables
    );
    const response3With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "3",
      "1",
      variables
    );
    const response3Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "3",
      "0",
      variables
    );

    formatAxisTooltip(response3);
    setDataRCIULecheMaterna3(response3);
    setDataRCIULecheMaterna3With(response3With);
    setDataRCIULecheMaterna3Without(response3Without);
  };

  const getRCIULecheMaternaTime6 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response6 = await RCIULecheMaternaTime(
      anioInicial,
      anioFinal,
      "6",
      variables
    );
    const response6With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "6",
      "1",
      variables
    );
    const response6Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "6",
      "0",
      variables
    );

    formatAxisTooltip(response6);
    setDataRCIULecheMaterna6(response6);
    setDataRCIULecheMaterna6With(response6With);
    setDataRCIULecheMaterna6Without(response6Without);
  };

  const getRCIULecheMaternaTime9 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response9 = await RCIULecheMaternaTime(
      anioInicial,
      anioFinal,
      "9",
      variables
    );
    const response9With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "9",
      "1",
      variables
    );
    const response9Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "9",
      "0",
      variables
    );

    formatAxisTooltip(response9);
    setDataRCIULecheMaterna9(response9);
    setDataRCIULecheMaterna9With(response9With);
    setDataRCIULecheMaterna9Without(response9Without);
  };

  const getRCIULecheMaternaTime12 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response12 = await RCIULecheMaternaTime(
      anioInicial,
      anioFinal,
      "12",
      variables
    );
    const response12With = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "12",
      "1",
      variables
    );
    const response12Without = await RCIUAbsLecheMaternaTime(
      anioInicial,
      anioFinal,
      "12",
      "0",
      variables
    );

    formatAxisTooltip(response12);
    setDataRCIULecheMaterna12(response12);
    setDataRCIULecheMaterna12With(response12With);
    setDataRCIULecheMaterna12Without(response12Without);
  };

  const getparallelCoordsLecheMaterna = async (time) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const responseWith = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "1",
      variables,
      "true"
    );

    const responseWithout = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "0",
      variables,
      "true"
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
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response40 = await RCIUNut4012(
      anioInicial,
      anioFinal,
      "40",
      variables
    );
    setDataRCIUNut40(response40);
    const response12 = await RCIUNut4012(
      anioInicial,
      anioFinal,
      "12",
      variables
    );
    setDataRCIUNut12(response12);
  };

  const getRCIUGriffiths = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await getGriffiths(
      anioInicial,
      anioFinal,
      variables,
      "1"
    );
    const response2 = await getGriffiths(
      anioInicial,
      anioFinal,
      variables,
      "2"
    );
    const response3 = await getGriffiths(
      anioInicial,
      anioFinal,
      variables,
      "3"
    );

    setDataGriffiths1(response1);
    setDataGriffiths2(response2);
    setDataGriffiths3(response3);
  };

  const getRCIUInfanibProm = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUInfanibProm(
      anioInicial,
      anioFinal,
      variables,
      "1"
    );
    const response2 = await RCIUInfanibProm(
      anioInicial,
      anioFinal,
      variables,
      "2"
    );
    const response3 = await RCIUInfanibProm(
      anioInicial,
      anioFinal,
      variables,
      "3"
    );

    setDataInfanib1(response1);
    setDataInfanib2(response2);
    setDataInfanib3(response3);
  };

  const getRCIUInfanibTime3 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "3",
      variables,
      "1"
    );

    const response2 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "3",
      variables,
      "2"
    );

    const response3 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "3",
      variables,
      "3"
    );

    formatAxisTooltip(response1);
    formatAxisTooltip(response2);
    formatAxisTooltip(response3);

    setData3MInfanib1(response1);
    setData3MInfanib2(response2);
    setData3MInfanib3(response3);
  };

  const getRCIUInfanibTime6 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "3",
      variables,
      "1"
    );

    const response2 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "6",
      variables,
      "2"
    );

    const response3 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "6",
      variables,
      "3"
    );

    formatAxisTooltip(response1);
    formatAxisTooltip(response2);
    formatAxisTooltip(response3);

    setData6MInfanib1(response1);
    setData6MInfanib2(response2);
    setData6MInfanib3(response3);
  };

  const getRCIUInfanibTime9 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "9",
      variables,
      "1"
    );

    const response2 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "9",
      variables,
      "2"
    );

    const response3 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "9",
      variables,
      "3"
    );

    formatAxisTooltip(response1);
    formatAxisTooltip(response2);
    formatAxisTooltip(response3);

    setData9MInfanib1(response1);
    setData9MInfanib2(response2);
    setData9MInfanib3(response3);
  };

  const getRCIUInfanibTime12 = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "12",
      variables,
      "1"
    );

    const response2 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "12",
      variables,
      "2"
    );

    const response3 = await RCIUInfanibTime(
      anioInicial,
      anioFinal,
      "12",
      variables,
      "3"
    );

    formatAxisTooltip(response1);
    formatAxisTooltip(response2);
    formatAxisTooltip(response3);

    setData12MInfanib1(response1);
    setData12MInfanib2(response2);
    setData12MInfanib3(response3);
  };

  const getRCIUoftalmologia = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUoftalmologia(
      anioInicial,
      anioFinal,
      variables,
      "1"
    );
    const response2 = await RCIUoftalmologia(
      anioInicial,
      anioFinal,
      variables,
      "2"
    );
    const response3 = await RCIUoftalmologia(
      anioInicial,
      anioFinal,
      variables,
      "3"
    );

    setDataOft1(response1);
    setDataOft2(response2);
    setDataOft3(response3);
  };

  const getRCIUoptometria = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUoptometria(
      anioInicial,
      anioFinal,
      variables,
      "1"
    );
    const response2 = await RCIUoptometria(
      anioInicial,
      anioFinal,
      variables,
      "2"
    );
    const response3 = await RCIUoptometria(
      anioInicial,
      anioFinal,
      variables,
      "3"
    );

    setDataOpt1(response1);
    setDataOpt2(response2);
    setDataOpt3(response3);
  };

  const getRCIUaudiometria = async () => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response1 = await RCIUaudiometria(
      anioInicial,
      anioFinal,
      variables,
      "1"
    );
    const response2 = await RCIUaudiometria(
      anioInicial,
      anioFinal,
      variables,
      "2"
    );
    const response3 = await RCIUaudiometria(
      anioInicial,
      anioFinal,
      variables,
      "3"
    );

    setDataAud1(response1);
    setDataAud2(response2);
    setDataAud3(response3);
  };

  const getparallelCoordsMedidas = async (time) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const responseWith = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "1",
      variables,
      "false"
    );

    const responseWithout = await parallelCoordsLecheMaterna(
      anioInicial,
      anioFinal,
      time,
      "0",
      variables,
      "false"
    );

    if (time === "40") {
      setDataParallelCoordsMedidas40With(responseWith);
    } else if (time === "3") {
      setDataParallelCoordsMedidas3With(responseWith);
    } else if (time === "6") {
      setDataParallelCoordsMedidas6With(responseWith);
    } else if (time === "9") {
      setDataParallelCoordsMedidas9With(responseWith);
    } else if (time === "12") {
      setDataParallelCoordsMedidas12With(responseWith);
    }
    ReactDOM.render(<p></p>, document.getElementById(`par${time}WithM`));
    const div = (
      <ParallelCoord data={responseWith} title={"Con RCIU"} width={680} />
    );
    ReactDOM.render(div, document.getElementById(`par${time}WithM`));

    if (time === "40") {
      setDataParallelCoordsMedidas40Without(responseWithout);
    } else if (time === "3") {
      setDataParallelCoordsMedidas3Without(responseWithout);
    } else if (time === "6") {
      setDataParallelCoordsMedidas6Without(responseWithout);
    } else if (time === "9") {
      setDataParallelCoordsMedidas9Without(responseWithout);
    } else if (time === "12") {
      setDataParallelCoordsMedidas12Without(responseWithout);
    }
    ReactDOM.render(<p></p>, document.getElementById(`par${time}WithoutM`));
    const div2 = (
      <ParallelCoord data={responseWithout} title={"Sin RCIU"} width={680} />
    );
    ReactDOM.render(div2, document.getElementById(`par${time}WithoutM`));
  };

  const getRCIUPromMedidasGrowthPeso = async (variable) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUPromMedidasGrowth(
      anioInicial,
      anioFinal,
      variables,
      variable
    );

    if (variable === "peso.sem40") {
      setDataPromPeso40(response);
    } else if (variable === "peso.mes3") {
      setDataPromPeso3(response);
    } else if (variable === "peso.mes6") {
      setDataPromPeso6(response);
    } else if (variable === "peso.mes9") {
      setDataPromPeso9(response);
    } else if (variable === "peso.mes12") {
      setDataPromPeso12(response);
    }
  };

  const getRCIUPromMedidasGrowthTalla = async (variable) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUPromMedidasGrowth(
      anioInicial,
      anioFinal,
      variables,
      variable
    );

    if (variable === "talla.sem40") {
      setDataPromTalla40(response);
    } else if (variable === "talla.mes3") {
      setDataPromTalla3(response);
    } else if (variable === "talla.mes6") {
      setDataPromTalla6(response);
    } else if (variable === "talla.mes9") {
      setDataPromTalla9(response);
    } else if (variable === "talla.mes12") {
      setDataPromTalla12(response);
    }
  };

  const getRCIUPromMedidasGrowthPc = async (variable) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUPromMedidasGrowth(
      anioInicial,
      anioFinal,
      variables,
      variable
    );

    if (variable === "pc.sem40") {
      setDataPromPc40(response);
    } else if (variable === "pc.mes3") {
      setDataPromPc3(response);
    } else if (variable === "pc.mes6") {
      setDataPromPc6(response);
    } else if (variable === "pc.mes9") {
      setDataPromPc9(response);
    } else if (variable === "pc.mes12") {
      setDataPromPc12(response);
    }
  };

  const getRCIUMedidaAnio = async (variable) => {
    var variables = [];

    if (filterVars.length > 0) {
      variables = filterVars;
    }

    const response = await RCIUMedidaAnio(
      anioInicial,
      anioFinal,
      variables,
      variable
    );

    if (variable === "peso") {
      formatAxisTooltip2(response, " (gr)");
      setDataPesoAnio(response);
    } else if (variable === "talla") {
      formatAxisTooltip2(response, " (cm)");
      setDataTallaAnio(response);
    } else if (variable === "pc") {
      formatAxisTooltip2(response, " (cm)");
      setDataPcAnio(response);
    }
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

  const formatAxisTooltip2 = (response, medida) => {
    response.axisX.labelFormatter = function (e) {
      for (let i = 0; i < 5; i++) {
        if (e.value === 0) {
          return "semana 40";
        } else if (e.value === 1) {
          return "mes 3";
        } else if (e.value === 2) {
          return "mes 6";
        } else if (e.value === 3) {
          return "mes 9";
        } else if (e.value === 4) {
          return "mes 12";
        }
      }
      return "";
    };
    response.toolTip.contentFormatter = function (e) {
      for (let i = 0; i < 5; i++) {
        if (e.entries[0].dataPoint.x === 0) {
          return "semana 40: " + e.entries[0].dataPoint.y + medida;
        } else if (e.entries[0].dataPoint.x === 1) {
          return "mes 3: " + e.entries[0].dataPoint.y + medida;
        } else if (e.entries[0].dataPoint.x === 2) {
          return "mes 6: " + e.entries[0].dataPoint.y + medida;
        } else if (e.entries[0].dataPoint.x === 3) {
          return "mes 9: " + e.entries[0].dataPoint.y + medida;
        } else if (e.entries[0].dataPoint.x === 4) {
          return "mes 12: " + e.entries[0].dataPoint.y + medida;
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
    setVariables([]);
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

      if (varsSelected[i].value === "CD") {
        setDataGriffiths1({});
        setDataGriffiths2({});
        setDataGriffiths3({});
      }

      if (
        varsSelected[i].value === "Infanib3m" ||
        varsSelected[i].value === "Infanib6m" ||
        varsSelected[i].value === "Infanib9m" ||
        varsSelected[i].value === "Infanib12m"
      ) {
        setDataInfanib1({});
        setDataInfanib2({});
        setDataInfanib3({});
      }

      if (varsSelected[i].value === "Infanib3m") {
        setData3MInfanib1({});
        setData3MInfanib2({});
        setData3MInfanib3({});
      }

      if (varsSelected[i].value === "Infanib6m") {
        setData6MInfanib1({});
        setData6MInfanib2({});
        setData6MInfanib3({});
      }

      if (varsSelected[i].value === "Infanib9m") {
        setData9MInfanib1({});
        setData9MInfanib2({});
        setData9MInfanib3({});
      }

      if (varsSelected[i].value === "Infanib12m") {
        setData12MInfanib1({});
        setData12MInfanib2({});
        setData12MInfanib3({});
      }

      if (varsSelected[i].value === "oftalmologiafinal") {
        setDataOft1({});
        setDataOft2({});
        setDataOft3({});
      }

      if (varsSelected[i].value === "resoptometria") {
        setDataOpt1({});
        setDataOpt2({});
        setDataOpt3({});
      }

      if (varsSelected[i].value === "audiometria") {
        setDataAud1({});
        setDataAud2({});
        setDataAud3({});
      }

      if (varsSelected[i].value === "medidas40") {
        setDataParallelCoordsMedidas40With([]);
        ReactDOM.render(<p></p>, document.getElementById("par40WithM"));
        setDataParallelCoordsMedidas40Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par40WithoutM"));
      }

      if (varsSelected[i].value === "medidas3") {
        setDataParallelCoordsMedidas3With([]);
        ReactDOM.render(<p></p>, document.getElementById("par3WithM"));
        setDataParallelCoordsMedidas3Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par3WithoutM"));
      }

      if (varsSelected[i].value === "medidas6") {
        setDataParallelCoordsMedidas6With([]);
        ReactDOM.render(<p></p>, document.getElementById("par6WithM"));
        setDataParallelCoordsMedidas6Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par6WithoutM"));
      }

      if (varsSelected[i].value === "medidas9") {
        setDataParallelCoordsMedidas9With([]);
        ReactDOM.render(<p></p>, document.getElementById("par9WithM"));
        setDataParallelCoordsMedidas9Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par9WithoutM"));
      }

      if (varsSelected[i].value === "medidas12") {
        setDataParallelCoordsMedidas12With([]);
        ReactDOM.render(<p></p>, document.getElementById("par12WithM"));
        setDataParallelCoordsMedidas12Without([]);
        ReactDOM.render(<p></p>, document.getElementById("par12WithoutM"));
      }

      if (varsSelected[i].value === "peso.sem40") {
        setDataPromPeso40({});
      }

      if (varsSelected[i].value === "peso.mes3") {
        setDataPromPeso3({});
      }

      if (varsSelected[i].value === "peso.mes6") {
        setDataPromPeso6({});
      }

      if (varsSelected[i].value === "peso.mes9") {
        setDataPromPeso9({});
      }

      if (varsSelected[i].value === "peso.mes12") {
        setDataPromPeso12({});
      }

      if (varsSelected[i].value === "talla.sem40") {
        setDataPromTalla40({});
      }

      if (varsSelected[i].value === "talla.mes3") {
        setDataPromTalla3({});
      }

      if (varsSelected[i].value === "talla.mes6") {
        setDataPromTalla6({});
      }

      if (varsSelected[i].value === "talla.mes9") {
        setDataPromTalla9({});
      }

      if (varsSelected[i].value === "talla.mes12") {
        setDataPromTalla12({});
      }

      if (varsSelected[i].value === "pc.sem40") {
        setDataPromPc40({});
      }

      if (varsSelected[i].value === "pc.mes3") {
        setDataPromPc3({});
      }

      if (varsSelected[i].value === "pc.mes6") {
        setDataPromPc6({});
      }

      if (varsSelected[i].value === "pc.mes9") {
        setDataPromPc9({});
      }

      if (varsSelected[i].value === "pc.mes12") {
        setDataPromPc12({});
      }

      if (varsSelected[i].value === "pesoAnio") {
        setDataPesoAnio({});
      }

      if (varsSelected[i].value === "tallaAnio") {
        setDataTallaAnio({});
      }

      if (varsSelected[i].value === "pcAnio") {
        setDataPcAnio({});
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

      if (varsSelected[i].value === "CD") {
        getRCIUGriffiths();
      }

      if (
        varsSelected[i].value === "Infanib3m" ||
        varsSelected[i].value === "Infanib6m" ||
        varsSelected[i].value === "Infanib9m" ||
        varsSelected[i].value === "Infanib12m"
      ) {
        getRCIUInfanibProm();
      }

      if (varsSelected[i].value === "Infanib3m") {
        getRCIUInfanibTime3();
      }

      if (varsSelected[i].value === "Infanib6m") {
        getRCIUInfanibTime6();
      }

      if (varsSelected[i].value === "Infanib9m") {
        getRCIUInfanibTime9();
      }

      if (varsSelected[i].value === "Infanib12m") {
        getRCIUInfanibTime12();
      }

      if (varsSelected[i].value === "oftalmologiafinal") {
        getRCIUoftalmologia();
      }

      if (varsSelected[i].value === "resoptometria") {
        getRCIUoptometria();
      }

      if (varsSelected[i].value === "audiometria") {
        getRCIUaudiometria();
      }

      if (varsSelected[i].value === "medidas40") {
        getparallelCoordsMedidas("40");
      }

      if (varsSelected[i].value === "medidas3") {
        getparallelCoordsMedidas("3");
      }

      if (varsSelected[i].value === "medidas6") {
        getparallelCoordsMedidas("6");
      }

      if (varsSelected[i].value === "medidas9") {
        getparallelCoordsMedidas("9");
      }

      if (varsSelected[i].value === "medidas12") {
        getparallelCoordsMedidas("12");
      }

      if (varsSelected[i].value === "peso.sem40") {
        getRCIUPromMedidasGrowthPeso("peso.sem40");
      }

      if (varsSelected[i].value === "peso.mes3") {
        getRCIUPromMedidasGrowthPeso("peso.mes3");
      }

      if (varsSelected[i].value === "peso.mes6") {
        getRCIUPromMedidasGrowthPeso("peso.mes6");
      }

      if (varsSelected[i].value === "peso.mes9") {
        getRCIUPromMedidasGrowthPeso("peso.mes9");
      }

      if (varsSelected[i].value === "peso.mes12") {
        getRCIUPromMedidasGrowthPeso("peso.mes12");
      }

      if (varsSelected[i].value === "talla.sem40") {
        getRCIUPromMedidasGrowthTalla("talla.sem40");
      }

      if (varsSelected[i].value === "talla.mes3") {
        getRCIUPromMedidasGrowthTalla("talla.mes3");
      }

      if (varsSelected[i].value === "talla.mes6") {
        getRCIUPromMedidasGrowthTalla("talla.mes6");
      }

      if (varsSelected[i].value === "talla.mes9") {
        getRCIUPromMedidasGrowthTalla("talla.mes9");
      }

      if (varsSelected[i].value === "talla.mes12") {
        getRCIUPromMedidasGrowthTalla("talla.mes12");
      }

      if (varsSelected[i].value === "pc.sem40") {
        getRCIUPromMedidasGrowthPc("pc.sem40");
      }

      if (varsSelected[i].value === "pc.mes3") {
        getRCIUPromMedidasGrowthPc("pc.mes3");
      }

      if (varsSelected[i].value === "pc.mes6") {
        getRCIUPromMedidasGrowthPc("pc.mes6");
      }

      if (varsSelected[i].value === "pc.mes9") {
        getRCIUPromMedidasGrowthPc("pc.mes9");
      }

      if (varsSelected[i].value === "pc.mes12") {
        getRCIUPromMedidasGrowthPc("pc.mes12");
      }

      if (varsSelected[i].value === "pesoAnio") {
        getRCIUMedidaAnio("peso");
      }

      if (varsSelected[i].value === "tallaAnio") {
        getRCIUMedidaAnio("talla");
      }

      if (varsSelected[i].value === "pcAnio") {
        getRCIUMedidaAnio("pc");
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

      if (varsSelected[i].value === "CD") {
        getRCIUGriffiths();
      }

      if (
        varsSelected[i].value === "Infanib3m" ||
        varsSelected[i].value === "Infanib6m" ||
        varsSelected[i].value === "Infanib9m" ||
        varsSelected[i].value === "Infanib12m"
      ) {
        getRCIUInfanibProm();
      }

      if (varsSelected[i].value === "Infanib3m") {
        getRCIUInfanibTime3();
      }

      if (varsSelected[i].value === "Infanib6m") {
        getRCIUInfanibTime6();
      }

      if (varsSelected[i].value === "Infanib9m") {
        getRCIUInfanibTime9();
      }

      if (varsSelected[i].value === "Infanib12m") {
        getRCIUInfanibTime12();
      }

      if (varsSelected[i].value === "oftalmologiafinal") {
        getRCIUoftalmologia();
      }

      if (varsSelected[i].value === "resoptometria") {
        getRCIUoptometria();
      }

      if (varsSelected[i].value === "audiometria") {
        getRCIUaudiometria();
      }

      if (varsSelected[i].value === "medidas40") {
        getparallelCoordsMedidas("40");
      }

      if (varsSelected[i].value === "medidas3") {
        getparallelCoordsMedidas("3");
      }

      if (varsSelected[i].value === "medidas6") {
        getparallelCoordsMedidas("6");
      }

      if (varsSelected[i].value === "medidas9") {
        getparallelCoordsMedidas("9");
      }

      if (varsSelected[i].value === "medidas12") {
        getparallelCoordsMedidas("12");
      }

      if (varsSelected[i].value === "peso.sem40") {
        getRCIUPromMedidasGrowthPeso("peso.sem40");
      }

      if (varsSelected[i].value === "peso.mes3") {
        getRCIUPromMedidasGrowthPeso("peso.mes3");
      }

      if (varsSelected[i].value === "peso.mes6") {
        getRCIUPromMedidasGrowthPeso("peso.mes6");
      }

      if (varsSelected[i].value === "peso.mes9") {
        getRCIUPromMedidasGrowthPeso("peso.mes9");
      }

      if (varsSelected[i].value === "peso.mes12") {
        getRCIUPromMedidasGrowthPeso("peso.mes12");
      }

      if (varsSelected[i].value === "talla.sem40") {
        getRCIUPromMedidasGrowthTalla("talla.sem40");
      }

      if (varsSelected[i].value === "talla.mes3") {
        getRCIUPromMedidasGrowthTalla("talla.mes3");
      }

      if (varsSelected[i].value === "talla.mes6") {
        getRCIUPromMedidasGrowthTalla("talla.mes6");
      }

      if (varsSelected[i].value === "talla.mes9") {
        getRCIUPromMedidasGrowthTalla("talla.mes9");
      }

      if (varsSelected[i].value === "talla.mes12") {
        getRCIUPromMedidasGrowthTalla("talla.mes12");
      }

      if (varsSelected[i].value === "pc.sem40") {
        getRCIUPromMedidasGrowthPc("pc.sem40");
      }

      if (varsSelected[i].value === "pc.mes3") {
        getRCIUPromMedidasGrowthPc("pc.mes3");
      }

      if (varsSelected[i].value === "pc.mes6") {
        getRCIUPromMedidasGrowthPc("pc.mes6");
      }

      if (varsSelected[i].value === "pc.mes9") {
        getRCIUPromMedidasGrowthPc("pc.mes9");
      }

      if (varsSelected[i].value === "pc.mes12") {
        getRCIUPromMedidasGrowthPc("pc.mes12");
      }

      if (varsSelected[i].value === "pesoAnio") {
        getRCIUMedidaAnio("peso");
      }

      if (varsSelected[i].value === "tallaAnio") {
        getRCIUMedidaAnio("talla");
      }

      if (varsSelected[i].value === "pcAnio") {
        getRCIUMedidaAnio("pc");
      }
    }
  };

  useEffect(() => {
    getEtapas();
  }, []);

  return (
    <div className="analysisGrowth">
      <div className="container">
        <GenderBase
          inicio={anioInicial}
          fin={anioFinal}
          vars={filterVars.length > 0 ? filterVars : []}
        />
        <div className="row pt-4">
          <div className="col-11">
            <h1 className="text-start">
              <b>Análisis Crecimiento - RCIU</b>
            </h1>
          </div>
          <div className="col-1 text-end">
            <Filters filters={filterVars} />
          </div>
        </div>
        <div className="row pt-2">
          <p className="text-start text-justify">
            En esta sección se podrán analizar variables relacionadas con el{" "}
            <b>desarrollo del bebé en su primer año de vida</b>. En esta
            análisis se podrán seleciconar diferentes subetapas:{" "}
            <i>
              variables generales, primeros días de vida, entrada al Programa
              Madre Canguro (PMC), 40 semanas, 3 meses, 6 meses, 9 meses y 12
              meses
            </i>
            . Al igual que en anteriores etapas, se consideran muestras de datos{" "}
            <b>con y sin RCIU y permaturos o a término</b>. En adición, algunas
            gráficas y variables consideran{" "}
            <b>
              muestras de bebés con y sin Retardo del Crecimiento Extrauterino
              (RCEU)
            </b>
            , pues esta condición es de interés para el primer año de vida de
            los bebés. En algunas de estas visualizaciones se podrá interactuar
            con zoom y movimiento y para todos los datos y gráficas se puede
            filtrar el intervalo de tiempo deseado entre 1993 y 2020.
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
              <div className="col-12 group">
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
              <div className="col-4 group">
                <h6>
                  <b>sin RCIU y con RCEU</b>
                </h6>
                <GroupedBar
                  data={dataRCIUPromPeso1}
                  options={options}
                  height={100}
                />
              </div>
              <div className="col-4 group">
                <h6>
                  <b>sin RCIU y sin RCEU</b>
                </h6>
                <GroupedBar
                  data={dataRCIUPromPeso2}
                  options={options}
                  height={100}
                />
              </div>
              <div className="col-4 group">
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
            <div className="row pt-5">
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
              <div className="col-12 group">
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
        {(Object.entries(dataRCIUNut40).length !== 0 &&
          Object.entries(dataRCIUNut12).length !== 0) ||
        Object.entries(dataPromPeso40).length !== 0 ||
        Object.entries(dataPromTalla40).length !== 0 ||
        Object.entries(dataPromPc40).length !== 0 ||
        Object.entries(dataPromPeso3).length !== 0 ||
        Object.entries(dataPromTalla3).length !== 0 ||
        Object.entries(dataPromPc3).length !== 0 ||
        Object.entries(dataPromPeso6).length !== 0 ||
        Object.entries(dataPromTalla6).length !== 0 ||
        Object.entries(dataPromPc6).length !== 0 ||
        Object.entries(dataPromPeso9).length !== 0 ||
        Object.entries(dataPromTalla9).length !== 0 ||
        Object.entries(dataPromPc9).length !== 0 ||
        Object.entries(dataPromPeso12).length !== 0 ||
        Object.entries(dataPromTalla12).length !== 0 ||
        Object.entries(dataPromPc12).length !== 0 ? (
          <div className="row pt-4">
            <h3>
              <b>Medidas antropométricas seguimiento con y sin RCIU</b>
            </h3>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromTalla40).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Talla (cm) a las 40 semanas</b>
              </h6>
              <GroupedBar
                data={dataPromTalla40}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPc40).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Perímetro craneal (cm) a las 40 semanas</b>
              </h6>
              <GroupedBar data={dataPromPc40} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsMedidas40With.length > 0 &&
        dataParallelCoordsMedidas40Without.length > 0 ? (
          <div className="row pt-3">
            <h6>
              <b>Medidas antropométricas a las 40 semanas</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par40WithM"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par40WithoutM"></div>
          </div>
        </div>
        {Object.entries(dataPromPeso3).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Peso (gr) a los 3 meses</b>
              </h6>
              <GroupedBar data={dataPromPeso3} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromTalla3).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Talla (cm) a los 3 meses</b>
              </h6>
              <GroupedBar
                data={dataPromTalla3}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPc3).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Perímetro craneal (cm) a los 3 meses</b>
              </h6>
              <GroupedBar data={dataPromPc3} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsMedidas3With.length > 0 &&
        dataParallelCoordsMedidas3Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>Medidas antropométricas a los 3 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par3WithM"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par3WithoutM"></div>
          </div>
        </div>
        {Object.entries(dataPromPeso6).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Peso (gr) a los 6 meses</b>
              </h6>
              <GroupedBar data={dataPromPeso6} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromTalla6).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Talla (cm) a los 6 meses</b>
              </h6>
              <GroupedBar
                data={dataPromTalla6}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPc6).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Perímetro craneal (cm) a los 6 meses</b>
              </h6>
              <GroupedBar data={dataPromPc6} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsMedidas6With.length > 0 &&
        dataParallelCoordsMedidas6Without.length > 0 ? (
          <div className="row pt-3">
            <h6>
              <b>Medidas antropométricas a los 6 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par6WithM"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par6WithoutM"></div>
          </div>
        </div>
        {Object.entries(dataPromPeso9).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Peso (gr) a los 9 meses</b>
              </h6>
              <GroupedBar data={dataPromPeso9} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromTalla9).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Talla (cm) a los 9 meses</b>
              </h6>
              <GroupedBar
                data={dataPromTalla9}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPc9).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Perímetro craneal (cm) a los 9 meses</b>
              </h6>
              <GroupedBar data={dataPromPc9} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsMedidas9With.length > 0 &&
        dataParallelCoordsMedidas9Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>Medidas antropométricas 9 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par9WithM"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par9WithoutM"></div>
          </div>
        </div>
        {Object.entries(dataPromPeso12).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Peso (gr) a los 12 meses</b>
              </h6>
              <GroupedBar
                data={dataPromPeso12}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromTalla12).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Talla (cm) a los 12 meses</b>
              </h6>
              <GroupedBar
                data={dataPromTalla12}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPc12).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Perímetro craneal (cm) a los 12 meses</b>
              </h6>
              <GroupedBar data={dataPromPc12} options={options} height={200} />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {dataParallelCoordsMedidas12With.length > 0 &&
        dataParallelCoordsMedidas12Without.length > 0 ? (
          <div className="row">
            <h6>
              <b>Medidas antropométricas a los 12 meses</b>
            </h6>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        <div className="row">
          <div className="col-6">
            <div className="col-12" id="par12WithM"></div>
          </div>
          <div className="col-6">
            <div className="col-12" id="par12WithoutM"></div>
          </div>
        </div>
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
              <div className="col-6 group">
                <GroupedBar
                  data={dataRCIUNut40}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-6 group">
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

        {Object.entries(dataGriffiths1).length !== 0 &&
        Object.entries(dataGriffiths2).length !== 0 &&
        Object.entries(dataGriffiths3).length !== 0 ? (
          <div className="griffiths">
            <div className="row pt-4">
              <h5>
                <b>Exámenes Griffiths 6 y 12 meses (coeficiente intelectual)</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 group">
                <h6>sin RCIU y con RCEU</h6>
                <GroupedBar
                  data={dataGriffiths1}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-4 group">
                <h6>sin RCIU y sin RCEU</h6>
                <GroupedBar
                  data={dataGriffiths2}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-4 group">
                <h6>con RCIU</h6>
                <GroupedBar
                  data={dataGriffiths3}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataInfanib1).length !== 0 &&
        Object.entries(dataInfanib2).length !== 0 &&
        Object.entries(dataInfanib3).length !== 0 ? (
          <div className="infanib">
            <div className="row pt-4">
              <h5>
                <b>
                  Distribución exámenes Infanib primer año de vida (valores en
                  %)
                </b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 group">
                <h6>sin RCIU y con RCEU</h6>
                <GroupedBar
                  data={dataInfanib1}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-4 group">
                <h6>sin RCIU y sin RCEU</h6>
                <GroupedBar
                  data={dataInfanib2}
                  options={options}
                  height={200}
                />
              </div>
              <div className="col-4 group">
                <h6>con RCIU</h6>
                <GroupedBar
                  data={dataInfanib3}
                  options={options}
                  height={200}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(data3MInfanib1).length !== 0 &&
        Object.entries(data3MInfanib2).length !== 0 &&
        Object.entries(data3MInfanib3).length !== 0 ? (
          <div className="infanib">
            <div className="row pt-4">
              <h5>
                <b>Resultados exámen Infanib a los 3 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs">
                <h6>sin RCIU y con RCEU</h6>
                <CanvasJSChart options={data3MInfanib1} />
              </div>
              <div className="col-4 datAbs">
                <h6>sin RCIU y sin RCEU</h6>
                <CanvasJSChart options={data3MInfanib2} />
              </div>
              <div className="col-4 datAbs">
                <h6>con RCIU</h6>
                <CanvasJSChart options={data3MInfanib3} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(data6MInfanib1).length !== 0 &&
        Object.entries(data6MInfanib2).length !== 0 &&
        Object.entries(data6MInfanib3).length !== 0 ? (
          <div className="infanib">
            <div className="row pt-4">
              <h5>
                <b>Resultados exámen Infanib a los 6 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs">
                <h6>sin RCIU y con RCEU</h6>
                <CanvasJSChart options={data6MInfanib1} />
              </div>
              <div className="col-4 datAbs">
                <h6>sin RCIU y sin RCEU</h6>
                <CanvasJSChart options={data6MInfanib2} />
              </div>
              <div className="col-4 datAbs">
                <h6>con RCIU</h6>
                <CanvasJSChart options={data6MInfanib3} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(data9MInfanib1).length !== 0 &&
        Object.entries(data9MInfanib2).length !== 0 &&
        Object.entries(data9MInfanib3).length !== 0 ? (
          <div className="infanib">
            <div className="row pt-4">
              <h5>
                <b>Resultados exámen Infanib a los 9 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs">
                <h6>sin RCIU y con RCEU</h6>
                <CanvasJSChart options={data9MInfanib1} />
              </div>
              <div className="col-4 datAbs">
                <h6>sin RCIU y sin RCEU</h6>
                <CanvasJSChart options={data9MInfanib2} />
              </div>
              <div className="col-4 datAbs">
                <h6>con RCIU</h6>
                <CanvasJSChart options={data9MInfanib3} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(data12MInfanib1).length !== 0 &&
        Object.entries(data12MInfanib2).length !== 0 &&
        Object.entries(data12MInfanib3).length !== 0 ? (
          <div className="infanib">
            <div className="row pt-4">
              <h5>
                <b>Resultados exámen Infanib a los 12 meses</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs">
                <h6>sin RCIU y con RCEU</h6>
                <CanvasJSChart options={data12MInfanib1} />
              </div>
              <div className="col-4 datAbs">
                <h6>sin RCIU y sin RCEU</h6>
                <CanvasJSChart options={data12MInfanib2} />
              </div>
              <div className="col-4 datAbs">
                <h6>con RCIU</h6>
                <CanvasJSChart options={data12MInfanib3} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataOft1).length !== 0 &&
        Object.entries(dataOft2).length !== 0 &&
        Object.entries(dataOft3).length !== 0 ? (
          <div className="oft">
            <div className="row pt-5">
              <h5>
                <b>Resultado Oftalmología final</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs group">
                <h6>sin RCIU y con RCEU</h6>
                <GroupedBar
                  data={dataOft1}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>sin RCIU y sin RCEU</h6>
                <GroupedBar
                  data={dataOft2}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>con RCIU</h6>
                <GroupedBar data={dataOft3} options={options} height={200} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataOpt1).length !== 0 &&
        Object.entries(dataOpt2).length !== 0 &&
        Object.entries(dataOpt3).length !== 0 ? (
          <div className="opt">
            <div className="row pt-5">
              <h5>
                <b>Resultado Optometría</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs group">
                <h6>sin RCIU y con RCEU</h6>
                <GroupedBar
                  data={dataOpt1}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>sin RCIU y sin RCEU</h6>
                <GroupedBar
                  data={dataOpt2}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>con RCIU</h6>
                <GroupedBar data={dataOpt3} options={options} height={200} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataAud1).length !== 0 &&
        Object.entries(dataAud2).length !== 0 &&
        Object.entries(dataAud3).length !== 0 ? (
          <div className="aud">
            <div className="row pt-5">
              <h5>
                <b>Resultado Audiometría</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-4 datAbs group">
                <h6>sin RCIU y con RCEU</h6>
                <GroupedBar
                  data={dataAud1}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>sin RCIU y sin RCEU</h6>
                <GroupedBar
                  data={dataAud2}
                  options={options}
                  height={200}
                />{" "}
              </div>
              <div className="col-4 datAbs group">
                <h6>con RCIU</h6>
                <GroupedBar data={dataAud3} options={options} height={200} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPromPeso40).length !== 0 ? (
          <div className="row pt-3">
            <div className="col-12">
              {" "}
              <h6>
                <b>Peso (gr) a las 40 semanas</b>
              </h6>
              <GroupedBar
                data={dataPromPeso40}
                options={options}
                height={200}
              />
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPesoAnio).length !== 0 ? (
          <div className="pesoAnio">
            <div className="row">
              <h5>
                <b>Promedio peso primer año de vida</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs2">
                <CanvasJSChart options={dataPesoAnio} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataTallaAnio).length !== 0 ? (
          <div className="pesoAnio">
            <div className="row">
              <h5>
                <b>Promedio talla primer año de vida</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs2">
                <CanvasJSChart options={dataTallaAnio} />
              </div>
            </div>
          </div>
        ) : (
          <p className="m-0"></p>
        )}
        {Object.entries(dataPcAnio).length !== 0 ? (
          <div className="pesoAnio">
            <div className="row">
              <h5>
                <b>Promedio perimetro craneal primer año de vida</b>
              </h5>
            </div>
            <div className="row">
              <div className="col-12 datAbs2">
                <CanvasJSChart options={dataPcAnio} />
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
