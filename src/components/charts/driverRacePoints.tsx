"use client";
import { DriverResults } from "@/interfaces/interfaces";
// components/MyChart.js
import dynamic from "next/dynamic";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DriveRacePointsChat({
  driverResults,
}: {
  driverResults: DriverResults | null;
}) {
  const series = [
    {
      name: "Points To Date",
      data: [] as { x: string; y: number }[],
    },
  ];

  let pointsAcc = 0;

  driverResults?.results.forEach((result) => {
    const points = Number(result.Results[0].points);
    const location = result.Circuit.circuitId;

    series[0].data.push({
      x: location,
      y: pointsAcc + points,
    });

    pointsAcc = pointsAcc + points;
  });

  const driverGivenName = driverResults?.results[0].Results[0].Driver.givenName;
  const driverFamilyName =
    driverResults?.results[0].Results[0].Driver.familyName;

  options.title.text = `Championship Points - ${driverGivenName} ${driverFamilyName}`;

  return (
    <div className="w-4/6 h-full shrink-0 rounded-md shadow-mine p-4 ">
      <Chart
        options={options}
        series={series}
        type="bar"
        height="100%"
        width="100%"
      />
    </div>
  );
}

const options = {
  chart: {
    id: "basic-bar",
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
  colors: ["#5d87ff", "#247BA0", "#70C1B3"],
  xaxis: {
    labels: {
      style: {
        colors: "#9b9b9b",
        fontSize: "14px",
      },
    },
  },
};
