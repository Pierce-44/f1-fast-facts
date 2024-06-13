import { Calendar } from "@/interfaces/interfaces";

export async function fetchRaceCalendar(): Promise<Calendar | null> {
  try {
    const response = await fetch(`http://localhost:3001/calendar`);

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
