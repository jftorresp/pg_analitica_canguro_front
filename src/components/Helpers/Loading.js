import React from "react";
import ReactLoading from "react-loading";

const Example = ({ type, color }) => (
  <ReactLoading
    type={type}
    color={color}
    height={50}
    width={50}
    className="loading"
  />
);

export default Example;