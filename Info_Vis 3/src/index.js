import React from "react";
import ReactDOM from "react-dom";
import { Cell } from "./cell";
import { BarChart, BarChart1 } from "./barchart";
import { PieChart, PieChart1 } from "./piechart67";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  csv,
  min,
  max,
  median,
  interpolateGnBu,
  interpolateRdBu,
  mean,
} from "d3";
import { Scales } from "./scale";
import { Legend } from "./legend";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";

// Heatmap for Population Trend of Indian States
const csvUrl2 = "https://gist.githubusercontent.com/harsh-tambi/ec9ed79c7024b46edafcfb85dfebaf8b/raw/67e4a7fa7109ce21ca7e992accf8f8529d3bb8ae/popdatanew.csv";

function useData2(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.Year = d.Year;
        d.State = d.State;
        d.Population = +d.Population;
      });
      setData(data);
    });
  }, []);
  console.log(dataAll);
  return dataAll;
}

function removeDuplicateState(data) {
  const temp = data.map((d) => d.State);
  return temp.filter((d, idx) => temp.indexOf(d) === idx);
}

function HeatMap2() {
  const [selectedState, setSelectedState] = React.useState(null);
  const WIDTH = 900;
  const HEIGHT = 700;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;
  const data = useData2(csvUrl2);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  // console.log(data);

  const Year = [
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2023",
  ];
  const State = removeDuplicateState(data);
  // console.log(STATION);

  const xScale = Scales.band(Year, 0, width);
  const yScale = Scales.band(State, 0, height);
  const startRange = [
    min(data, (d) => d.Population),
    median(data, (d) => d.Population),
    max(data, (d) => d.Population),
  ];
  const mini = min(data, (d) => d.Population);
  const colorRange = [
    interpolateGnBu(0),
    interpolateGnBu(0.01),
    interpolateGnBu(0.9),
  ];
  // const colormap = Scales.colormapLiner(startRange, colorRange);
  const colormap = Scales.colorDiverging(startRange, interpolateGnBu);

  if (selectedState == null) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <g transform={`translate(${margin.left + 100}, ${margin.top})`}>
                {data.map((d) => {
                  return (
                    <Cell
                      key={d.Year + d.State}
                      d={d}
                      xScale={xScale}
                      yScale={yScale}
                      color={colormap(d.Population)}
                      setSelectedState={setSelectedState}
                      selectedState={selectedState}
                    />
                  );
                })}
                {Year.map((s) => {
                  return (
                    <g
                      key={s}
                      transform={`translate(${xScale(s) + 5},-8)rotate(60)`}
                    >
                      <text style={{ textAnchor: "end" }}>{s}</text>
                    </g>
                  );
                })}
                {State.map((m) => {
                  return (
                    <text
                      key={m}
                      style={{ textAnchor: "middle" }}
                      x={-80}
                      y={yScale(m) + 10}
                    >
                      {m}
                    </text>
                  );
                })}
                <Legend
                  x={0}
                  y={height + 10}
                  width={width}
                  height={20}
                  numberOfTicks={2}
                  rangeOfValues={[
                    min(data, (d) => d.Population),
                    max(data, (d) => d.Population),
                  ]}
                  colormap={colormap}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <g transform={`translate(${margin.left + 100}, ${margin.top})`}>
                {data.map((d) => {
                  return (
                    <Cell
                      key={d.Year + d.State}
                      d={d}
                      xScale={xScale}
                      yScale={yScale}
                      color={colormap(d.Population)}
                      setSelectedState={setSelectedState}
                      selectedState={selectedState}
                    />
                  );
                })}
                {Year.map((s) => {
                  return (
                    <g
                      key={s}
                      transform={`translate(${xScale(s) + 5},-8)rotate(60)`}
                    >
                      <text style={{ textAnchor: "end" }}>{s}</text>
                    </g>
                  );
                })}
                {State.map((m) => {
                  return (
                    <text
                      key={m}
                      style={{ textAnchor: "middle" }}
                      x={-80}
                      y={yScale(m) + 10}
                    >
                      {m}
                    </text>
                  );
                })}
                <Legend
                  x={0}
                  y={height + 10}
                  width={width}
                  height={20}
                  numberOfTicks={2}
                  rangeOfValues={[
                    min(data, (d) => d.Population),
                    max(data, (d) => d.Population),
                  ]}
                  colormap={colormap}
                />
              </g>
            </svg>
          </div>

          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <BarChart
                offsetX={margin.left}
                offsetY={margin.top}
                data={data}
                height={height}
                width={width * 0.8}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </svg>
          </div>

          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <PieChart
                offsetX={margin.left + 250}
                offsetY={margin.top + 250}
                data={data}
                width={width}
                height={height}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

// Heatmap for GDP Trend of Indian States

const csvUrl1 =
  "https://gist.githubusercontent.com/harsh-tambi/217fc918faafadc1ff1c2c7209337548/raw/5fa21397090d559aef58648a6f79adf21e293a76/GDP%2520State%2520India%2520-%2520Sheet1%2520(1).csv";

function useData1(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.Year = d.Year;
        d.State = d.Province;
        d.GDP = +d.GDP;
      });
      setData(data);
    });
  }, []);
  console.log(dataAll);
  return dataAll;
}

function HeatMap1() {
  const [selectedState, setSelectedState] = React.useState(null);
  const WIDTH = 900;
  const HEIGHT = 700;
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;
  const data = useData1(csvUrl1);
  if (!data) {
    return <pre>Loading...</pre>;
  }
  // console.log(data);

  const Year = [
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2023",
  ];
  const State = removeDuplicateState(data);
  // console.log(STATION);
  const xScale = Scales.band(Year, 0, width);
  const yScale = Scales.band(State, 0, height);
  const startRange = [
    min(data, (d) => d.GDP),
    median(data, (d) => d.GDP),
    max(data, (d) => d.GDP),
  ];
  const mini = min(data, (d) => d.GDP);
  const colorRange = [
    interpolateGnBu(0),
    interpolateGnBu(0.01),
    interpolateGnBu(0.9),
  ];
  // const colormap = Scales.colormapLiner(startRange, colorRange);
  const colormap = Scales.colorDiverging(startRange, interpolateGnBu);
  if (selectedState == null) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <g transform={`translate(${margin.left + 100}, ${margin.top})`}>
                {data.map((d) => {
                  return (
                    <Cell
                      key={d.Year + d.State}
                      d={d}
                      xScale={xScale}
                      yScale={yScale}
                      color={colormap(d.GDP)}
                      setSelectedState={setSelectedState}
                      selectedState={selectedState}
                    />
                  );
                })}
                {Year.map((s) => {
                  return (
                    <g
                      key={s}
                      transform={`translate(${xScale(s) + 5},-8)rotate(60)`}
                    >
                      <text style={{ textAnchor: "end" }}>{s}</text>
                    </g>
                  );
                })}
                {State.map((m) => {
                  return (
                    <text
                      key={m}
                      style={{ textAnchor: "middle" }}
                      x={-80}
                      y={yScale(m) + 10}
                    >
                      {m}
                    </text>
                  );
                })}
                <Legend
                  x={0}
                  y={height + 10}
                  width={width}
                  height={20}
                  numberOfTicks={2}
                  rangeOfValues={[
                    min(data, (d) => d.GDP),
                    max(data, (d) => d.GDP),
                  ]}
                  colormap={colormap}
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <g transform={`translate(${margin.left + 100}, ${margin.top})`}>
                {data.map((d) => {
                  return (
                    <Cell
                      key={d.Year + d.State}
                      d={d}
                      xScale={xScale}
                      yScale={yScale}
                      color={colormap(d.GDP)}
                      setSelectedState={setSelectedState}
                      selectedState={selectedState}
                    />
                  );
                })}
                {Year.map((s) => {
                  return (
                    <g
                      key={s}
                      transform={`translate(${xScale(s) + 5},-8)rotate(60)`}
                    >
                      <text style={{ textAnchor: "end" }}>{s}</text>
                    </g>
                  );
                })}
                {State.map((m) => {
                  return (
                    <text
                      key={m}
                      style={{ textAnchor: "middle" }}
                      x={-80}
                      y={yScale(m) + 10}
                    >
                      {m}
                    </text>
                  );
                })}

                <Legend
                  x={0}
                  y={height + 10}
                  width={width}
                  height={20}
                  numberOfTicks={2}
                  rangeOfValues={[
                    min(data, (d) => d.GDP),
                    max(data, (d) => d.GDP),
                  ]}
                  colormap={colormap}
                />
              </g>
            </svg>
          </div>

          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <BarChart1
                offsetX={margin.left}
                offsetY={margin.top}
                data={data}
                height={height}
                width={width * 0.8}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </svg>
          </div>

          <div className="col-lg-4">
            <svg width={"100%"} viewBox={`0 0 ${WIDTH + 100} ${HEIGHT}`}>
              <PieChart1
                offsetX={margin.left + 250}
                offsetY={margin.top + 250}
                data={data}
                width={width}
                height={height}
                selectedState={selectedState}
                setSelectedState={setSelectedState}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

const csvUrlgdp =
  "https://gist.githubusercontent.com/harsh-tambi/900a66caad7843681f89e805dea068aa/raw/59ce68ad4a0eadb911847bcab70c51fa6494d884/India%2520GDP%2520Data%2520-%2520Sheet1.csv";
const csvUrlpop = "https://gist.githubusercontent.com/harsh-tambi/f65e01d482f266c2e9d7815ec1bd6d93/raw/f57cdcefd0dad8c6b564917dc67ed9c3ecdcbdc2/IndPOPDat%2520-%2520Sheet1.csv";
function useData(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    d3.csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.year = +d.year;
        d.gdp = +d.gdp;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}

function useData5(csvPath) {
  const [dataAll, setData] = React.useState(null);
  React.useEffect(() => {
    d3.csv(csvPath).then((data) => {
      data.forEach((d) => {
        d.year1 = +d.year;
        d.population = +d.population;
      });
      setData(data);
    });
  }, []);
  return dataAll;
}

function Points(props) {
  const { r, c, data, xScale, yScale } = props;
  const [selectPoint, setSelectPoint] = React.useState(null);

  const mouseOver = (d) => {
    setSelectPoint(d.index);
  };
  const mouseOut = () => {
    setSelectPoint(null);
  };
  // console.log(data);
  const radius = (d) => (d.index === selectPoint ? 13 : r);
  const color = (d) => (d.index === selectPoint ? "purple" : c);

  return (
    <g>
      {data.map((d) => {
        return (
          <circle
            key={d.index}
            cx={xScale(d.year)}
            cy={yScale(d.gdp)}
            onMouseOver={() => mouseOver(d)}
            onMouseOut={mouseOut}
            r={radius(d)}
            fill={color(d)}
            stroke={"black"}
          />
        );
      })}
    </g>
  );
}

function Points1(props) {
  const { r, c, data, xScale, yScale } = props;
  const [selectPoint, setSelectPoint] = React.useState(null);

  const mouseOver = (d) => {
    setSelectPoint(d.index);
  };
  const mouseOut = () => {
    setSelectPoint(null);
  };
  // console.log(data);
  const radius = (d) => (d.index === selectPoint ? 13 : r);
  const color = (d) => (d.index === selectPoint ? "brown" : c);

  return (
    <g>
      {data.map((d) => {
        return (
          <circle
            key={d.index}
            cx={xScale(d.year1)}
            cy={yScale(d.population)}
            onMouseOver={() => mouseOver(d)}
            onMouseOut={mouseOut}
            r={radius(d)}
            fill={color(d)}
            stroke={"black"}
          />
        );
      })}
    </g>
  );
}

function XAxis(props) {
  const { xScale, width, height } = props;
  const ticks = xScale.ticks();
  return (
    <g>
      <line x1={0} x2={width} y1={height} y2={height} stroke={"black"} />
      {ticks.map((tickValue) => {
        return (
          <g
            key={tickValue}
            transform={`translate(${xScale(tickValue)}, ${height + 20})`}
          >
            <line y1={-20} y2={-30} stroke={"black"} />
            <text style={{ textAnchor: "end", fontSize: "18px" }}>
              {tickValue}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function YAxis(props) {
  const { yScale, height } = props;
  const ticks = yScale.ticks();
  return (
    <g>
      <line y2={height} stroke={"black"} />
      {ticks.map((tickValue) => {
        return (
          <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
            <line x2={10} stroke={"black"} />
            <text style={{ textAnchor: "end", fontSize: "18px" }}>
              {tickValue}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function ScatterPlot(props) {
  const WIDTH = 800;
  const HEIGHT = 600;
  const margin = {
    top: 50,
    bottom: 50,
    left: 200,
    right: 50,
  };
  const data = useData(csvUrlgdp);
  if (!data) {
    // console.log("data is", data);
    return <pre>Loading</pre>;
  }
  // console.log(data);
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year)])
    .nice();
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.gdp)])
    .nice();

  return (
    <div className="row">
      <div className="col-lg-5">
        <svg width={"100%"} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Points
              r={6}
              c={"blue"}
              data={data}
              xScale={xScale}
              yScale={yScale}
            />
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ScatterPlot1(props) {
  const WIDTH = 800;
  const HEIGHT = 600;
  const margin = {
    top: 50,
    bottom: 50,
    left: 200,
    right: 50,
  };
  const data = useData5(csvUrlpop);
  if (!data) {
    // console.log("data is", data);
    return <pre>Loading</pre>;
  }
  // console.log(data);
  const height = HEIGHT - margin.top - margin.bottom;
  const width = WIDTH - margin.left - margin.right;
  const xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain([d3.min(data, (d) => d.year), d3.max(data, (d) => d.year1)])
    .nice();
  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.population)])
    .nice();

  return (
    <div className="row">
      <div className="col-lg-5">
        <svg width={"100%"} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <Points1
              r={6}
              c={"black"}
              data={data}
              xScale={xScale}
              yScale={yScale}
            />
            <XAxis xScale={xScale} width={width} height={height} />
            <YAxis yScale={yScale} height={height} />
          </g>
        </svg>
      </div>
    </div>
  );
}

ReactDOM.render(<HeatMap2 />, document.getElementById("root"));
ReactDOM.render(<HeatMap1 />, document.getElementById("root1"));
ReactDOM.render(<ScatterPlot />, document.getElementById("root2"));
ReactDOM.render(<ScatterPlot1 />, document.getElementById("root3"));
