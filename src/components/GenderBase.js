import React, { useState, useEffect } from "react";
import { GenderBaseData } from "../actions/medidasAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenus,
  faMars,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";

function GenderBase(props) {
  const [genderBaseData, setGenderBaseData] = useState({});

  const getGenderBaseData = async () => {
    var response = {};
    if (props.vars && props.vars.length > 0) {
      response = await GenderBaseData(props.inicio, props.fin, props.vars);
    } else {
      response = await GenderBaseData(props.inicio, props.fin, []);
    }
    setGenderBaseData(response);
  };

  useEffect(() => {
    getGenderBaseData();
  }, [props.inicio, props.fin, props.vars]);

  return (
    <div className="row mt-4 genderBase">
      <div className="col-2">
        <b className="total">
          Total Niños <FontAwesomeIcon icon={faMars} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perNinos}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalNinos}</p>
          </div>
        </div>
      </div>
      <div className="col-2">
        <b className="total">
          Total Niñas <FontAwesomeIcon icon={faVenus} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perNinas}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalNinas}</p>
          </div>
        </div>
      </div>
      <div className="col-2">
        <b className="total">
          Total prematuros <FontAwesomeIcon icon={faVenusMars} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perPrematuros}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalPrematuros}</p>
          </div>
        </div>
      </div>
      <div className="col-2">
        <b className="total">
          Total a término <FontAwesomeIcon icon={faVenusMars} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perTermino}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalTermino}</p>
          </div>
        </div>
      </div>
      <div className="col-2 p-0">
        <b className="total">
          Total con RCIU <FontAwesomeIcon icon={faVenusMars} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perRCIU}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalRCIU}</p>
          </div>
        </div>
      </div>
      <div className="col-2">
        <b className="total">
          Total sin RCIU <FontAwesomeIcon icon={faVenusMars} />
        </b>
        <div className="row">
          <div className="col-5">
            <b className="porcentaje">{genderBaseData.perSinRCIU}% </b>
          </div>
          <div className="col-1">
            <p>-</p>
          </div>
          <div className="col-4">
            {" "}
            <p>{genderBaseData.totalSinRCIU}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenderBase;
