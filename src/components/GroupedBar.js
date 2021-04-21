import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const GroupedBar = (props) => (
  <>
    <Bar data={props.data} options={props.options} height={300} width={1000} />
  </>
);

export default GroupedBar;
