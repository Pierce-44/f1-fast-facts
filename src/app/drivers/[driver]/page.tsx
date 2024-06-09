import DriverQualyVsTeamMate from "@/components/charts/driverQualyVsTeamMate";
import DriveRacePointsChat from "@/components/charts/driverRacePoints";
import DriverRaceVsTeamMate from "@/components/charts/driverRaceVsTeamMate";
import DriverSliderStats from "@/components/driverSliderStats";
import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";
import { fetchTeamData } from "@/util/fetchTeamData";

export default async function Driver({
  params,
}: {
  params: { driver: string };
}) {
  const driverName = params.driver.toLocaleLowerCase();

  const driverResults = await fetchDriverRaceResults(driverName);

  const teamName =
    driverResults?.results[0].Results[0].Constructor.constructorId || "";

  const teamData = await fetchTeamData(teamName);

  const driverName1 = teamData.Drivers[0].driverId;
  const driverName2 = teamData.Drivers[1].driverId;
  const teamMateName = driverName1 === driverName ? driverName2 : driverName1;

  const teamMateResults = await fetchDriverRaceResults(teamMateName);

  return (
    <main className="w-full h-full flex flex-col items-center justify-start overflow-x-hidden">
      <div className="max-w-6xl mt-16 w-full">
        <DriverSliderStats driverResults={driverResults} />
      </div>
      <div className="h-[450px] w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6">
        <DriveRacePointsChat driverResults={driverResults} />
        <div className="w-full h-full flex flex-col items-center justify-between gap-6">
          <DriverRaceVsTeamMate
            driverResults={driverResults}
            teamMateResults={teamMateResults}
          />
          <DriverQualyVsTeamMate
            driverResults={driverResults}
            teamMateResults={teamMateResults}
          />
        </div>
      </div>
    </main>
  );
}
