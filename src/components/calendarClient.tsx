"use client";
import { Calendar } from "@/util/fetchRaceCalendar";
import RaceCalendar from "./raceCalendar";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import useDarkMode from "@/hooks/useDarkMode";

interface Props {
  raceCalendar: Calendar[] | null;
}

export default function CalendarClient({ raceCalendar }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);

  useDarkMode();

  return (
    <main
      className={`${darkMode ? "dark" : ""} w-full h-full p-10 pt-20 overflow-y-scroll dark:bg-dark transition-colors duration-700`}
      id="calendar-scrolled"
    >
      <div className="w-full h-full max-w-[1330px] mx-auto">
        <div className=" bg-[#ebf3fe] px-4 py-2 mb-8 rounded-md flex items-center justify-between dark:bg-darkOffset">
          <div className="pl-4">
            <p className="text-3xl text-gray-800 mb-2 dark:text-white max-md:text-lg">
              Calendar
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-md:text-xs">
              The Complete Formula 1 Race Calendar
            </p>
          </div>
          <div className="w-[145px] h-[145px] shrink-0 max-sm:w-[80px] max-sm:h-[80px]">
            <img className="object-cover" src="/newsIcon.png" />
          </div>
        </div>
        <RaceCalendar raceCalendar={raceCalendar} />
      </div>
    </main>
  );
}
