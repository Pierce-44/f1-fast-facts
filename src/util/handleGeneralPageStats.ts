import { GeneralResults } from "@/util/fetchGeneralResults";
import React from "react";

type driversInfo = {
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

export default function handleGeneralPageStats(generalResults: GeneralResults) {
  const driversInfo: driversInfo = [];

  const constructorChampionshipPoints: ConstructorRacePoints[] = [];

  generalResults.driverRaceResults.map((driver, index) => {
    driver?.driverId;

    const totalPoints = driver?.races.reduce(
      (previousValue, race) =>
        Number(previousValue) + Number(race.results[0].points),
      0
    );

    const driverQualyInfo = generalResults.driverQualifyingResults[index];

    driversInfo.push({
      driverId: driver?.driverId,
      driverTeam: driver?.races[0].results[0].constructor.name,
      driverFamilyName: driver?.races[0].results[0].driver.familyName || "",
      driverFirstName: driver?.races[0].results[0].driver.givenName || "",
      totalPoints: totalPoints || 0,
      lastRacePosition:
        Number(driver?.races[driver?.races.length - 1].results[0].position) ||
        22,
      lastQualyPosition:
        Number(
          driverQualyInfo?.races[driverQualyInfo?.races.length - 1]
            .qualifyingResults[0].position
        ) || 22,
    });

    const teamName = driver?.races[0].results[0].constructor.name || "";

    if (
      constructorChampionshipPoints.some(
        (element: { teamName: string }) => element.teamName === teamName
      )
    ) {
      const teamObject = constructorChampionshipPoints.filter(
        (team) => team.teamName === teamName
      );

      driver?.races.forEach((race, index) => {
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
        teamName: driver?.races[0].results[0].constructor.name || "",
        races: [] as any,
      };

      driver?.races.forEach((race) => {
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

  return {
    driversInfo,
    championshipLeader,
    lastRaceWinner,
    lastQualyWinner,
    constructorChampionshipPoints,
  };
}
