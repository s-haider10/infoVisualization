import React from "react";
import { max } from "d3";
import { Scales } from "./scale";
import { Line } from "./line";
import { XAxis, YAxis } from "./axes";

export function LineChart(props) {
  const {
    offsetX,
    offsetY,
    data,
    height,
    width,
    selectedStates,
    setSelectedStates,
  } = props;
  const xScale = Scales.linear(
    0,
    max(data, (d) => d.state),
    0,
    width
  );
  const yScale = Scales.linear(
    0,
    max(data, (d) => d.tripdurationE),
    height,
    0
  );
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Line
        data={data}
        xScale={xScale}
        yScale={yScale}
        height={height}
        width={width}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      <YAxis
        yScale={yScale}
        height={height}
        axisLable={"Trip duration end in"}
      />
      <XAxis
        chartType={"line"}
        xScale={xScale}
        height={height}
        width={width}
        axisLable={"Trip duration start from"}
      />
    </g>
  );
}

function Line(props) {
  const { data, xScale, yScale, height, width } = props;
  const line = d3
    .line()
    .x((d) => xScale(d.tripdurationS))
    .y((d) => yScale(d.tripdurationE));
  return (
    <g>
      <path d={line(data)} fill="none" stroke="steelblue" strokeWidth="2" />
    </g>
  );
}
