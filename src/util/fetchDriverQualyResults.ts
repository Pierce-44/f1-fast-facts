import { QualyResults } from "@/interfaces/interfaces";

export async function fetchDriverQualyResults(
  driverName: string
): Promise<QualyResults | null> {
  try {
    const response = await fetch(
      `http://localhost:3001/qualifying/${driverName}`
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
