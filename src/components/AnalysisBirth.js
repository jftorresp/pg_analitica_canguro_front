import React, { useState, useEffect } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import TooltipRail from "./TooltipRail";
import { Track } from "./Track";
import { Tick } from "./Tick";
import {
  RCIUFreqCesarea,
  RCIUFreqGender,
  RCIUFreqEdadGes,
  RCIUFreqEGPremTerm,
  RCIUAFPromMedidaBebeNacer,
  RCIURCEUFreq,
  RCIUAntNacimientoVars,
} from "../actions/medidasAction";
import CanvasJSReact from "../assets/canvasjs.react";
import GroupedBar from "./GroupedBar";
import GenderBase from "./GenderBase";
import Select from "react-select";

function AnalysisBirth() {
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
    const response = await RCIUFreqCesarea(anioInicial, anioFinal, "true");
    const response2 = await RCIUFreqCesarea(anioInicial, anioFinal, "false");

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
    const response = await RCIUFreqGender(
      anioInicial,
      anioFinal,
      "true",
      "true"
    );
    setdataFreqGenderPremWith(response);

    const response2 = await RCIUFreqGender(
      anioInicial,
      anioFinal,
      "true",
      "false"
    );
    setdataFreqGenderPremWithout(response2);

    const response3 = await RCIUFreqGender(
      anioInicial,
      anioFinal,
      "false",
      "true"
    );
    setdataFreqGenderTermWith(response3);

    const response4 = await RCIUFreqGender(
      anioInicial,
      anioFinal,
      "false",
      "false"
    );
    setdataFreqGenderTermWithout(response4);
  };

  const getRCIUFreqEdadGes = async () => {
    const response = await RCIUFreqEdadGes(anioInicial, anioFinal);

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
    const response = await RCIUFreqEGPremTerm(anioInicial, anioFinal);
    setdataFreqEGPremTerm(response);
  };

  const getRCIUAFPromPesoBebeNacer = async () => {
    const pesoAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "true",
      "pesoalnacer"
    );

    const pesoAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "false",
      "pesoalnacer"
    );

    setPesoNacerPrem(pesoAlNacerPrem);
    setPesoNacerTerm(pesoAlNacerTerm);
  };

  const getRCIUAFPromTallaBebeNacer = async () => {
    const tallaAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "true",
      "tallaalnacer"
    );

    const tallaAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "false",
      "tallaalnacer"
    );

    setTallaNacerPrem(tallaAlNacerPrem);
    setTallaNacerTerm(tallaAlNacerTerm);
  };

  const getRCIUAFPromPCBebeNacer = async () => {
    const pcAlNacerPrem = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "true",
      "pcalnacer"
    );

    const pcAlNacerTerm = await RCIUAFPromMedidaBebeNacer(
      anioInicial,
      anioFinal,
      "false",
      "pcalnacer"
    );

    setPcNacerPrem(pcAlNacerPrem);
    setPcNacerTerm(pcAlNacerTerm);
  };

  const getRCIURCEUFreq = async () => {
    const prem = await RCIURCEUFreq(anioInicial, anioFinal, "true");
    const term = await RCIURCEUFreq(anioInicial, anioFinal, "false");

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

  useEffect(() => {
    getRCIUAntNacimientoVars();
  }, []);

  return (
    <div className="analysisBirth">
      <div className="container">
        <GenderBase />
        <div className="row pt-4">
          <h1>
            <b>Análisis Nacimiento - RCIU</b>
          </h1>
          <p>
            En esta sección se podrá hacer un análisis de diferentes{" "}
            <b>variables perinatales</b> a lo largo del tiempo, para distintas{" "}
            <b>muestras de interés</b> en pacientes{" "}
            <b>
              con y sin Restricción del Crecimiento Intrauterino (RCIU) y bebés
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
            Seleccione una o varias variables de interés para poder visualizar
            los diferentes datos. Para hacer efectiva su consulta por favor dar
            click en <i>"Consultar"</i>, si desea limpiar las variables y datos
            dar click en <i>"Limpiar"</i>.
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
            <div className="row pt-4">
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
            <div className="peso col-4">
              <GroupedBar data={pesoNacerPrem} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(tallaNacerPrem).length !== 0 ? (
            <div className="talla col-4">
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
            <div className="pc col-4">
              <GroupedBar data={pcNacerPrem} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(pesoNacerTerm).length !== 0 ? (
            <div className="peso col-4">
              <GroupedBar data={pesoNacerTerm} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
          {Object.entries(tallaNacerTerm).length !== 0 ? (
            <div className="talla col-4">
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
            <div className="pc col-4">
              <GroupedBar data={pcNacerTerm} options={options} height={200} />
            </div>
          ) : (
            ""
          )}
        </div>
        {Object.entries(rciuRceuPrem).length !== 0 &&
        Object.entries(rciuRceuTerm).length !== 0 ? (
          <div className="rciu">
            <div className="row pt-4">
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
