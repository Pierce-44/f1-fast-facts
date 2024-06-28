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

export default function GeneralRacePointsChat({
  driverResults,
}: {
  driverResults: (DriverResults | null)[];
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const [showSum, setShowSum] = React.useState(true);

  const seriesSum: any[] = [];
  const series: any[] = [];

  driverResults.forEach((driver, index) => {
    // const result = driver?.races[0].;

    if (driver?.driverId === "bearman") return;

    const driverFamilyName = driver?.races[0].results[0].driver.familyName;

    // const points = Number(result?.results[0].points || 0);
    // const location = result?.circuit.circuitId || "";

    const driverDataSum = {
      name: `${driverFamilyName}`,
      data: [] as { x: string; y: number }[],
    };
    const driverData = {
      name: `${driverFamilyName}`,
      data: [] as { x: string; y: number }[],
    };

    let pointsSum = 0;

    driver?.races.forEach((race, index) => {
      const points = Number(race?.results[0].points || 0);
      const location = race?.circuit.circuitId || "";

      driverDataSum.data.push({
        x: formatString(location),
        y: pointsSum + points,
      });
      driverData.data.push({
        x: formatString(location),
        y: points,
      });

      pointsSum = pointsSum + points;
    });

    seriesSum.push(driverDataSum);
    series.push(driverData);
  });

  const options = {
    chart: {
      id: "general-race-points",
    },
    stroke: {
      curve: "straight",
    },
    colors: [
      "#FF33A1",

      "#A133FF",
      "#33FFF6",
      "#33A1FF",

      "#F6FF33",
      "#33FF80",

      "#33FFA5",
      "#A1FF33",
      "#3333FF",
      "#FF5733",

      "#FF33F6",
      "#8033FF",
      "#DA33FF",
      "#33FF57",

      "#FF3333",
      "#3357FF",

      "#33FFDA",
      "#A1FF33",

      "#F633FF",
      "#FFA133",

      "#FF8033",
      "#FFA533",
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

  options.title.text = `Driver Championship Points`;

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
          const chart = ApexCharts.getChartByID("general-race-points");
          driverResults.forEach((driver) => {
            if (driver?.driverId === "bearman") return;

            const driverFamilyName =
              driver?.races[0].results[0].driver.familyName || "";
            chart?.hideSeries(driverFamilyName);
          });
        }}
      >
        Hide All
      </button>
      <button
        className="bg-[#5d87ff] text-white rounded-md px-4 py-2 ml-10 mt-8 hover:bg-[#3e66d3] transition-all text-wrap"
        onClick={() => {
          const chart = ApexCharts.getChartByID("general-race-points");
          driverResults.forEach((driver) => {
            if (driver?.driverId === "bearman") return;

            const driverFamilyName =
              driver?.races[0].results[0].driver.familyName || "";
            chart?.showSeries(driverFamilyName);
          });
        }}
      >
        Show All
      </button>
    </div>
  );
}
