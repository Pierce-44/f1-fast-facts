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

  const driverResponse = await fetchDriverRaceResults(driverId);
  const driverResults = driverResponse && driverResponse[0];

  const driverQaulyResponse = await fetchDriverQualyResults(driverId);
  const driverQaulyResults = driverQaulyResponse && driverQaulyResponse[0];

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

  const teamMateResponse = await fetchDriverRaceResults(teamMate.driverId);
  const teamMateResults = teamMateResponse && teamMateResponse[0];

  const teamMateQaulyResponse = await fetchDriverQualyResults(
    teamMate.driverId
  );
  const teamMateQaulyResults =
    teamMateQaulyResponse && teamMateQaulyResponse[0];

  return (
    <DriverPageClient
      driverResults={driverResults}
      teamMateResults={teamMateResults}
      driverQaulyResults={driverQaulyResults}
      teamMateQaulyResults={teamMateQaulyResults}
    />
  );
}
