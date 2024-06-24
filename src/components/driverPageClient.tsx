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
  useDarkMode();
  return (
    <main
      id="drivers-scrolled"
      className={`${darkMode ? "dark" : ""} w-full h-full flex flex-col items-center justify-start overflow-x-hidden pb-20 transition-colors duration-700 dark:bg-dark`}
    >
      <div className="max-w-6xl mt-20 w-full">
        <DriverSliderStats driverResults={driverResults} />
      </div>
      <div
        className={` w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6 
    
        ${sideBarOpen ? "max-[1425px]:flex-col " : "max-[1225px]:flex-col"}
      
      `}
      >
        <DriveRacePointsChat
          driverResults={driverResults}
          teamMateResults={teamMateResults}
        />
        <div
          className={` w-full  h-full flex flex-col items-center justify-between gap-6
    
          ${sideBarOpen ? "max-[900px]:flex-col max-[1425px]:flex-row max-[1425px]:w-[calc(100%-275px)]" : "max-[700px]:flex-col max-[1225px]:flex-row max-[1225px]:w-[calc(100%-60px)]"}
        
        `}
        >
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
