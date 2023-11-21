import React from "react";

export function Bars(props) {
  const { data, xScale, yScale, height, selectedState, setSelectedState } =
    props;

  return (
    <g>
      {data.map((d) => (
        <rect
          x={xScale(d.Year)}
          y={yScale(d.Population)}
          width={xScale.bandwidth() * 0.8}
          height={height - yScale(d.Population)}
          stroke="grey"
          fill="brown"
          onMouseOut={() => setSelectedState(null)}
        />
      ))}
    </g>
  );
}

export function Bars1(props) {
  const { data, xScale, yScale, height, selectedState, setSelectedState } =
    props;
  console.log("Helllllooo");
  return (
    <g>
      {data.map((d) => (
        <rect
          x={xScale(d.Year)}
          y={yScale(d.GDP)}
          width={xScale.bandwidth() * 0.8}
          height={height - yScale(d.GDP)}
          stroke="grey"
          fill="purple"
          onMouseOut={() => setSelectedState(null)}
        />
      ))}
    </g>
  );
}
