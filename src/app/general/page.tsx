import GeneralPageClient from "@/components/generalPageClient";
import { fetchDrivers } from "@/util/fetchDrivers";
import { fetchGeneralResults } from "@/util/fetchGeneralResults";
import { fetchRaceCalendar } from "@/util/fetchRaceCalendar";
import handleGeneralPageStats from "@/util/handleGeneralPageStats";

export default async function General() {
  const driversArray = await fetchDrivers();

  const generalResults = await fetchGeneralResults(driversArray);

  const raceCalendar = await fetchRaceCalendar();

  const stats = handleGeneralPageStats({ generalResults, raceCalendar });

  return (
    <GeneralPageClient
      generalResults={generalResults}
      raceCalendar={raceCalendar}
      stats={stats}
    />
  );
}
