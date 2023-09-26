import React from "react";
import * as d3 from "d3";

const D3 = () => {
  return (
    <svg
    style={{
      height: 500,
      width: "100%",
      marginRight: "0px",
      marginLeft: "0px",
    }}
  >
    <g className="plot-area" />
    <g className="x-axis" />
    <g className="y-axis" />
  </svg>
  );
};

export default D3;
