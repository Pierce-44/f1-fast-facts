"use client";
import { QualyResults } from "@/util/fetchDriverQualyResults";
import { formatString } from "@/util/formateRaceName";
// components/MyChart.js
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DriveQualyResultsChat({
  driverQaulyResults,
  teamMateQaulyResults,
}: {
  driverQaulyResults: QualyResults | null;
  teamMateQaulyResults: QualyResults | null;
}) {
  const [showTeamMate, setShowTeamMate] = React.useState(false);

  const driverGivenName =
    driverQaulyResults?.races[0].qualifyingResults[0].driver.givenName;
  const driverFamilyName =
    driverQaulyResults?.races[0].qualifyingResults[0].driver.familyName;
  const teamMateFamilyName =
    teamMateQaulyResults?.races[0].qualifyingResults[0].driver.familyName;

  const series = [
    {
      name: "Points To Date",
      data: [] as { x: string; y: number }[],
    },
  ];

  const seriesCombined = [
    {
      name: `${driverFamilyName}`,
      data: [] as { x: string; y: number }[],
    },
    {
      name: `${teamMateFamilyName}`,
      data: [] as { x: string; y: number }[],
    },
  ];

  driverQaulyResults?.races.forEach((result) => {
    const position = Number(result.qualifyingResults[0].position);
    const location = result.circuit.circuitId;

    series[0].data.push({
      x: formatString(location),
      y: position,
    });

    seriesCombined[0].data.push({
      x: formatString(location),
      y: position,
    });
  });

  teamMateQaulyResults?.races.forEach((result) => {
    const position = Number(result.qualifyingResults[0].position);
    const location = result.circuit.circuitId;

    seriesCombined[1].data.push({
      x: formatString(location),
      y: position,
    });
  });

  options.title.text = `Qualifying Results - ${driverGivenName} ${driverFamilyName}`;

  return (
    <div className="w-4/6 h-full shrink-0 rounded-md shadow-mine p-4 flex flex-col items-start gap-10">
      <div className="w-full h-[400px] relative">
        <Chart
          className="bg-white"
          options={options as any}
          series={showTeamMate ? seriesCombined : series}
          type="line"
          height="100%"
          width="100%"
          curve="straight"
        />
        <div className="absolute h-full w-full bg-slate-100 animate-pulse top-0 left-0 -z-10 rounded-lg"></div>
      </div>
      <button
        onClick={() => {
          setShowTeamMate(!showTeamMate);
        }}
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-4 hover:bg-[#3e66d3] transition-all"
      >
        {showTeamMate ? "Without Teammate - " : "With Teammate - "}
        {teamMateFamilyName}
      </button>
    </div>
  );
}

const options = {
  chart: {
    id: "basic-bar",
  },
  stroke: {
    curve: "smooth",
  },
  markers: {
    size: 5, // Size of the points
    // colors: ["#FF1654", "#247BA0", "#70C1B3"], // Colors of the points
    // strokeColors: "#fff", // Border color of the points
    strokeWidth: 2, // Border width of the points
    hover: {
      size: 8, // Size of the points on hover
    },
  },
  // fill: {
  //   type: "solid",
  // },
  // fill: {
  //   colors: ["#f2f4fa", "rgba(36, 123, 160, 0.4)"], // Area colors
  // },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: "",
    style: {
      fontSize: "18px",
      color: "#585858",
    },
  },
  subtitle: {
    text: "Results To Date",
  },
  grid: {
    show: true,
    borderColor: "#e7e7e7",
    strokeDashArray: 4, // Dash pattern for the background grid lines
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: "50%",
    },
  },
  yaxis: {
    min: 1,
    reversed: true,
    labels: {
      style: {
        colors: "#9b9b9b",
        fontSize: "14px",
      },
    },
  },
  colors: ["#5d87ff", "#00d4e3"],
  xaxis: {
    labels: {
      style: {
        colors: "#9b9b9b",
        fontSize: "14px",
      },
    },
  },
};
