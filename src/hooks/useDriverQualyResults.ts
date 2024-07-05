import { QualyResults } from "@/util/fetchDriverQualyResults";
import { formatString } from "@/util/formateRaceName";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

export default function useDriverQualyResults({
  driverQaulyResults,
  teamMateQaulyResults,
}: {
  driverQaulyResults: QualyResults | null;
  teamMateQaulyResults: QualyResults | null;
}) {
  const [darkMode] = useAtom(atoms.darkMode);

  const driverGivenName =
    driverQaulyResults?.races[0].qualifyingResults[0].driver.givenName;
  const driverFamilyName =
    driverQaulyResults?.races[0].qualifyingResults[0].driver.familyName;
  const teamMateFamilyName =
    teamMateQaulyResults?.races[0].qualifyingResults[0].driver.familyName;

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

    driverQaulyResults?.races.forEach((result) => {
      const position = Number(result.qualifyingResults[0].position);
      const location = result.circuit.circuitId;

      series[0].data.push({
        x: formatString(location),
        y: position,
      });

      seriesCombined[0].data.push({
        x: formatString(location),
        y: position,
      });
    });

    teamMateQaulyResults?.races.forEach((result) => {
      const position = Number(result.qualifyingResults[0].position);
      const location = result.circuit.circuitId;

      seriesCombined[1].data.push({
        x: formatString(location),
        y: position,
      });
    });

    return { series, seriesCombined };
  }, [driverQaulyResults, teamMateQaulyResults]);

  const graphOptions = {
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

  graphOptions.title.text = `Qualifying Results - ${driverGivenName} ${driverFamilyName}`;

  return {
    graphOptions,
    series,
    seriesCombined,
  };
}
