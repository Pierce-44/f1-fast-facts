export async function fetchDriverQualyResults(
  driverName: string
): Promise<QualyResults[] | null> {
  try {
    const response = await fetch(
      `https://f1-data-api-d7f25ebaa706.herokuapp.com/qualyfying/${driverName}/results `,
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

export interface QualyResults {
  id: number;
  driverId: string;
  races: Race[];
}

export interface Race {
  id: number;
  raceName: string;
  circuit: Circuit;
  qualifyingResults: QualifyingResult[];
}

export interface Circuit {
  id: number;
  circuitId: string;
}

export interface QualifyingResult {
  id: number;
  position: string;
  driver: Driver;
}

export interface Driver {
  id: number;
  givenName: string;
  familyName: string;
}
