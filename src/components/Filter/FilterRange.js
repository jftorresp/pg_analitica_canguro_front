import React from "react";

function FilterRange(props) {
  return (
    <div>
      <div className="input-group pb-3">
        <span className="input-group-text">Desde</span>
        <input
          type="text"
          ref={props.desdeInput}
          aria-label="desde"
          className="form-control"
          placeholder={
            props.medida.includes("peso")
              ? "(gr)"
              : props.medida.includes("talla")
              ? "(cm)"
              : "(cm)"
          }
        />
        <span className="input-group-text">Hasta</span>
        <input
          type="text"
          ref={props.hastaInput}
          aria-label="hasta"
          className="form-control"
          placeholder={
            props.medida.includes("peso")
              ? "(gr)"
              : props.medida.includes("talla")
              ? "(cm)"
              : "(cm)"
          }
        />
        <button
          className="input-group-text aply-btn"
          onClick={props.medidaFilter}
        >
          Aplicar Filtro
        </button>
      </div>
    </div>
  );
}

export default FilterRange;
