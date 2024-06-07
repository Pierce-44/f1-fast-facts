import { DriverResults } from "@/interfaces/interfaces";

export async function fetchDriverRaceResults(
  driverName: string
): Promise<DriverResults | null> {
  try {
    const response = await fetch(`http://localhost:3001/results/${driverName}`);

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
