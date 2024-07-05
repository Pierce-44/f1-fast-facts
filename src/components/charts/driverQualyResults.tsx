"use client";
import { QualyResults } from "@/util/fetchDriverQualyResults";
import dynamic from "next/dynamic";
import React from "react";
import useDriverQualyResults from "@/hooks/useDriverQualyResults";

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

  const { graphOptions, series, seriesCombined } = useDriverQualyResults({
    driverQaulyResults,
    teamMateQaulyResults,
  });

  return (
    <div className="h-full min-w-[400px] max-[1090px]:min-w-min shrink-0 rounded-md shadow-mine p-4 flex flex-col items-start gap-10 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500">
      <div className="w-full h-[400px] relative">
        <Chart
          className="bg-white dark:bg-dark transition-colors duration-700"
          options={graphOptions as any}
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
