import { QualyResults } from "@/util/fetchDriverQualyResults";
import React from "react";

export default function useDriverQualyVsTeamMate({
  driverQaulyResults,
  teamMateQaulyResults,
}: {
  driverQaulyResults: QualyResults | null;
  teamMateQaulyResults: QualyResults | null;
}) {
  const driverName =
    driverQaulyResults?.races[0].qualifyingResults[0].driver.familyName || "";
  const teamMateName =
    teamMateQaulyResults?.races[0].qualifyingResults[0].driver.familyName || "";

  const { driverTotal, teamMateTotal } = React.useMemo(() => {
    let driverTotal = 0;
    let teamMateTotal = 0;

    driverQaulyResults?.races.forEach((race, index) => {
      const driverPosition = race.qualifyingResults[0].position;

      if (!teamMateQaulyResults?.races[index]) return;

      const teamMatePosition =
        teamMateQaulyResults?.races[index].qualifyingResults[0].position;

      if (Number(driverPosition) < Number(teamMatePosition)) {
        driverTotal = driverTotal + 1;
      } else if (Number(driverPosition) > Number(teamMatePosition)) {
        teamMateTotal = teamMateTotal + 1;
      }
    });

    return {
      driverTotal,
      teamMateTotal,
    };
  }, [driverQaulyResults, teamMateQaulyResults]);

  const series = [driverTotal, teamMateTotal];

  const options = {
    labels: [driverName, teamMateName],
    colors: ["#5d87ff", "#00d4e3"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Disable legends
    },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
        },
      },
    },
    stroke: {
      show: false,
    },
  };

  const driverData = {
    teamMateTotal,
    driverTotal,
    driverName,
    teamMateName,
  };

  return {
    series,
    options,
    driverData,
  };
}
