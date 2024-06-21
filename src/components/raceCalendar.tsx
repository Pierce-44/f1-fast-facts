"use client";

import useScrolled from "@/hooks/useScrolled";
import { Calendar } from "@/util/fetchRaceCalendar";
import { getRandomColor } from "@/util/getRandomColour";
import Image from "next/image";
import React from "react";

const { getCode } = require("country-list");

interface Props {
  raceCalendar: Calendar[] | null;
}

export default function RaceCalendar({ raceCalendar }: Props) {
  // const scrolled = useScrolled();
  console.log("raceCalendar", raceCalendar);

  function handleCodeExceptions(country: string) {
    const code = getCode(country);

    if (country === "UK") {
      return "GB";
    } else if (country === "USA" || country === "United States") {
      return "US";
    } else if (country === "UAE") {
      return "AE";
    }

    return code;
  }
  return (
    <div className="flex items-start justify-center flex-wrap gap-10 pb-16">
      {raceCalendar?.map((race, index) => (
        <div
          key={index}
          className="group w-[300px] h-[350px] shadow-mine rounded-md p-5 flex flex-col justify-between transition-colors relative"
        >
          <div
            className="h-[40px] w-1 absolute left-0"
            style={{ background: getRandomColor() }}
          ></div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-500">
              Round: {index + 1}
            </p>
            {/* <p className="text-sm font-semibold text-gray-800">
              {race.Circuit.Location.country}
            </p> */}
            <p className="text-sm text-gray-500">{race.raceName}</p>
          </div>
          {/* <Image
            className="rounded-md shadow-mine bg-slate-200 mx-auto"
            width={150}
            height={66}
            // alt={race.Circuit.Location.country}
            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${handleCodeExceptions(race.Circuit.Location.country)}.svg`}
          /> */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <p className="text-xs font-semibold text-gray-700">Qualifying:</p>
              <p className="text-xs text-gray-600">
                {new Date(race.qualifying?.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-xs font-semibold text-gray-700">Race:</p>
              <p className="text-xs text-gray-600">
                {new Date(race?.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
