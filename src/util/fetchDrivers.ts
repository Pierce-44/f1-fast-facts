export async function fetchDrivers(): Promise<Driver[]> {
  try {
    const response = await fetch(
      "https://f1-data-api-d7f25ebaa706.herokuapp.com/drivers",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Error fetching drivers: ${response.statusText}`);
    }

    const drivers: Driver[] = await response.json();

    return drivers;
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return [];
  }
}

export interface Driver {
  id: number;
  driverId: string;
  givenName: string;
  familyName: string;
}
