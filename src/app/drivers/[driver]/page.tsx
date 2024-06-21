import DriveQualyResultsChat from "@/components/charts/driverQualyResults";
import DriverPointsVsTeamMate from "@/components/charts/driverPointsVsTeamMate";
import DriveRacePointsChat from "@/components/charts/driverRacePoints";
import DriverRaceVsTeamMate from "@/components/charts/driverRaceVsTeamMate";
import DriverSliderStats from "@/components/driverSliderStats";
import { fetchDriverQualyResults } from "@/util/fetchDriverQualyResults";
import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";
import { fetchTeamData } from "@/util/fetchTeamData";
import DriverQualyVsTeamMate from "@/components/charts/driverQualyVsTeamMate";
import DriverBestQualy from "@/components/driverBestQualy";
import DriverBestRace from "@/components/driverBestRace";
import DriveRacePositionResults from "@/components/charts/driverRacePositionResults";

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
    (driver) => driver.givenName !== driverName
  )[0];

  const teamMateResults = await fetchDriverRaceResults(teamMate.driverId);
  const teamMateQaulyResults = await fetchDriverQualyResults(teamMate.driverId);

  return (
    <main className="w-full h-full flex flex-col items-center justify-start overflow-x-hidden pb-20">
      <div className="max-w-6xl mt-16 w-full">
        <DriverSliderStats driverResults={driverResults} />
      </div>
      <div className=" w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6">
        <DriveRacePointsChat
          driverResults={driverResults}
          teamMateResults={teamMateResults}
        />
        <div className="w-full h-full flex flex-col items-center justify-between gap-6">
          <DriverRaceVsTeamMate
            driverResults={driverResults}
            teamMateResults={teamMateResults}
          />
          <DriverPointsVsTeamMate
            driverResults={driverResults}
            teamMateResults={teamMateResults}
          />
        </div>
      </div>
      <div className=" w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6 flex-row-reverse">
        <DriveRacePositionResults
          driverResults={driverResults}
          teamMateResults={teamMateResults}
        />
        <div className="w-full h-full flex flex-col items-center justify-between gap-6">
          <DriverBestRace />
          {/* <DriverQualyVsTeamMate
            driverQaulyResults={driverQaulyResults}
            teamMateQaulyResults={teamMateQaulyResults}
          /> */}
        </div>
      </div>
      <div className=" w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6">
        <DriveQualyResultsChat
          driverQaulyResults={driverQaulyResults}
          teamMateQaulyResults={teamMateQaulyResults}
        />
        <div className="w-full h-full flex flex-col items-center justify-between gap-6">
          <DriverQualyVsTeamMate
            driverQaulyResults={driverQaulyResults}
            teamMateQaulyResults={teamMateQaulyResults}
          />
          <DriverBestQualy />
        </div>
      </div>
    </main>
  );
}
