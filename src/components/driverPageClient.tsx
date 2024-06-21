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
  const [darkMode] = useAtom(atoms.darkMode);

  return (
    <main
      id="page-scrolled"
      className={`${darkMode ? "dark" : ""} w-full h-full flex flex-col items-center justify-start overflow-x-hidden pb-20 transition-colors duration-700 dark:bg-dark`}
    >
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
