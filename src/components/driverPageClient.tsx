"use client";
import DriveQualyResultsChat from "@/components/charts/driverQualyResults";
import DriverPointsVsTeamMate from "@/components/charts/driverPointsVsTeamMate";
import DriveRacePointsChat from "@/components/charts/driverRacePoints";
import DriverRaceVsTeamMate from "@/components/charts/driverRaceVsTeamMate";
import DriverSliderStats from "@/components/driverSliderStats";
import DriverQualyVsTeamMate from "@/components/charts/driverQualyVsTeamMate";
import DriverBestQualy from "@/components/driverBestQualy";
import DriverBestRace from "@/components/driverBestRace";
import DriveRacePositionResults from "@/components/charts/driverRacePositionResults";
import { DriverResults } from "@/util/fetchDriverRaceResults";
import { QualyResults } from "@/util/fetchDriverQualyResults";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import useDarkMode from "@/hooks/useDarkMode";
import Image from "next/image";
import Link from "next/link";

interface Props {
  driverResults: DriverResults | null;
  teamMateResults: DriverResults | null;
  driverQaulyResults: QualyResults | null;
  teamMateQaulyResults: QualyResults | null;
}

export default function DriverPageClient({
  driverResults,
  teamMateResults,
  driverQaulyResults,
  teamMateQaulyResults,
}: Props) {
  const [sideBarOpen] = useAtom(atoms.sideBarOpen);
  const [darkMode] = useAtom(atoms.darkMode);
  const [sideBarHidden] = useAtom(atoms.sideBarHidden);
  useDarkMode();
  return (
    <main
      id="drivers-scrolled"
      className={`${darkMode ? "dark" : ""} h-full  pb-20 transition-colors duration-700  overflow-y-scroll
      
      ${sideBarOpen ? "w-[calc(100vw-275px)]" : "w-[calc(100vw-65px)]"}

      max-[800px]:!w-full
      `}
    >
      <div className="fixed top-0 left-0 w-[150vw] h-[150vh] bg-white dark:bg-dark -z-50 transition-colors duration-700"></div>
      <div className="max-w-7xl  mx-auto">
        <div className=" pt-20 flex flex-col sm:flex-row mr-4 overflow-hidden">
          <div className="flex flex-col justify-evenly items-center h-full px-10 py-4 shrink-0">
            <Link
              href={`/drivers/${driverResults?.driverId}`}
              className="group rounded-full overflow-hidden"
            >
              <Image
                className=" group-hover:scale-110 transition-all duration-300"
                width={100}
                height={100}
                src={`/imagesDrivers/${driverResults?.driverId}.webp`}
                alt=""
              ></Image>
            </Link>

            <p className="text-sm text-center pt-4 text-gray-700 font-semibold dark:text-white">
              {driverResults?.races[0].results[0].driver.givenName}{" "}
              {driverResults?.races[0].results[0].driver.familyName}
            </p>
          </div>
          <DriverSliderStats driverResults={driverResults} />
        </div>
        <div className={`px-4 pb-4 pt-6 flex gap-6 max-[1090px]:flex-col`}>
          <div className="flex-grow">
            <DriveRacePointsChat
              driverResults={driverResults}
              teamMateResults={teamMateResults}
            />
          </div>
          <div
            className={` flex flex-col items-center justify-evenly gap-6 w-[350px]  max-[1090px]:w-full
              ${sideBarOpen ? "max-[1000px]:flex-col max-[1090px]:flex-row " : "max-[1090px]:flex-row max-[700px]:flex-col "}
              `}
          >
            <div
              className={`w-full h-full max-[800px]:!max-w-[calc(50vw-32px)] max-[700px]:!max-w-[calc(100vw-32px)]
                ${sideBarOpen ? "" : "max-[1000px]:max-w-[calc(50vw-60px)]"}
              `}
            >
              <DriverRaceVsTeamMate
                driverResults={driverResults}
                teamMateResults={teamMateResults}
              />
            </div>
            <div
              className={`w-full h-full max-[800px]:!max-w-[calc(50vw-32px)] max-[700px]:!max-w-[calc(100vw-32px)]
                ${sideBarOpen ? "" : "max-[1000px]:max-w-[calc(50vw-60px)]"}
              `}
            >
              <DriverPointsVsTeamMate
                driverResults={driverResults}
                teamMateResults={teamMateResults}
              />
            </div>
          </div>
        </div>
        <div
          className={`px-4 pb-4 pt-6 flex gap-6 max-[1090px]:flex-col-reverse`}
        >
          <div className="w-[350px] shrink-0 max-[1090px]:w-full h-full flex flex-col items-center justify-between gap-6">
            <DriverBestRace driverResults={driverResults} />
          </div>
          <div className="flex-grow">
            <DriveRacePositionResults
              driverResults={driverResults}
              teamMateResults={teamMateResults}
            />
          </div>
        </div>
        <div className={`px-4 pb-4 pt-6 flex gap-6 max-[1090px]:flex-col`}>
          <div className="flex-grow">
            <DriveQualyResultsChat
              driverQaulyResults={driverQaulyResults}
              teamMateQaulyResults={teamMateQaulyResults}
            />
          </div>
          <div
            className={` flex flex-col items-center justify-evenly gap-6 w-[350px] max-[1090px]:w-full max-[1090px]:flex-row  
              ${sideBarOpen && !sideBarHidden ? "max-[1000px]:flex-col" : "max-[750px]:flex-col"}`}
          >
            <div className="w-full h-full">
              <DriverQualyVsTeamMate
                driverQaulyResults={driverQaulyResults}
                teamMateQaulyResults={teamMateQaulyResults}
              />
            </div>
            <div className="w-full h-full">
              <DriverBestQualy driverQaulyResults={driverQaulyResults} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
