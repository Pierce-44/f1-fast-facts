"use client";
import { DriverResults } from "@/util/fetchDriverRaceResults";
import { formatString } from "@/util/formateRaceName";
// components/MyChart.js
import dynamic from "next/dynamic";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DriveRacePositionResults({
  driverResults,
  teamMateResults,
}: {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}) {
  const [darkMode] = useAtom(atoms.darkMode);

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

  // had to do this for the case where a driver missed a race
  const raceArray =
    (driverResults?.races.length! > teamMateResults?.races.length!
      ? driverResults?.races
      : teamMateResults?.races) || [];

  raceArray.forEach((nothing, index) => {
    const result = driverResults?.races[index];

    const position = Number(result?.results[0].position || 0);
    const location = result?.circuit.circuitId || "";

    series[0].data.push({
      x: formatString(location),
      y: position,
    });

    seriesCombined[0].data.push({
      x: formatString(location),
      y: position,
    });
  });

  raceArray?.forEach((nothing, index) => {
    const result = teamMateResults?.races[index];

    const position = Number(result?.results[0].position || 0);
    const location = result?.circuit.circuitId || "";

    seriesCombined[1].data.push({
      x: formatString(location),
      y: position,
    });
  });

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
      strokeWidth: 1, // Border width of the points
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
        color: darkMode ? "#ffffff" : "#585858",
      },
    },
    subtitle: {
      text: "Results To Date",
      style: {
        fontSize: "12px",
        color: darkMode ? "#7c7c7c" : "#7c7c7c",
      },
    },
    grid: {
      show: true,
      borderColor: darkMode ? "#4e4e4e" : "#e7e7e7",
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
    legend: {
      labels: {
        colors: darkMode ? "#7c7c7c" : "#7c7c7c",
      },
    },
  };

  options.title.text = `Race Results - ${driverGivenName} ${driverFamilyName}`;

  return (
    <div className="h-full min-w-[400px] max-[1090px]:min-w-min shrink-0 rounded-md shadow-mine p-4 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500">
      <div className="w-full h-[400px] relative">
        <Chart
          className="bg-white dark:bg-dark transition-colors duration-700"
          options={options as any}
          series={showTeamMate ? seriesCombined : series}
          type="line"
          height="100%"
          width="100%"
          curve="straight"
        />
        <div className="absolute h-full w-full bg-slate-100 dark:bg-dark animate-pulse top-0 left-0 -z-10 rounded-lg"></div>
      </div>
      <button
        onClick={() => {
          setShowTeamMate(!showTeamMate);
        }}
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-4 hover:bg-[#3e66d3] transition-all"
      >
        {showTeamMate ? "Without Teammate" : "With Teammate"}
      </button>
    </div>
  );
}
