"use client";
import { DriverResults } from "@/interfaces/interfaces";
import dynamic from "next/dynamic";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface Props {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}

export default function DriverQualyVsTeamMate({
  driverResults,
  teamMateResults,
}: Props) {
  const driverName =
    driverResults?.results[0].Results[0].Driver.familyName || "";
  const teamMateName =
    teamMateResults?.results[0].Results[0].Driver.familyName || "";

  let driverTotal = 0;
  let teamMateTotal = 0;

  driverResults?.results.forEach((race, index) => {
    const driverPoints = race.Results[0].points;
    const teamMatePoints = teamMateResults?.results[index].Results[0].points;

    driverTotal = driverTotal + Number(driverPoints);
    teamMateTotal = teamMateTotal + Number(teamMatePoints);
  });

  const series = [driverTotal, teamMateTotal];

  const options = {
    labels: [driverName, teamMateName],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className="w-full h-full rounded-md shadow-mine flex items-center justify-between text-gray-600">
      <div className="h-full w-1/2 flex flex-col justify-start gap-5 ml-2">
        <p className="pl-4 font-semibold pt-5">Points Head to Head</p>
        <div className="pl-4 space-y-4 text-gray-500">
          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={`fill-[#008ffb] h-8 w-8 ${teamMateTotal > driverTotal ? "rotate-180" : ""}`}
            >
              <path d="M480-120q-96.15 0-175.81-45.92-79.65-45.93-127.73-121.46l144-144.77 120 100 212.62-212.62v133.23h40v-201.54H491.54v40h131.69L439.54-387.85l-120-100-164.31 163.54q-17-35.69-26.11-74.92Q120-438.46 120-480q0-74.7 28.34-140.4t76.92-114.3q48.58-48.6 114.26-76.95Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.35 140.41-28.35 65.73-76.95 114.36-48.6 48.63-114.3 76.99Q554.7-120 480-120Z" />
            </svg>
            {`${driverName}: ${driverTotal}`}
          </p>
          <p className="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className={`fill-[#00e396] h-8 w-8 ${teamMateTotal < driverTotal ? "rotate-180" : ""}`}
            >
              <path d="M480-120q-96.15 0-175.81-45.92-79.65-45.93-127.73-121.46l144-144.77 120 100 212.62-212.62v133.23h40v-201.54H491.54v40h131.69L439.54-387.85l-120-100-164.31 163.54q-17-35.69-26.11-74.92Q120-438.46 120-480q0-74.7 28.34-140.4t76.92-114.3q48.58-48.6 114.26-76.95Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.35 140.41-28.35 65.73-76.95 114.36-48.6 48.63-114.3 76.99Q554.7-120 480-120Z" />
            </svg>
            {`${teamMateName}: ${teamMateTotal}`}
          </p>
        </div>
      </div>
      <div className="h-full w-1/2 pt-6">
        <Chart
          options={options}
          series={series}
          type="donut"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
