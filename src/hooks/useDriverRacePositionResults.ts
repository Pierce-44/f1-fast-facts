import { DriverResults } from "@/util/fetchDriverRaceResults";
import { formatString } from "@/util/formateRaceName";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

export default function useDriverRacePositionResults({
  driverResults,
  teamMateResults,
}: {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const driverGivenName = driverResults?.races[0].results[0].driver.givenName;
  const driverFamilyName = driverResults?.races[0].results[0].driver.familyName;
  const teamMateFamilyName =
    teamMateResults?.races[0].results[0].driver.familyName;

  const { series, seriesCombined } = React.useMemo(() => {
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

    return { series, seriesCombined };
  }, [driverResults, teamMateResults]);

  const options = {
    chart: {
      id: "basic-bar",
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 5,
      strokeWidth: 1,
      hover: {
        size: 8,
      },
    },
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
      strokeDashArray: 4,
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

  return {
    options,
    series,
    seriesCombined,
  };
}
