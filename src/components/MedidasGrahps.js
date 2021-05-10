import React from "react";
import CanvasJSReact from "../assets/canvasjs.react";

const MedidasGrahps = (props) => {
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <div className="medidasGrahps col-4">
      {Object.entries(props.dataMedida).length !== 0 ? (
        <div>
          <h5>
            <b>{props.title}</b>
          </h5>
          <CanvasJSChart options={props.dataMedida} />
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MedidasGrahps;
