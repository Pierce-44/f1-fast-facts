import { driversInfo } from "@/util/handleGeneralPageStats";
import Image from "next/image";
import Link from "next/link";

interface Props {
  driversInfo: driversInfo;
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
        {standings
          .filter((driver) => driver.driverId !== "bearman")
          .map((driver, index) => {
            return (
              <li key={index} className="flex items-center justify-between p-6">
                <Link
                  href={`/drivers/${driver?.driverId}`}
                  className="group flex items-center gap-4"
                >
                  <div className=" rounded-full overflow-hidden">
                    <Image
                      className=" group-hover:scale-110 transition-all duration-300"
                      width={32}
                      height={32}
                      src={`/imagesDrivers/${driver?.driverId}.webp`}
                      alt=""
                    ></Image>
                  </div>
                  <p className="font-semibold text-gray-500 dark:text-gray-400">
                    {driver.driverFamilyName}
                  </p>
                </Link>

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
