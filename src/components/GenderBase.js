import React, { useState, useEffect } from "react";
import { GenderBaseData } from "../actions/medidasAction";

function GenderBase() {
  const [genderBaseData, setGenderBaseData] = useState({});

  const getGenderBaseData = async () => {
    const response = await GenderBaseData();
    setGenderBaseData(response);
  };

  useEffect(() => {
    getGenderBaseData();
  }, []);

  return (
    <div className="row mt-4 genderBase">
      <div className="col-2">
        <b className="total">Total Niños</b>
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
        <b className="total">Total Niñas</b>
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
        <b className="total">Total Niños y Niñas prematuros</b>
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
        <b className="total">Total Niños y Niñas a término</b>
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
      <div className="col-2">
        <b className="total">Total Niños y Niñas con RCIU</b>
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
        <b className="total">Total Niños y Niñas sin RCIU</b>
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
