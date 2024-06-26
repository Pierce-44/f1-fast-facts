"use client";

import { GeneralResults } from "@/util/fetchGeneralResults";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import { Calendar } from "@/util/fetchRaceCalendar";
import GeneralPageSlider from "./generalPageSlider";
import GeneralPageHeaderStats from "./generalPageHeaderStats";
import GeneralRacePointsChat from "./charts/generalRacePoints";
import ChampionshipStandings from "./championshipStandings";
import handleGeneralPageStats from "@/util/handleGeneralPageStats";
import { GeneralStats } from "@/interfaces/interfaces";
import GeneralConstructorsPoints from "./charts/generalConstructorsPoints";
import useDarkMode from "@/hooks/useDarkMode";
import ConstructorsStandings from "./constructorsStandings";

interface Props {
  generalResults: GeneralResults;
  raceCalendar: Calendar[] | null;
  stats: GeneralStats;
}

export default function GeneralPageClient({
  generalResults,
  raceCalendar,
  stats,
}: Props) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [sideBarOpen] = useAtom(atoms.sideBarOpen);

  useDarkMode();

  return (
    <div
      className={`${darkMode ? "dark" : ""} h-full  pb-20 transition-colors duration-700  overflow-y-scroll
      
    ${sideBarOpen ? "w-[calc(100vw-275px)]" : "w-[calc(100vw-65px)]"}

    max-[800px]:!w-full
    `}
      id="general-scrolled"
    >
      <div className="fixed top-0 left-0 w-[150vw] h-[150vh] bg-white dark:bg-dark -z-50 transition-colors duration-700"></div>

      <div className="px-2 sm:px-10">
        <div className="max-w-[1330px] mx-auto pt-24 ">
          <div className="space-y-8 ">
            <GeneralPageHeaderStats stats={stats} />

            <div className={``}>
              <GeneralPageSlider
                driverResults={generalResults.driverRaceResults[0]}
              />
            </div>
            <div
              className={`${sideBarOpen ? "max-[1200px]:!flex-col" : "max-[960px]:!flex-col"} flex flex-col gap-6 h-full min-[800px]:flex-row`}
            >
              <div className="flex-grow">
                <GeneralRacePointsChat
                  driverResults={generalResults.driverRaceResults}
                />
              </div>
              <div
                className={`${sideBarOpen ? "max-[1200px]:!w-full" : "max-[960px]:!w-full"} w-[350px] max-[800px]:w-full`}
              >
                <ChampionshipStandings driversInfo={stats.driversInfo} />
              </div>
            </div>

            <div
              className={`${sideBarOpen ? "max-[1200px]:!flex-col-reverse" : "max-[960px]:!flex-col-reverse"} flex flex-col gap-6 h-full min-[800px]:flex-row`}
            >
              <div
                className={`${sideBarOpen ? "max-[1200px]:!w-full" : "max-[960px]:!w-full"} w-[350px] max-[800px]:w-full`}
              >
                <ConstructorsStandings
                  constructorChampionshipPoints={
                    stats.constructorChampionshipPoints
                  }
                />
              </div>
              <div className="flex-grow">
                <GeneralConstructorsPoints
                  constructorChampionshipPoints={
                    stats.constructorChampionshipPoints
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
