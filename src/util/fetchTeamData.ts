export async function fetchTeamData(): Promise<Team[] | null> {
  try {
    const response = await fetch(
      `https://f1-data-api-d7f25ebaa706.herokuapp.com/teams`
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

export interface Team {
  id: number;
  constructorId: string;
  drivers: Driver[];
}

export interface Driver {
  id: number;
  givenName: string;
  familyName: string;
  driverId: string;
}
