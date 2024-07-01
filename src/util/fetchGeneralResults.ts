import {
  QualyResults,
  fetchDriverQualyResults,
} from "./fetchDriverQualyResults";
import {
  DriverResults,
  fetchDriverRaceResults,
} from "./fetchDriverRaceResults";

export type GeneralResults = {
  driverRaceResults: (DriverResults[] | null)[];
  driverQualifyingResults: (QualyResults[] | null)[];
};

export async function fetchGeneralResults(
  driversArray: Driver[]
): Promise<GeneralResults> {
  try {
    const racePromises = driversArray.map((driver) =>
      fetchDriverRaceResults(driver.driverId)
    );
    const qualyPromises = driversArray.map((driver) =>
      fetchDriverQualyResults(driver.driverId)
    );

    const raceResults = await Promise.all(racePromises);
    const qualifyingResults = await Promise.all(qualyPromises);

    const generalResults = {
      driverRaceResults: raceResults,
      driverQualifyingResults: qualifyingResults,
    };

    return generalResults;
  } catch (error) {
    console.error("Failed to fetch drivers:", error);

    const fallback = {
      driverRaceResults: [],
      driverQualifyingResults: [],
    };
    return fallback;
  }
}

export interface Driver {
  id: number;
  driverId: string;
  givenName: string;
  familyName: string;
}
