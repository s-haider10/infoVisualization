import React from "react";
import { pie, arc } from "d3";

export function PieChart(props) {
  const { offsetX, offsetY, data, height, width, selectedState } = props;
  const filteredData = data.filter((d) => d.State === selectedState);

  // Create an array of values to use for the pie chart
  const stateData = filteredData
    .filter((d) => d.Year === "2023")
    .map((d) => d.Population);

  const indiaTotalPopulation = data.reduce((total, data) => {
    return total + data.Population;
  }, 0);

  const pieData = [stateData, indiaTotalPopulation / 8]; // made this to make an impactful representation of the population against the total population of India
  // Define a pie generator
  const pieGenerator = pie()(pieData);

  // Define an arc generator
  const arcGenerator = arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* Render a slice for each data point */}
      {pieGenerator.map((slice, index) => (
        <path
          key={index}
          d={arcGenerator(slice)}
          fill={index % 2 === 0 ? "steel_blue" : "pink"} // Example colors
          stroke="white"
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

export function PieChart1(props) {
  const { offsetX, offsetY, data, height, width, selectedState } = props;
  const filteredData = data.filter((d) => d.State === selectedState);

  // Create an array of values to use for the pie chart
  const stateData = filteredData
    .filter((d) => d.Year === "2023")
    .map((d) => d.GDP);

  const indiaTotalGDP = data.reduce((total, data) => {
    return total + data.GDP;
  }, 0);

  const pieData = [stateData, indiaTotalGDP / 8]; // made this to make an impactful representation of the GDP against the total GDP of India
  // Define a pie generator
  const pieGenerator = pie()(pieData);

  // Define an arc generator
  const arcGenerator = arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {/* Render a slice for each data point */}
      {pieGenerator.map((slice, index) => (
        <path
          key={index}
          d={arcGenerator(slice)}
          fill={index % 2 === 0 ? "#000080" : "pink"} // Example colors
          stroke="white"
          strokeWidth="2"
        />
      ))}
    </g>
  );
}
