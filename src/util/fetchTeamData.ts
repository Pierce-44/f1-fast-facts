import { DriverResults } from "@/interfaces/interfaces";

export async function fetchTeamData(teamName: string): Promise<any | null> {
  try {
    const response = await fetch(
      `http://localhost:3001/constructors/${teamName}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching team data: ${response.statusText}`);
    }

    const teamData = await response.json();

    return teamData;
  } catch (error) {
    console.error("Failed to fetch team data:", error);
    return null;
  }
}
