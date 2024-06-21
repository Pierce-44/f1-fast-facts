"use client";
import { DriverResults } from "@/util/fetchDriverRaceResults";
// components/MyChart.js
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DriveRacePointsChat({
  driverResults,
  teamMateResults,
}: {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}) {
  const [showTeamMate, setShowTeamMate] = React.useState(false);

  const driverGivenName = driverResults?.races[0].results[0].driver.givenName;
  const driverFamilyName = driverResults?.races[0].results[0].driver.familyName;
  const teamMateFamilyName =
    teamMateResults?.races[0].results[0].driver.familyName;

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

  let driverPointsAcc = 0;
  let teamMatePointsAcc = 0;

  driverResults?.races.forEach((result) => {
    const points = Number(result.results[0].points);
    // const location = result.Circuit.circuitId;
    const location = "";
    series[0].data.push({
      x: location,
      y: driverPointsAcc + points,
    });

    seriesCombined[0].data.push({
      x: location,
      y: driverPointsAcc + points,
    });

    driverPointsAcc = driverPointsAcc + points;
  });

  teamMateResults?.races.forEach((result) => {
    const points = Number(result.results[0].points);
    // const location = result.Circuit.circuitId;
    const location = "";
    seriesCombined[1].data.push({
      x: location,
      y: teamMatePointsAcc + points,
    });

    teamMatePointsAcc = teamMatePointsAcc + points;
  });

  options.title.text = `Championship Points - ${driverGivenName} ${driverFamilyName}`;

  return (
    <div className="w-4/6 h-full shrink-0 rounded-md shadow-mine p-4 ">
      <div className="w-full h-[400px] relative">
        <Chart
          className="bg-white"
          options={options as any}
          series={showTeamMate ? seriesCombined : series}
          type="area"
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
        {showTeamMate ? "Without" : "With"} {teamMateFamilyName}
      </button>
    </div>
  );
}

const options = {
  chart: {
    id: "basic-bar",
  },
  stroke: {
    curve: "straight",
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
    text: "Points To Date",
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
