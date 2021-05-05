import React, { useState, useEffect } from "react";
import {
  RCIUAbsFrequencyYears,
  RCIURelativeFrequencyYears,
  RCIUFreqAC,
  RCIUFreqMA,
  RCIUFreqMM,
  RCIUAFPromMedidaMadre,
  RCIUAFMedidaMadre,
  getYears,
} from "../actions/medidasAction";
import CanvasJSReact from "../assets/canvasjs.react";
import Select from "react-select";
import MedidasGraphs from "./MedidasGrahps";
import RelativeFreqGraph from "./RelativeFreqGraph";

const AnalysisGrowth = () => {
  const [dataAbsFreq, setDataAbsFreq] = useState({});
  const [dataRelFreq, setDataRelFreq] = useState({});
  const [dataRelToxemia, setDataRelToxemia] = useState({});
  const [dataRelEmbarazo, setDataRelEmbarazo] = useState({});
  const [dataRelPrimipara, setDataRelPrimipara] = useState({});
  const [dataRelMA, setDataRelMA] = useState({});
  const [dataRelMM, setDataRelMM] = useState({});

  // Medidas Madre
  const [dataPromPesoMadre, setDataPromPesoMadre] = useState({});
  const [promediosPeso, setpromediosPeso] = useState([]);
  const [dataPesoMadreSin, setdataPesoMadreSin] = useState({});
  const [dataPesoMadreCon, setdataPesoMadreCon] = useState({});
  const [dataPromTallaMadre, setDataPromTallaMadre] = useState({});
  const [promediosTalla, setpromediosTalla] = useState([]);
  const [dataTallaMadreSin, setdataTallaMadreSin] = useState({});
  const [dataTallaMadreCon, setdataTallaMadreCon] = useState({});

  // Medidas Padre
  const [dataPromPesoPadre, setDataPromPesoPadre] = useState({});
  const [promediosPesoP, setpromediosPesoP] = useState([]);
  const [dataPesoPadreSin, setdataPesoPadreSin] = useState({});
  const [dataPesoPadreCon, setdataPesoPadreCon] = useState({});
  const [dataPromTallaPadre, setDataPromTallaPadre] = useState({});
  const [promediosTallaP, setpromediosTallaP] = useState([]);
  const [dataTallaPadreSin, setdataTallaPadreSin] = useState({});
  const [dataTallaPadreCon, setdataTallaPadreCon] = useState({});
  const [anios, setAnios] = useState([]);
  const [aniosFinales, setAniosFinales] = useState([]);
  const [anioInicial, setAnioInicial] = useState(0);
  const [anioFinal, setAnioFinal] = useState(0);

  var CanvasJS = CanvasJSReact.CanvasJS;
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  CanvasJS.addColorSet("customColorSet", [
    "#001747",
    "#11487D",
    "#0E7FA6",
    "#38C7BD",
    "#70D6BC",
  ]);

  CanvasJS.addColorSet("customColorSet2", ["#0E7FA6", "#FF955B"]);
  CanvasJS.addColorSet("customColorSet3", ["#008C70", "#FF5517"]);

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

  const getRCIUAbsFreqYears = async () => {
    const response = await RCIUAbsFrequencyYears();
    setDataAbsFreq(response);
  };

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

  const getRCIURelToxemia = async () => {
    const response = await RCIUFreqAC(
      anioInicial.value,
      anioFinal.value,
      "toxemia"
    );
    response.toolTip.contentFormatter = function (e) {
      return "Toxemia: " + (e.entries[0].dataPoint.y * 100).toFixed(2) + "%";
    };
    setDataRelToxemia(response);
  };

  const getRCIURelEmbarazoM = async () => {
    const response = await RCIUFreqAC(
      anioInicial.value,
      anioFinal.value,
      "Embarazomultiple"
    );
    response.toolTip.contentFormatter = function (e) {
      return (
        "Embarazo múltiple: " +
        (e.entries[0].dataPoint.y * 100).toFixed(2) +
        "%"
      );
    };
    setDataRelEmbarazo(response);
  };

  const getRCIURelPrimipara = async () => {
    const response = await RCIUFreqAC(
      anioInicial.value,
      anioFinal.value,
      "primipara"
    );
    response.toolTip.contentFormatter = function (e) {
      return (
        "Madre primeriza: " + (e.entries[0].dataPoint.y * 100).toFixed(2) + "%"
      );
    };
    setDataRelPrimipara(response);
  };

  const getRCIURelMA = async () => {
    const response = await RCIUFreqMA(anioInicial.value, anioFinal.value);
    response.toolTip.contentFormatter = function (e) {
      return (e.entries[0].dataPoint.y * 100).toFixed(2) + "%";
    };
    setDataRelMA(response);
  };

  const getRCIURelMM = async () => {
    const response = await RCIUFreqMM(anioInicial.value, anioFinal.value);
    response.toolTip.contentFormatter = function (e) {
      return (e.entries[0].dataPoint.y * 100).toFixed(2) + "%";
    };
    setDataRelMM(response);
  };

  const getRCIUPromMadre = async () => {
    const responsePeso = await RCIUAFPromMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesomama"
    );

    const responseTalla = await RCIUAFPromMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallamama"
    );
    setpromediosPeso([
      responsePeso.promedioConRCIU,
      responsePeso.promedioSinRCIU,
    ]);
    setDataPromPesoMadre(responsePeso);

    setpromediosTalla([
      responseTalla.promedioConRCIU,
      responseTalla.promedioSinRCIU,
    ]);
    setDataPromTallaMadre(responseTalla);
  };

  const getRCIUMedidasMadre = async () => {
    const responsePesoSin = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesomama",
      0
    );
    const responsePesoCon = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesomama",
      1
    );

    const responseTallaSin = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallamama",
      0
    );
    const responseTallaCon = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallamama",
      1
    );
    setdataPesoMadreSin(responsePesoSin);
    setdataPesoMadreCon(responsePesoCon);
    setdataTallaMadreSin(responseTallaSin);
    setdataTallaMadreCon(responseTallaCon);
  };

  const getRCIUPromPadre = async () => {
    const responsePeso = await RCIUAFPromMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesopapa"
    );

    const responseTalla = await RCIUAFPromMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallapapa"
    );
    setpromediosPesoP([
      responsePeso.promedioConRCIU,
      responsePeso.promedioSinRCIU,
    ]);
    setDataPromPesoPadre(responsePeso);

    setpromediosTallaP([
      responseTalla.promedioConRCIU,
      responseTalla.promedioSinRCIU,
    ]);
    setDataPromTallaPadre(responseTalla);
  };

  const getRCIUMedidasPadre = async () => {
    const responsePesoSin = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesopapa",
      0
    );
    const responsePesoCon = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "pesopapa",
      1
    );

    const responseTallaSin = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallapapa",
      0
    );
    const responseTallaCon = await RCIUAFMedidaMadre(
      anioInicial.value,
      anioFinal.value,
      "tallapapa",
      1
    );
    setdataPesoPadreSin(responsePesoSin);
    setdataPesoPadreCon(responsePesoCon);
    setdataTallaPadreSin(responseTallaSin);
    setdataTallaPadreCon(responseTallaCon);
  };

  // Fetch de los años
  const getAnios = async () => {
    const data = await getYears();
    setAnios(data);
  };

  useEffect(() => {
    getRCIUAbsFreqYears();
    getRCIURelFreqYears();
    getAnios();
  }, []);

  const graphData = () => {
    getRCIURelToxemia();
    getRCIURelEmbarazoM();
    getRCIURelPrimipara();
    getRCIURelMA();
    getRCIURelMM();
    getRCIUPromMadre();
    getRCIUMedidasMadre();
    getRCIUPromPadre();
    getRCIUMedidasPadre();
  };

  const onChangeAniosInicial = (selectedOption) => {
    setAnioInicial(selectedOption);
    const newArr = anios.filter(
      (element) => element.value > selectedOption.value
    );
    setAniosFinales(newArr);
  };

  const onChangeAniosFinal = (selectedOption) => {
    setAnioFinal(selectedOption);
  };

  // Vacía los campos de los selects y de los estados relacionados con los datos
  const cleanFields = () => {
    setAniosFinales([]);
    setAnioInicial(0);
    setAnioFinal(0);
    setDataRelToxemia({});
    setDataRelEmbarazo({});
    setDataRelPrimipara({});
    setDataRelMA({});
    setDataRelMM({});

    setDataPromPesoMadre({});
    setdataPesoMadreCon({});
    setdataPesoMadreSin({});
    setpromediosPeso([]);
    setDataPromTallaMadre({});
    setdataTallaMadreCon({});
    setdataTallaMadreSin({});
    setpromediosTalla([]);

    setDataPromPesoPadre({});
    setdataPesoPadreCon({});
    setdataPesoPadreSin({});
    setpromediosPesoP([]);
    setDataPromTallaPadre({});
    setdataTallaPadreCon({});
    setdataTallaPadreSin({});
    setpromediosTallaP([]);
  };

  return (
    <div className="analysisRCIU">
      <div className="container">
        <div className="row pt-4">
          <h1>
            <b>Análisis del Entorno en pacientes con y sin RCIU</b>
          </h1>
          <p>
            En esta sección se encuentran diferentes visualizaciones referentes
            a variables prenatales y del entorno previo al nacimiento del bebé
            comparalables para pacientes con y sin RCIU. En algunas de estas
            visualizaciones se podrá interactuar con zoom y movimiento y para
            todos los análisis se puede escoger el intervalo de tiempo deseado
            entre 19993 a 2020.
          </p>
        </div>
        <div className="row pt-2">
          <h3>
            <b>Frecuencia de RCIU en intervalos de años</b>
          </h3>
        </div>
        <div className="row pt-4">
          <div className="col-4 datAbs">
            <CanvasJSChart options={dataAbsFreq} />
          </div>
          <div className="col-8 datRel">
            <CanvasJSChart options={dataRelFreq} />
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-3">
            {" "}
            <label htmlFor="">Año Inicial</label>
            <Select
              className="basic-single text-start"
              value={anioInicial}
              options={anios}
              onChange={onChangeAniosInicial}
            />
          </div>
          <div className="col-3">
            {" "}
            <label htmlFor="">Año Final</label>
            <Select
              className="basic-single text-start"
              value={anioFinal}
              options={aniosFinales}
              onChange={onChangeAniosFinal}
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
          <h3>
            <b>Antecedentes prenatales en pacientes con y sin RCIU </b>
          </h3>
        </div>
        <div className="row pt-4">
          <div className="col-4">
            <RelativeFreqGraph
              dataRel={dataRelToxemia}
              title={"Frecuencia de toxemia"}
            />
          </div>
          <div className="col-4">
            <RelativeFreqGraph
              dataRel={dataRelEmbarazo}
              title={"Frecuencia de embarazo múltiple"}
            />
          </div>
          <div className="col-4">
            <RelativeFreqGraph
              dataRel={dataRelPrimipara}
              title={"Frecuencia de madre primeriza"}
            />
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-6">
            <RelativeFreqGraph
              dataRel={dataRelMA}
              title={"Frecuencia de madres adolescentes (< 19 años)"}
            />
          </div>
          <div className="col-6">
            <RelativeFreqGraph
              dataRel={dataRelMM}
              title={"Frecuencia de madres mayores (> 35 años)"}
            />
          </div>
        </div>
        <MedidasGraphs
          dataSin={dataPesoMadreSin}
          dataCon={dataPesoMadreCon}
          tituloDist={"Distribución peso mamá"}
          options={options}
          dataProm={dataPromPesoMadre}
          tituloProm={"Promedio peso mamá"}
          promedios={promediosPeso}
          promSin={
            promediosPeso.length > 0
              ? `Promedio sin RCIU: ${promediosPeso[0].toFixed(2)} kg`
              : "-"
          }
          promCon={
            promediosPeso.length > 0
              ? `Promedio sin RCIU: ${promediosPeso[1].toFixed(2)} kg`
              : "-"
          }
        />
        <MedidasGraphs
          dataSin={dataTallaMadreSin}
          dataCon={dataTallaMadreCon}
          tituloDist={"Distribución talla mamá"}
          options={options}
          dataProm={dataPromTallaMadre}
          tituloProm={"Promedio talla mamá"}
          promedios={promediosTalla}
          promSin={
            promediosTalla.length > 0
              ? `Promedio sin RCIU: ${promediosTalla[0].toFixed(2)} cm`
              : "-"
          }
          promCon={
            promediosTalla.length > 0
              ? `Promedio sin RCIU: ${promediosTalla[1].toFixed(2)} cm`
              : "-"
          }
        />
        <MedidasGraphs
          dataSin={dataPesoPadreSin}
          dataCon={dataPesoPadreCon}
          tituloDist={"Distribución peso papá"}
          options={options}
          dataProm={dataPromPesoPadre}
          tituloProm={"Promedio peso papá"}
          promedios={promediosPesoP}
          promSin={
            promediosPesoP.length > 0
              ? `Promedio sin RCIU: ${promediosPesoP[0].toFixed(2)} kg`
              : "-"
          }
          promCon={
            promediosPesoP.length > 0
              ? `Promedio sin RCIU: ${promediosPesoP[1].toFixed(2)} kg`
              : "-"
          }
        />
        <MedidasGraphs
          dataSin={dataTallaPadreSin}
          dataCon={dataTallaPadreCon}
          tituloDist={"Distribución talla papá"}
          options={options}
          dataProm={dataPromTallaPadre}
          tituloProm={"Promedio talla papá"}
          promedios={promediosTallaP}
          promSin={
            promediosTallaP.length > 0
              ? `Promedio sin RCIU: ${promediosTallaP[0].toFixed(2)} cm`
              : "-"
          }
          promCon={
            promediosTallaP.length > 0
              ? `Promedio sin RCIU: ${promediosTallaP[1].toFixed(2)} cm`
              : "-"
          }
        />
        <div className="row pt-4">
          <h3>
            <b>Antecedentes demográficos en pacientes con y sin RCIU </b>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AnalysisGrowth;
