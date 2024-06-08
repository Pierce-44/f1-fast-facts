"use client";
// components/MyChart.js
import dynamic from "next/dynamic";

// Dynamically import the chart component
const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function DriveRacePointsChat() {
  const series = [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];
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
    text: "Championship Points",
    style: {
      fontSize: "18px",
      color: "#585858",
    },
  },
  subtitle: {
    text: "Points To Date",
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
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    labels: {
      style: {
        colors: "#9b9b9b",
        fontSize: "14px",
      },
    },
  },
};
