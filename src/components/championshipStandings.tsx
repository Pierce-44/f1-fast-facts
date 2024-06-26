import { GeneralResults } from "@/util/fetchGeneralResults";

interface Props {
  driversInfo: {
    driverFamilyName: string;
    driverFirstName: string;
    totalPoints: number;
    lastRacePosition: number;
    lastQualyPosition: number;
  }[];
}

export default function ChampionshipStandings({ driversInfo }: Props) {
  const standings = driversInfo.sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="w-full max-h-[880px] overflow-y-scroll rounded-md shadow-mine p-4 pb-10 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500">
      <div className="">
        <p className="font-bold text-gray-600 text-lg pb-2 pl-2 dark:text-white">
          Championship Standings
        </p>
        <p className=" text-gray-500 text-xs pl-2 pb-2 dark:text-gray-400 font-semibold">
          Points To Date
        </p>
      </div>

      <ol className=" divide-y dark:divide-gray-600 transition-colors duration-500">
        {standings.map((driver, index) => {
          return (
            <li key={index} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <p className="text-white bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                  {index + 1}
                </p>
                <p className="font-semibold text-gray-500 dark:text-gray-400">
                  {driver.driverFamilyName}
                </p>
              </div>

              <p className="font-semibold text-gray-500 dark:text-gray-400">
                {driver.totalPoints}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
