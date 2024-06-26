import { GeneralResults } from "@/util/fetchGeneralResults";
import { ConstructorRacePoints } from "@/util/handleGeneralPageStats";

export default function ConstructorsStandings({
  constructorChampionshipPoints,
}: {
  constructorChampionshipPoints: ConstructorRacePoints[];
}) {
  // const standings = driversInfo.sort((a, b) => b.totalPoints - a.totalPoints);

  const teamPointsArray: { teamName: string; points: number }[] = [];

  constructorChampionshipPoints.forEach((team) => {
    const teamPoints = team.races.reduce(
      (accumulator, race) => accumulator + Number(race.points),
      0
    );

    teamPointsArray.push({
      teamName: team.teamName,
      points: teamPoints,
    });
  });

  teamPointsArray.sort((a, b) => b.points - a.points);

  return (
    <div className="w-full max-h-[880px] overflow-y-scroll rounded-md shadow-mine p-4 pb-10 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500">
      <div>
        <p className="font-bold text-gray-600 text-lg pb-2 pl-2 dark:text-white">
          Constructors Standings
        </p>
        <p className=" text-gray-500 text-xs pl-2 pb-2 dark:text-gray-400 font-semibold">
          Points To Date
        </p>
      </div>

      <ol className=" divide-y dark:divide-gray-600 transition-colors duration-500">
        {teamPointsArray.map((team, index) => {
          return (
            <li key={index} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <p className="text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </p>
                <p className="font-semibold text-gray-500 dark:text-gray-400">
                  {team.teamName}
                </p>
              </div>

              <p className="font-semibold text-gray-500 dark:text-gray-400">
                {team.points}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
