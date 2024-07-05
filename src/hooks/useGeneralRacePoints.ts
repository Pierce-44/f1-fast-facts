import { DriverResults } from "@/util/fetchDriverRaceResults";
import { formatString } from "@/util/formateRaceName";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

export default function useGeneralRacePoints({
  driverResults,
}: {
  driverResults: (DriverResults[] | null)[];
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const { seriesSum, series } = React.useMemo(() => {
    const seriesSum: any[] = [];
    const series: any[] = [];

    driverResults.forEach((driver, index) => {
      if (driver![0]?.driverId === "bearman") return;

      const driverFamilyName =
        driver![0]?.races[0].results[0].driver.familyName;

      const driverDataSum = {
        name: `${driverFamilyName}`,
        data: [] as { x: string; y: number }[],
      };
      const driverData = {
        name: `${driverFamilyName}`,
        data: [] as { x: string; y: number }[],
      };

      let pointsSum = 0;

      driver![0]?.races.forEach((race, index) => {
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

    return {
      seriesSum,
      series,
    };
  }, []);

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
      strokeDashArray: 4,
      padding: {
        bottom: 40,
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

  return {
    options,
    series,
    seriesSum,
  };
}
