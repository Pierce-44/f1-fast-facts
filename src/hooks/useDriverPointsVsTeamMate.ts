import { DriverResults } from "@/util/fetchDriverRaceResults";

interface Props {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
}

export default function useDriverPointsVsTeamMate({
  driverResults,
  teamMateResults,
}: Props) {
  const driverName = driverResults?.races[0].results[0].driver.familyName || "";
  const teamMateName =
    teamMateResults?.races[0].results[0].driver.familyName || "";

  let driverTotal = 0;
  let teamMateTotal = 0;

  driverResults?.races.forEach((race, index) => {
    const driverPoints = race.results[0].points;

    if (!teamMateResults?.races[index]) return;

    const teamMatePoints = teamMateResults?.races[index].results[0].points;

    driverTotal = driverTotal + Number(driverPoints);
    teamMateTotal = teamMateTotal + Number(teamMatePoints);
  });

  const series = [driverTotal, teamMateTotal];

  const graphOptions = {
    labels: [driverName, teamMateName],
    colors: ["#5d87ff", "#00d4e3"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
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

  const data = {
    teamMateTotal,
    driverName,
    teamMateName,
    driverTotal,
  };

  return {
    series,
    graphOptions,
    data,
  };
}
