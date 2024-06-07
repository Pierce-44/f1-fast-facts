import { Driver } from "@/interfaces/interfaces";

export async function fetchDrivers(): Promise<Driver[]> {
  try {
    const response = await fetch("http://localhost:3001/Drivers");

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
