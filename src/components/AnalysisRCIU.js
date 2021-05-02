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

const AnalysisRCIU = () => {
  const [dataTipo1, setDataTipo1] = useState([]);
  const [dataTipo2, setDataTipo2] = useState([]);
  const [anios, setAnios] = useState([]);
  const [anioInicial, setAnioInicial] = useState(0);
  const [etapas, setEtapas] = useState([]);
  const [etapaSelected, setEtapaSelected] = useState("");
  const [typesRCIU, setTypesRCIU] = useState([]);
  const [typesRCIUSelected, setTypesRCIUSelected] = useState([]);

  // Fetch de los datos de RCIU
  const getDatos = async () => {
    const response = await getParallelCoordinates(
      anioInicial.value,
      typesRCIUSelected[0].value,
      etapaSelected.value
    );
    const response2 = await getParallelCoordinates(
      anioInicial.value,
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
    setAnioInicial(selectedOption);
  };

  const onChangeTypesRCIU = (selectedOption) => {
    setTypesRCIUSelected(selectedOption);
  };

  const cleanFields = () => {
    setAnioInicial(0);
    setEtapaSelected("");
    setTypesRCIUSelected([]);
    setDataTipo1([]);
    setDataTipo2([]);
  };

  useEffect(() => {
    getAnios();
    getEtapas();
    getTypesRCIU();
  }, [etapaSelected, anioInicial]);

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
        <div className="row pt-4">
          <h1 className="text-start">
            <b>Análisis Restricción del Crecimiento Intra Uterino (RCIU)</b>
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
              value={anioInicial}
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
              {anioInicial === 0
                ? " "
                : 2016 - anioInicial.value < 5
                ? `Año: ${anioInicial.value}`
                : `Años: ${anioInicial.value} - ${
                    parseInt(anioInicial.value) + 5
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
      </div>
    </div>
  );
};

export default AnalysisRCIU;
