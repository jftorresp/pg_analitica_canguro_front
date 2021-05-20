import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const GroupedBar = (props) => (
  <>
    <Bar data={props.data} options={props.options} height={props.height} />
  </>
);

export default GroupedBar;
