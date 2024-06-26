import { GeneralStats } from "@/interfaces/interfaces";
import Image from "next/image";

interface Props {
  stats: GeneralStats;
}

export default function GeneralPageHeaderStats({ stats }: Props) {
  return (
    <div className="bg-[#ebf3fe] pl-8 py-4 lg:py-0 rounded-md flex items-center justify-between dark:bg-darkOffset transition-all duration-700">
      <div className="space-y-4">
        <div className="sm:flex justify-start items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`fill-[#5d87ff] h-10 w-10 shrink-0 hidden sm:block`}
          >
            <path d="M480-120q-96.15 0-175.81-45.92-79.65-45.93-127.73-121.46l144-144.77 120 100 212.62-212.62v133.23h40v-201.54H491.54v40h131.69L439.54-387.85l-120-100-164.31 163.54q-17-35.69-26.11-74.92Q120-438.46 120-480q0-74.7 28.34-140.4t76.92-114.3q48.58-48.6 114.26-76.95Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.35 140.41-28.35 65.73-76.95 114.36-48.6 48.63-114.3 76.99Q554.7-120 480-120Z" />
          </svg>
          <p className="dark:text-white text-sm font-bold lg:text-lg text-gray-700">
            Championship leader:
          </p>
          <p className="text-xs lg:text-base text-[#5d87ff] font-semibold ">{`${stats.championshipLeader?.driverFirstName || ""} ${stats.championshipLeader?.driverFamilyName || ""}`}</p>
        </div>
        <div className="sm:flex justify-start items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`fill-[#5d87ff] h-10 w-10 shrink-0 hidden sm:block`}
          >
            <path d="M320-240h60v-200h100l40 80h200v-240H600l-40-80H320v440ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
          <p className="dark:text-white text-sm font-bold lg:text-lg text-gray-700">
            Last Race Winner:
          </p>
          <p className="text-xs lg:text-base text-[#5d87ff] font-semibold ">{`${stats.lastRaceWinner?.driverFirstName || ""} ${stats.lastRaceWinner?.driverFamilyName || ""}`}</p>
        </div>
        <div className="sm:flex justify-start items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className={`fill-[#5d87ff] h-10 w-10 shrink-0 hidden sm:block`}
          >
            <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Z" />
          </svg>
          <p className="dark:text-white text-sm font-bold lg:text-lg text-gray-700">
            Last Race Pole:
          </p>
          <p className="text-xs lg:text-base text-[#5d87ff] font-semibold ">{`${stats.lastQualyWinner?.driverFirstName || ""} ${stats.lastQualyWinner?.driverFamilyName || ""}`}</p>
        </div>
      </div>

      <div className="relative h-[150px] w-[100px] max-[370px]:hidden sm:h-[200px] sm:w-[140px] shrink-0 lg:h-[200px] lg:w-[200px]">
        <Image
          className="py-5 object-cover"
          src="/trophyCartoon.png"
          alt="f1 wheel"
          fill
        />
      </div>
    </div>
  );
}
