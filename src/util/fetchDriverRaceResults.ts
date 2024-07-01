export async function fetchDriverRaceResults(
  driverName: string
): Promise<DriverResults[] | null> {
  try {
    const response = await fetch(
      `https://f1-data-api-d7f25ebaa706.herokuapp.com/drivers/${driverName}/results`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Error fetching drivers: ${response.statusText}`);
    }

    const driverResults = await response.json();

    return driverResults;
  } catch (error) {
    console.error("Failed to fetch driver results:", error);
    return null;
  }
}

export interface DriverResults {
  id: number;
  driverId: string;
  races: Race[];
}

export interface Race {
  id: number;
  raceName: string;
  circuit: Circuit;
  results: Result[];
}

export interface Circuit {
  id: number;
  circuitId: string;
  circuitName: string;
}

export interface Result {
  id: number;
  position: string;
  positionText: string;
  points: string;
  grid: string;
  time: Time;
  fastestLap: FastestLap;
  driver: Driver;
  constructor: Constructor;
}

export interface Time {
  id: number;
  time: string;
  millis: string;
}

export interface FastestLap {
  id: number;
  averageSpeed: AverageSpeed;
}

export interface AverageSpeed {
  id: number;
  speed: string;
}

export interface Driver {
  id: number;
  nationality: string;
  dateOfBirth: string;
  permanentNumber: string;
  givenName: string;
  familyName: string;
}

export interface Constructor {
  id: number;
  name: string;
  constructorId: string;
}

export interface Constructor {
  id: number;
  name: string;
  constructorId: string;
}
