import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  getParallelCoordinates,
  getYears,
  getDictByVar,
  RCIUFreqDiasH,
  RCIUFreqUCI,
  RCIUFreqEGEntrada,
  parallelPMC,
  RCIUPromPesoPMC,
  RCIUOxiEntrada,
} from "../actions/medidasAction";
import { getStages } from "../actions/etapasAction";
import ParallelCoord from "./ParallelCoord";
// import Select, { components } from "react-select";
import GenderBase from "./GenderBase";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import TooltipRail from "./TooltipRail";
import { Track } from "./Track";
import { Tick } from "./Tick";
import GroupedBar from "./GroupedBar";
import CanvasJSReact from "../assets/canvasjs.react";

const AnalysisGrowth = () => {
  //* States for data vis
  const [dataTipo1, setDataTipo1] = useState([]);
  const [dataTipo2, setDataTipo2] = useState([]);
  const [anios, setAnios] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [etapaSelected, setEtapaSelected] = useState("");
  const [typesRCIU, setTypesRCIU] = useState([]);
  const [typesRCIUSelected, setTypesRCIUSelected] = useState([]);
  const [dataRCIUdiasH, setDataRCIUdiasH] = useState({});
  const [dataRCIUFreqUCIPrem, setDataRCIUFreqUCIPrem] = useState({});
  const [dataRCIUFreqUCITerm, setDataRCIUFreqUCITerm] = useState({});
  const [dataRCIUFreqEGEntrada, setDataRCIUFreqEGEntrada] = useState({});

  const [dataRCIUFreqEGSalida, setDataRCIUFreqEGSalida] = useState({});

  const [dataParallelPMC1, setDataParallelPMC1] = useState([]);
  const [dataParallelPMC2, setDataParallelPMC2] = useState([]);
  const [dataParallelPMC3, setDataParallelPMC3] = useState([]);

  const [dataRCIUPromPeso1, setDataRCIUPromPeso1] = useState([]);
  const [dataRCIUPromPeso2, setDataRCIUPromPeso2] = useState([]);
  const [dataRCIUPromPeso3, setDataRCIUPromPeso3] = useState([]);

  const [dataRCIUOxiEntrada, setDataRCIUOxiEntrada] = useState({});

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

  // Fetch de los datos de RCIU
  const getDatos = async () => {
    const response = await getParallelCoordinates(
      anioInicial.value,
      typesRCIUSelected[0].value,
      etapaSelected.value
    );
    const response2 = await getParallelCoordinates(
      anioInicial,
      typesRCIUSelected[1].value,
      etapaSelected.value
    );
    setDataTipo1(response);
    setDataTipo2(response2);
  };

  // Fetch de los años
  const getAnios = async () => {
    const response = await getYears();
    setAnios(response);
  };

  const getEtapas = async () => {
    const response = await getStages();
    response.splice(0, 1);
    response.splice(0, 1);
    setEtapas(response);
  };

  const getTypesRCIU = async () => {
    const response = await getDictByVar("tipoRCIU");
    const tiposSelect = [];
    for (let i = 0; i < response.length; i++) {
      tiposSelect.push({
        value: response[i].key,
        label: response[i].valor,
      });
    }
    setTypesRCIU(tiposSelect);
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

    const yearsInterval = [];

    for (let index = update[0]; index < update[1] + 1; index++) {
      yearsInterval.push(index.toString());
    }
    responsePrem.axisX.labelFormatter = function (e) {
      for (let i = 0; i < yearsInterval.length; i++) {
        if (e.value === i) {
          return yearsInterval[i];
        }
      }
      return "";
    };
  };

  const getRCIUFreqEGEntrada = async () => {
    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "true"
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
            e.entries[0].dataPoint.y.toFixed(2) +
            " semanas"
          );
        }
      }
    };

    setDataRCIUFreqEGEntrada(response);
  };

  const getRCIUFreqEGSalida = async () => {
    const response = await RCIUFreqEGEntrada(
      anioInicial,
      anioFinal,
      "true",
      "false"
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
            e.entries[0].dataPoint.y.toFixed(2) +
            " semanas"
          );
        }
      }
    };

    setDataRCIUFreqEGSalida(response);
  };

  const getparallelPMC = async () => {
    const response1 = await parallelPMC(anioInicial, anioFinal, "1");
    setDataParallelPMC1(response1);
    ReactDOM.render("", document.getElementById("parOne"));
    const div = (
      <ParallelCoord data={response1} title={"Bebés sin RCIU y con RCEU"} />
    );
    ReactDOM.render(div, document.getElementById("parOne"));

    const response2 = await parallelPMC(anioInicial, anioFinal, "2");
    setDataParallelPMC2(response2);
    ReactDOM.render("", document.getElementById("parTwo"));
    const div2 = (
      <ParallelCoord data={response2} title={"Bebés sin RCIU y sin RCEU"} />
    );
    ReactDOM.render(div2, document.getElementById("parTwo"));

    const response3 = await parallelPMC(anioInicial, anioFinal, "3");
    setDataParallelPMC3(response3);
    ReactDOM.render("", document.getElementById("parThree"));
    const div3 = <ParallelCoord data={response3} title={"Bebés con RCIU"} />;
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

  // Handlers para los Selects
  const onChangeEtapa = (selectedOption) => {
    setEtapaSelected(selectedOption);
  };

  const onChangeYear = (selectedOption) => {
    setAnioInicial(selectedOption);
  };

  const onChangeTypesRCIU = (selectedOption) => {
    setTypesRCIUSelected(selectedOption);
  };

  const cleanFields = () => {
    setEtapaSelected("");
    setTypesRCIUSelected([]);
    setDataTipo1([]);
    setDataTipo2([]);
  };

  const onUpdate = (update) => {
    setUpdate(update);
  };

  const onChange = (valuesNew) => {
    setValues(valuesNew);
    setAnioInicial(valuesNew[0]);
    setAnioFinal(valuesNew[1]);
    getRCIUFreqDiasH();
    getRCIUFreqUCI();
    getRCIUFreqEGEntrada();
    getRCIUFreqEGSalida();
    getparallelPMC();
    getRCIUPromPesoPMC();
    getRCIUOxiEntrada();
  };

  useEffect(() => {
    getAnios();
    getEtapas();
    getTypesRCIU();
    getRCIUFreqDiasH();
    getRCIUFreqUCI();
    getRCIUFreqEGEntrada();
    getRCIUFreqEGSalida();
    getparallelPMC();
    getRCIUPromPesoPMC();
    getRCIUOxiEntrada();
  }, []);

  return (
    <div className="analysisGrowth">
      <div className="container">
        <GenderBase />
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
          <h3>
            <b>Antecedentes Neonatales</b>
          </h3>
        </div>
        <div className="row">
          <h5>
            <b>Promedio días de hospitalización con y sin RCIU</b>
          </h5>
        </div>
        <div className="row">
          <div className="col-12">
            {" "}
            <GroupedBar data={dataRCIUdiasH} options={options} height={200} />
          </div>
        </div>
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
        <div className="row pt-4">
          <div className="col-6">
            <ParallelCoord
              data={dataTipo1.length > 0 ? dataTipo1 : []}
              tipo={
                typesRCIUSelected.length > 0 ? typesRCIUSelected[0].label : ""
              }
            />
          </div>
          <div className="col-6">
            {" "}
            <ParallelCoord
              data={dataTipo2.length > 0 ? dataTipo2 : []}
              tipo={
                typesRCIUSelected.length > 1 ? typesRCIUSelected[1].label : ""
              }
            />
          </div>
        </div>
        <div className="row">
          <h3>
            <b>Antecedentes ingreso al Programa Madre Canguro (PMC)</b>
          </h3>
        </div>
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
        <div className="row">
          <h5>
            <b>Medidas antropométricas entrada al programa</b>
          </h5>
        </div>
        <div className="row">
          <div className="col-4" id="parOne"></div>
          <div className="col-4" id="parTwo"></div>
          <div className="col-4" id="parThree"></div>
        </div>
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
        <div className="row">
          <h3>
            <b>Medidas antropométricas y nutrición</b>
          </h3>
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
  );
};

export default AnalysisGrowth;
