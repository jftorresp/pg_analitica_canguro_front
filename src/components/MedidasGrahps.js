import React from "react";
import GroupedBar from "./GroupedBar";

const MedidasGrahps = (props) => {
  return (
    <div className="medidasGrahps">
      <div className="row pt-4">
        <div className="col-4">
          {Object.entries(props.dataSin).length !== 0 &&
          Object.entries(props.dataCon).length !== 0 ? (
            <div>
              {" "}
              <h5>
                <b>{props.tituloDist}</b>
              </h5>
              <div className="row">
                {" "}
                {Object.entries(props.dataSin).length !== 0 ? (
                  <div>
                    <GroupedBar
                      data={props.dataSin}
                      options={props.options}
                      height={500}
                    />
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="row">
                {" "}
                {Object.entries(props.dataCon).length !== 0 ? (
                  <div>
                    <GroupedBar
                      data={props.dataCon}
                      options={props.options}
                      height={500}
                    />
                  </div>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="col-5 align-self-center">
          {Object.entries(props.dataProm).length !== 0 ? (
            <div>
              {" "}
              <h5>
                <b>{props.tituloProm}</b>
              </h5>
              <GroupedBar data={props.dataProm} options={props.options} />
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="col-3 align-self-center">
          {props.promedios.length > 0 ? (
            <div>
              {" "}
              <h5>
                <b>Promedio total</b>
              </h5>
              <div className="row pt-3">
                {" "}
                <p>{props.promSin}</p>
                <p>{props.promCon}</p>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedidasGrahps;
