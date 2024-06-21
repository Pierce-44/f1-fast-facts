import DriverPageClient from "@/components/driverPageClient";
import { fetchDriverQualyResults } from "@/util/fetchDriverQualyResults";
import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";
import { fetchTeamData } from "@/util/fetchTeamData";

export default async function Driver({
  params,
}: {
  params: { driver: string };
}) {
  const driverId = params.driver.toLocaleLowerCase();

  const driverResults = await fetchDriverRaceResults(driverId);
  const driverQaulyResults = await fetchDriverQualyResults(driverId);

  const driverName = driverResults?.races[0].results[0].driver.givenName;
  const teamData = await fetchTeamData();

  const teamInfo =
    teamData?.filter(
      (team) =>
        team.constructorId ===
        driverResults?.races[0].results[0].constructor.constructorId
    ) || [];

  const teamMate = teamInfo[0].drivers.filter(
    (driver) => driver.givenName !== driverName && driver.givenName !== "Oliver"
  )[0];

  const teamMateResults = await fetchDriverRaceResults(teamMate.driverId);
  const teamMateQaulyResults = await fetchDriverQualyResults(teamMate.driverId);

  return (
    <DriverPageClient
      driverResults={driverResults}
      teamMateResults={teamMateResults}
      driverQaulyResults={driverQaulyResults}
      teamMateQaulyResults={teamMateQaulyResults}
    />
  );
}
