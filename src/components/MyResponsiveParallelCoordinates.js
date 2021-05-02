import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";

const MyResponsiveParallelCoordinates = (props) => (
  <ResponsiveParallelCoordinates
    data={props.data}
    variables={props.variables}
    margin={{ top: 20, right: 60, bottom: 50, left: 60 }}
    curve="cardinal"
    strokeWidth={2}
    colors={{ scheme: "yellow_green_blue" }}
  />
);

export default MyResponsiveParallelCoordinates;
