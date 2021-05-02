import React from "react";
import { Line } from "@reactchartjs/react-chart.js";

const LineChart = (props) => (
  <>
    <Line data={props.data} options={props.options} height={300} width={1000} />
  </>
);

export default LineChart;
