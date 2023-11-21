// import React from "react";

// export function Cell(props){
//     const { d, xScale, yScale, color} = props;
//     return <g transform={`translate(${xScale(d.Year)}, ${yScale(d.State)})`}>
//         <rect width={xScale.bandwidth()} height={yScale.bandwidth()} fill={color} stroke={"black"} />
//     </g>
// }

import React from "react";

export function Cell(props) {
  const { d, xScale, yScale, color, selectedState, setSelectedState } = props;

  return (
    <g transform={`translate(${xScale(d.Year)}, ${yScale(d.State)})`}>
      <rect
        width={xScale.bandwidth()}
        height={yScale.bandwidth()}
        fill={color}
        stroke={"black"}
        onMouseEnter={() => {
          setSelectedState(d.State);
          console.log(d);
        }}
        onMouseOut={() => setSelectedState(null)}
      />
    </g>
  );
}
