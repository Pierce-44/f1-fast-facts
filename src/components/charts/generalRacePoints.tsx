"use client";
import { DriverResults } from "@/util/fetchDriverRaceResults";
import dynamic from "next/dynamic";
import React from "react";

import useGeneralRacePoints from "@/hooks/useGeneralRacePoints";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function GeneralRacePointsChat({
  driverResults,
}: {
  driverResults: (DriverResults[] | null)[];
}) {
  const [showSum, setShowSum] = React.useState(true);

  const { options, series, seriesSum } = useGeneralRacePoints({
    driverResults,
  });
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
            if (driver![0]?.driverId === "bearman") return;

            const driverFamilyName =
              driver![0]?.races[0].results[0].driver.familyName || "";
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
            if (driver![0]?.driverId === "bearman") return;

            const driverFamilyName =
              driver![0]?.races[0].results[0].driver.familyName || "";
            chart?.showSeries(driverFamilyName);
          });
        }}
      >
        Show All
      </button>
    </div>
  );
}
