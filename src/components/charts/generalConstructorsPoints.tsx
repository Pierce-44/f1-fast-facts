"use client";
import { DriverResults } from "@/util/fetchDriverRaceResults";
import { formatString } from "@/util/formateRaceName";
// components/MyChart.js
import dynamic from "next/dynamic";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import { ConstructorRacePoints } from "@/util/handleGeneralPageStats";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function GeneralConstructorsPoints({
  constructorChampionshipPoints,
}: {
  constructorChampionshipPoints: ConstructorRacePoints[];
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const [showSum, setShowSum] = React.useState(true);

  const seriesSum: any[] = [];
  const series: any[] = [];

  constructorChampionshipPoints.forEach((team) => {
    let sum = 0;

    const teamDataSum = {
      name: `${team.teamName}`,
      data: [] as { x: string; y: number }[],
    };
    const teamData = {
      name: `${team.teamName}`,
      data: [] as { x: string; y: number }[],
    };

    team.races.forEach((race) => {
      teamDataSum.data.push({
        x: formatString(race.raceName),
        y: sum + Number(race.points),
      });

      teamData.data.push({
        x: formatString(race.raceName),
        y: Number(race.points),
      });

      sum = sum + Number(race.points);
    });

    seriesSum.push(teamDataSum);
    series.push(teamData);
  });

  const options = {
    chart: {
      id: "general-race-points-constructors",
    },
    stroke: {
      curve: "straight",
    },
    colors: [
      "#FF5733",
      "#33FF57",
      "#FF3333",
      "#FF33A1",
      "#A133FF",
      "#33FFF6",
      "#F6FF33",
      "#FFA133",
      "#3357FF",
      "#33FFA5",
    ],
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
      text: "Points To Date",
      style: {
        fontSize: "12px",
        color: darkMode ? "#7c7c7c" : "#7c7c7c",
      },
    },
    grid: {
      show: true,
      borderColor: "#e7e7e7",
      strokeDashArray: 4, // Dash pattern for the background grid lines
      padding: {
        bottom: 40, // Adjust this value as needed for padding
      },
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
    // colors: ["#5d87ff", "#00d4e3"],
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

  options.title.text = `Team Constructors Points`;

  return (
    <div
      className={` rounded-md shadow-mine p-4 pb-10 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500
  
    `}
    >
      <div className="w-full h-[750px] relative">
        <Chart
          className="bg-white dark:bg-dark transition-colors duration-700"
          options={options as any}
          series={showSum ? seriesSum : series}
          type="line"
          height="100%"
          width="100%"
        />
        <div className="absolute h-full w-full bg-slate-100 dark:bg-dark animate-pulse top-0 left-0 -z-10 rounded-lg"></div>
      </div>
      <button
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-8 hover:bg-[#3e66d3] transition-all text-wrap"
        onClick={() => {
          setShowSum(!showSum);
        }}
      >
        {showSum ? "Points Per Race" : "Points Summed"}
      </button>
      <button
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-8 hover:bg-[#3e66d3] transition-all text-wrap"
        onClick={() => {
          const chart = ApexCharts.getChartByID(
            "general-race-points-constructors"
          );
          constructorChampionshipPoints.forEach((team) => {
            chart?.hideSeries(team?.teamName || "");
          });
        }}
      >
        Hide All
      </button>
      <button
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-8 hover:bg-[#3e66d3] transition-all text-wrap"
        onClick={() => {
          const chart = ApexCharts.getChartByID(
            "general-race-points-constructors"
          );
          constructorChampionshipPoints.forEach((team) => {
            chart?.showSeries(team?.teamName || "");
          });
        }}
      >
        Show All
      </button>
    </div>
  );
}
