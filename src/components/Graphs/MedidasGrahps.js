import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

const MedidasGrahps = (props) => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // let desdeInput = React.createRef();
  // let hastaInput = React.createRef();

  const estudioSelected = (event) => {
    props.estudioSel(event.target.value);
  };

  return (
    <div className="medidasGrahps col-4">
      {Object.entries(props.dataMedida).length !== 0 ? (
        <div>
          <h5>
            <b>{props.title}</b>
          </h5>

          {props.filter === true ? (
            props.estudios === false ? (
              <div className="input-group pb-3">
                <span className="input-group-text">Desde</span>
                <input
                  type="text"
                  ref={props.desdeInput}
                  aria-label="desde"
                  className="form-control"
                  placeholder={
                    props.title.includes("peso")
                      ? "(kg)"
                      : props.title.includes("talla")
                      ? "(cm)"
                      : "(millones ($COP))"
                  }
                />
                <span className="input-group-text">Hasta</span>
                <input
                  type="text"
                  ref={props.hastaInput}
                  aria-label="hasta"
                  className="form-control"
                  placeholder={
                    props.title.includes("peso")
                      ? "(kg)"
                      : props.title.includes("talla")
                      ? "(cm)"
                      : "(millones ($COP))"
                  }
                />
                <button
                  className="input-group-text aply-btn"
                  onClick={props.medidaFilter}
                >
                  Aplicar Filtro
                </button>
              </div>
            ) : (
              <div className="input-group pb-3">
                <select class="form-select" onChange={estudioSelected}>
                  <option value="">Seleccione un nivel</option>
                  <option value="primaria">Primaria</option>
                  <option value="secundaria">Secundario</option>
                  <option value="tecnico">Técnico o universitario</option>
                </select>
                <button
                  className="input-group-text aply-btn"
                  onClick={props.medidaFilter}
                >
                  Aplicar Filtro
                </button>
              </div>
            )
          ) : (
            <p></p>
          )}
          <CanvasJSChart options={props.dataMedida} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MedidasGrahps;
