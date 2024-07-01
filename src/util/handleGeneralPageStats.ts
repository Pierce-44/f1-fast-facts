import { GeneralResults } from "@/util/fetchGeneralResults";
import React from "react";
import { Calendar } from "./fetchRaceCalendar";
import calculateAge from "./calculateAge";

export type driversInfo = {
  driverId: string | undefined;
  driverTeam: string | undefined;
  driverFamilyName: string;
  driverFirstName: string;
  totalPoints: number;
  lastRacePosition: number;
  lastQualyPosition: number;
}[];

export type ConstructorRacePoints = {
  teamName: string;
  races: {
    raceName: string;
    points: number;
  }[];
};

interface Props {
  raceCalendar: Calendar[] | null;
  generalResults: GeneralResults;
}

export default function handleGeneralPageStats({
  raceCalendar,
  generalResults,
}: Props) {
  const driversInfo: driversInfo = [];

  const constructorChampionshipPoints: ConstructorRacePoints[] = [];

  generalResults.driverRaceResults.map((driver, index) => {
    if (!driver) return;

    driver[0]?.driverId;

    const totalPoints = driver[0]?.races.reduce(
      (previousValue, race) =>
        Number(previousValue) + Number(race.results[0].points),
      0
    );

    const driverQualy = generalResults.driverQualifyingResults[index];
    const driverQualyInfo = driverQualy && driverQualy[0];

    driversInfo.push({
      driverId: driver[0]?.driverId,
      driverTeam: driver[0]?.races[0].results[0].constructor.name,
      driverFamilyName: driver[0]?.races[0].results[0].driver.familyName || "",
      driverFirstName: driver[0]?.races[0].results[0].driver.givenName || "",
      totalPoints: totalPoints || 0,
      lastRacePosition:
        Number(
          driver[0]?.races[driver[0]?.races.length - 1].results[0].position
        ) || 22,
      lastQualyPosition:
        Number(
          driverQualyInfo?.races[driverQualyInfo?.races.length - 1]
            .qualifyingResults[0].position
        ) || 22,
    });

    const teamName = driver[0]?.races[0].results[0].constructor.name || "";

    if (
      constructorChampionshipPoints.some(
        (element: { teamName: string }) => element.teamName === teamName
      )
    ) {
      const teamObject = constructorChampionshipPoints.filter(
        (team) => team.teamName === teamName
      );

      driver[0]?.races.forEach((race, index) => {
        const thisRaceName = race.circuit.circuitId;

        const filterRace = teamObject[0].races.filter(
          (r) => r.raceName === thisRaceName
        );

        if (filterRace[0]) {
          filterRace[0].points =
            Number(filterRace[0].points) + Number(race.results[0].points);
        } else {
          teamObject[0].races.push({
            raceName: race.circuit.circuitId,
            points: Number(race.results[0].points),
          });
        }
      });
    } else {
      const teamObject = {
        teamName: driver[0]?.races[0].results[0].constructor.name || "",
        races: [] as any,
      };

      driver[0]?.races.forEach((race) => {
        teamObject.races.push({
          raceName: race.circuit.circuitId,
          points: Number(race.results[0].points),
        });
      });

      constructorChampionshipPoints.push(teamObject);
    }
  });

  const championshipLeader = driversInfo.reduce(
    (previousValue, currentValue) => {
      return Number(currentValue.totalPoints) >
        Number(previousValue.totalPoints)
        ? currentValue
        : previousValue;
    },
    driversInfo[0]
  );

  const lastRaceWinner = driversInfo.reduce((previousValue, currentValue) => {
    return Number(currentValue.lastRacePosition) <
      Number(previousValue.lastRacePosition)
      ? currentValue
      : previousValue;
  }, driversInfo[0]);

  const lastQualyWinner = driversInfo.reduce((previousValue, currentValue) => {
    return Number(currentValue.lastQualyPosition) <
      Number(previousValue.lastQualyPosition)
      ? currentValue
      : previousValue;
  }, driversInfo[0]);

  const nextRace = raceCalendar?.filter((race) => {
    const raceDate = new Date(`${race.date}T${race.time}`);
    return raceDate > new Date();
  })[0];

  const thisRaceIndex = raceCalendar?.findIndex((race) => {
    const raceDate = new Date(`${race.date}T${race.time}`);
    return raceDate > new Date();
  });

  const numberOfRaces = raceCalendar?.length;

  const driverRaceResultsFiltered = generalResults.driverRaceResults.filter(
    (driver) => driver && driver[0]?.driverId !== "bearman"
  );

  const sumOfDriversAge = driverRaceResultsFiltered.reduce(
    (previousValue, currentValue) => {
      const dateOfBirth =
        currentValue![0]?.races[0].results[0].driver.dateOfBirth || "";
      const driverAge = calculateAge(dateOfBirth);
      return driverAge + previousValue;
    },
    0
  );

  const averageDriverAge = sumOfDriversAge / driverRaceResultsFiltered.length;

  let oldestDriverName = "";

  const oldestDriverAge = driverRaceResultsFiltered.reduce(
    (previousValue, currentValue) => {
      const dateOfBirth =
        currentValue![0]?.races[0].results[0].driver.dateOfBirth || "";
      const driverAge = calculateAge(dateOfBirth);

      if (driverAge > previousValue) {
        oldestDriverName =
          currentValue![0]?.races[0].results[0].driver.familyName || "";
      }

      return driverAge > previousValue ? driverAge : previousValue;
    },
    0
  );

  let youngestDriverName = "";

  const youngestDriverAge = driverRaceResultsFiltered.reduce(
    (previousValue, currentValue) => {
      const dateOfBirth =
        currentValue![0]?.races[0].results[0].driver.dateOfBirth || "";
      const driverAge = calculateAge(dateOfBirth);

      if (driverAge < previousValue) {
        youngestDriverName =
          currentValue![0]?.races[0].results[0].driver.familyName || "";
      }

      return driverAge < previousValue ? driverAge : previousValue;
    },
    100
  );

  // next race
  // average age
  // number of races
  // number of drivers
  // oldest driver age
  // youngest driver age

  return {
    driversInfo,
    championshipLeader,
    lastRaceWinner,
    lastQualyWinner,
    constructorChampionshipPoints,
    nextRace,
    averageDriverAge,
    thisRaceIndex,
    numberOfRaces,
    oldestDriverAge,
    oldestDriverName,
    youngestDriverAge,
    youngestDriverName,
  };
}
