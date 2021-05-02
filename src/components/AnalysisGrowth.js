import React, { useState, useEffect, useCallback } from "react";
import {
  getParallelCoordinates,
  getParallelCoordinatesVars,
  getDictByVar,
  getYears,
} from "../actions/medidasAction";
import MyResponsiveParallelCoordinates from "./MyResponsiveParallelCoordinates";
import Loading from "./Loading";
import Select from "react-select";

const AnalysisGrowth = () => {
  const [dataRCIU0, setDataRCIU0] = useState([]);
  const [dataRCIU1, setDataRCIU1] = useState([]);
  const [dataRCIU2, setDataRCIU2] = useState([]);
  const [dataRCIU3, setDataRCIU3] = useState([]);
  const [dataRCIU4, setDataRCIU4] = useState([]);
  const [dataRCIU5, setDataRCIU5] = useState([]);
  const [variables, setVariables] = useState([]);
  const [typesRCIU, setTypesRCIU] = useState([]);
  const [anioInicial, setAnioInicial] = useState(0);
  const [anios, setAnios] = useState([]);
  const [loading, setLoading] = useState(false);

  var tipoRCIU0 = typesRCIU.length > 0 ? typesRCIU[0].valor : " ";
  var tipoRCIU1 = typesRCIU.length > 0 ? typesRCIU[1].valor : " ";
  var tipoRCIU2 = typesRCIU.length > 0 ? typesRCIU[2].valor : " ";
  var tipoRCIU3 = typesRCIU.length > 0 ? typesRCIU[3].valor : " ";
  var tipoRCIU4 = typesRCIU.length > 0 ? typesRCIU[4].valor : " ";
  var tipoRCIU5 = typesRCIU.length > 0 ? typesRCIU[5].valor : " ";

  const getTypeRCIU = async () => {
    const response = await getDictByVar("tipoRCIU");
    setTypesRCIU(response);
  };

  // Fetch de los años
  const getAnios = async () => {
    const data = await getYears();
    setAnios(data);
  };

  const getDatos = useCallback(async () => {
    setLoading(true);
    const response = await getParallelCoordinates(anioInicial.value, 0);
    setDataRCIU0(response);
    const response1 = await getParallelCoordinates(anioInicial.value, 1);
    setDataRCIU1(response1);
    const response2 = await getParallelCoordinates(anioInicial.value, 2);
    setDataRCIU2(response2);
    const response3 = await getParallelCoordinates(anioInicial.value, 3);
    setDataRCIU3(response3);
    const response4 = await getParallelCoordinates(anioInicial.value, 4);
    setDataRCIU4(response4);
    const response5 = await getParallelCoordinates(anioInicial.value, 5);
    setDataRCIU5(response5);
    const responseVars = await getParallelCoordinatesVars();
    setVariables(responseVars);
    setLoading(false);
  }, [anioInicial]);

  const onChangeYear = (selectedOption) => {
    setAnioInicial(selectedOption);
  };

  const cleanFields = () => {
    setDataRCIU0([]);
    setDataRCIU1([]);
    setDataRCIU2([]);
    setDataRCIU3([]);
    setDataRCIU4([]);
    setDataRCIU5([]);
    setVariables([]);
    setAnioInicial(0);
  };

  useEffect(() => {
    getAnios();
    getTypeRCIU();
  }, []);

  return (
    <div className="analysisRCIU">
      <div className="container">
        <div className="row pt-4">
          <h1 className="text-start">
            <b>Análisis Restricción del Crecimiento Intra Uterino (RCIU)</b>
          </h1>
        </div>
        <div className="row pt-2">
          <p className="text-start text-justify">
            En esta sección se podrán estudiar las variables antropomórficas
            para neonatos con diferents tipos de RCIU en diferentes intervalos
            de tiempo. Se podrán comparar de a dos tipos de RCIU y seleccionando
            la etapa de interés.
          </p>
        </div>
        <div className="row">
          <h2>
            {" "}
            Evolución variables antropomórficas al nacer para neonatos con RCIU
          </h2>
        </div>
        <div className="row">
          <div className="col-5">
            <p>
              <b>Muestra:</b> Neonatos con {">="} 35 semanas de edad gestacional
              (N ={" "}
              {dataRCIU0.length +
                dataRCIU1.length +
                dataRCIU2.length +
                dataRCIU3.length +
                dataRCIU4.length +
                dataRCIU5.length}
              )
            </p>
          </div>
        </div>
        <div className="row">
          <div class="col-2">
            <label for="anioInicial" class="form-label">
              Año inicial:
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
          <div className="col-8 align-self-end">
            <h6>
              {anioInicial === 0
                ? " "
                : 2016 - anioInicial.value < 5
                ? `Año consulta: ${anioInicial.value}`
                : `Años consulta: ${anioInicial.value} - ${
                    parseInt(anioInicial.value) + 5
                  }`}
            </h6>
          </div>
        </div>
      </div>
      {dataRCIU0.length > 0 &&
      dataRCIU1.length > 0 &&
      dataRCIU2.length > 0 &&
      dataRCIU3.length > 0 &&
      dataRCIU4.length > 0 &&
      dataRCIU5.length > 0 ? (
        <div className="parallel-graphs">
          <div className="row pt-3">
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU0}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU0}
                variables={variables}
              />
            </div>
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU1}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU1}
                variables={variables}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU2}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU2}
                variables={variables}
              />
            </div>
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU3}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU3}
                variables={variables}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU4}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU4}
                variables={variables}
              />
            </div>
            <div className="col-6 parallel-coordinates">
              <p>
                <b>Tipo RCIU:</b> {tipoRCIU5}
              </p>
              <MyResponsiveParallelCoordinates
                data={dataRCIU5}
                variables={variables}
              />
            </div>
          </div>
        </div>
      ) : // <p></p>
      loading === false ? (
        <p></p>
      ) : (
        <div>
          <p className="text-center">Cargando datos ...</p>
          <Loading type={"spin"} color={"#0b486b"}></Loading>
        </div>
      )}
    </div>
  );
};

export default AnalysisGrowth;
