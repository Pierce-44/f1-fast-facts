import CalendarClient from "@/components/calendarClient";
import { fetchRaceCalendar } from "@/util/fetchRaceCalendar";

export default async function Calendar() {
  const raceCalendar = await fetchRaceCalendar();

  return <CalendarClient raceCalendar={raceCalendar} />;
}
