export async function fetchRaceCalendar(): Promise<Calendar[] | null> {
  try {
    const response = await fetch(
      `https://f1-data-api-d7f25ebaa706.herokuapp.com/calendar`
    );

    if (!response.ok) {
      throw new Error(`Error fetching calendar: ${response.statusText}`);
    }

    const calendar = await response.json();

    return calendar;
  } catch (error) {
    console.error("Failed to fetch calendar results:", error);
    return null;
  }
}

export interface Calendar {
  id: number;
  raceName: string;
  date: string;
  time: string;
  qualifying: Qualifying;
}

export interface Qualifying {
  id: number;
  date: string;
  time: string;
}
