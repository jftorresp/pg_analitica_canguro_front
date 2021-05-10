import React, { useState, useEffect } from "react";
import {
  getParallelCoordinates,
  getYears,
  getDictByVar,
} from "../actions/medidasAction";
import { getStages } from "../actions/etapasAction";
import ParallelCoord from "./ParallelCoord";
import Creatable from "react-select/creatable";
import Select, { components } from "react-select";
import GenderBase from "./GenderBase";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import TooltipRail from "./TooltipRail";
import { Track } from "./Track";
import { Tick } from "./Tick";

const AnalysisGrowth = () => {
  const [dataTipo1, setDataTipo1] = useState([]);
  const [dataTipo2, setDataTipo2] = useState([]);
  const [anios, setAnios] = useState([]);
  const [anioInicial2, setAnioInicial2] = useState(0);
  const [etapas, setEtapas] = useState([]);
  const [etapaSelected, setEtapaSelected] = useState("");
  const [typesRCIU, setTypesRCIU] = useState([]);
  const [typesRCIUSelected, setTypesRCIUSelected] = useState([]);

  // States for years
  const [anioInicial, setAnioInicial] = useState(1993);
  const [anioFinal, setAnioFinal] = useState(2020);

  // States for slider
  const defaultValues = [1993, 2020];
  const [domain, setDomain] = useState([1993, 2020]);
  const [values, setValues] = useState(defaultValues.slice());
  const [update, setUpdate] = useState(defaultValues.slice());

  const sliderStyle = {
    position: "relative",
    width: "100%",
  };

  // Fetch de los datos de RCIU
  const getDatos = async () => {
    const response = await getParallelCoordinates(
      anioInicial.value,
      typesRCIUSelected[0].value,
      etapaSelected.value
    );
    const response2 = await getParallelCoordinates(
      anioInicial2.value,
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

  // Handlers para los Selects
  const onChangeEtapa = (selectedOption) => {
    setEtapaSelected(selectedOption);
  };

  const onChangeYear = (selectedOption) => {
    setAnioInicial2(selectedOption);
  };

  const onChangeTypesRCIU = (selectedOption) => {
    setTypesRCIUSelected(selectedOption);
  };

  const cleanFields = () => {
    setAnioInicial2(0);
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
  };

  useEffect(() => {
    getAnios();
    getEtapas();
    getTypesRCIU();
  }, [etapaSelected, anioInicial2]);

  const Menu = (props) => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 2 ? (
          props.children
        ) : (
          <div style={{ margin: 15 }}>Límite de selección alcanzado</div>
        )}
      </components.Menu>
    );
  };

  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 2;

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
          <div class="col-2">
            <label for="etapa" class="form-label">
              Etapa
            </label>
            <Select
              placeholder="Select..."
              className="basic-single text-start"
              options={etapas}
              value={etapaSelected}
              onChange={onChangeEtapa}
            />
          </div>
          <div className="col-3">
            <label for="tiposRCIU" class="form-label">
              Tipos de RCIU
            </label>
            {/* <Select
              className="basic-single text-start"
              isMulti
              value={typesRCIUSelected}
              options={typesRCIU}
            /> */}
            <Creatable
              components={{ Menu }}
              isMulti
              isValidNewOption={isValidNewOption}
              options={typesRCIU}
              value={typesRCIUSelected}
              onChange={onChangeTypesRCIU}
            />
          </div>
          <div class="col-2">
            <label for="anioInicial" class="form-label">
              Año inicial
            </label>
            <Select
              placeholder="Select..."
              className="basic-single text-start"
              options={anios}
              value={anioInicial2}
              onChange={onChangeYear}
            />
          </div>
          <div className="col-1 align-self-end">
            <button className="query-btn" onClick={getDatos}>
              Consultar
            </button>
          </div>
          <div className="col-1 align-self-end">
            <button className="clean-btn" onClick={cleanFields}>
              Limpiar{" "}
            </button>
          </div>
          <div className="col-3 align-self-end">
            <h6>
              {anioInicial2 === 0
                ? " "
                : 2016 - anioInicial2.value < 5
                ? `Año: ${anioInicial2.value}`
                : `Años: ${anioInicial2.value} - ${
                    parseInt(anioInicial2.value) + 5
                  }`}
            </h6>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-6">
            {" "}
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
