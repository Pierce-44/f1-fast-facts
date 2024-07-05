import { DriverResults } from "@/util/fetchDriverRaceResults";
import React from "react";
interface Props {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}

export default function useDriverRaceVsTeamMate({
  driverResults,
  teamMateResults,
}: Props) {
  const driverName = driverResults?.races[0].results[0].driver.familyName || "";
  const teamMateName =
    teamMateResults?.races[0].results[0].driver.familyName || "";

  const { series, driverTotal, teamMateTotal } = React.useMemo(() => {
    let driverTotal = 0;
    let teamMateTotal = 0;

    driverResults?.races.forEach((race, index) => {
      const driverPosition = race.results[0].position;

      if (!teamMateResults?.races[index]) return;

      const teamMatePosition =
        teamMateResults?.races[index].results[0].position;

      if (Number(driverPosition) < Number(teamMatePosition)) {
        driverTotal = driverTotal + 1;
      } else if (Number(driverPosition) > Number(teamMatePosition)) {
        teamMateTotal = teamMateTotal + 1;
      }
    });

    const series = [driverTotal, teamMateTotal];

    return {
      series,
      driverTotal,
      teamMateTotal,
    };
  }, [driverResults, teamMateResults]);

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
    driverName,
    teamMateName,
    driverTotal,
    teamMateTotal,
  };

  return {
    series,
    driverData,
    options,
  };
}
