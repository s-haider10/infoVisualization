import React from "react";

import { max } from "d3";
import { XAxis, YAxis } from "./axes";
import { Scales } from "./scale";
import { Bars, Bars1 } from "./bars";

export function BarChart(props) {
  const {
    offsetX,
    offsetY,
    data,
    height,
    width,
    setSelectedState,
    selectedState,
  } = props;
  const filteredData = data.filter((d) => d.State === selectedState);

  const xScale = Scales.band(
    data.map((d) => d.Year),
    0,
    width
  );
  const yScale = Scales.linear(
    0,
    max(filteredData, (d) => d.Population),
    height,
    0
  );
  // console.log(max(data, d => d.tripdurationE));
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Bars
        data={filteredData}
        xScale={xScale}
        yScale={yScale}
        height={height}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      <YAxis yScale={yScale} height={height} axisLable={"Population"} />
      <XAxis chartType={"bar"} xScale={xScale} height={height} width={width} />
    </g>
  );
}

export function BarChart1(props) {
  const {
    offsetX,
    offsetY,
    data,
    height,
    width,
    setSelectedState,
    selectedState,
  } = props;
  const filteredData = data.filter((d) => d.State === selectedState);
  console.log(filteredData);

  const xScale = Scales.band(
    data.map((d) => d.Year),
    0,
    width
  );
  const yScale = Scales.linear(
    0,
    max(filteredData, (d) => d.GDP),
    height,
    0
  );
  // console.log(max(data, d => d.tripdurationE));
  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      <Bars1
        data={filteredData}
        xScale={xScale}
        yScale={yScale}
        height={height}
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
      <YAxis yScale={yScale} height={height} axisLable={"GDP"} />
      <XAxis chartType={"bar"} xScale={xScale} height={height} width={width} />
    </g>
  );
}
