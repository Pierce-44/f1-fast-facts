import RaceCalendar from "@/components/raceCalendar";
import { fetchRaceCalendar } from "@/util/fetchRaceCalendar";

export default async function Calendar() {
  const raceCalendar = await fetchRaceCalendar();

  return (
    <main className="w-full h-full p-10 overflow-y-scroll">
      <div className="w-full h-full max-w-[1330px] mx-auto">
        <div className=" bg-[#ebf3fe] px-4 py-2 mb-8 rounded-md flex items-center justify-between">
          <div className="pl-4">
            <p className="text-3xl text-gray-800 mb-2">Calendar</p>
            <p className="text-gray-600">
              The Complete Formula 1 Race Calendar
            </p>
          </div>
          <img className="" src="/newsIcon.png" width={145} height={145} />
        </div>
        <RaceCalendar raceCalendar={raceCalendar} />
      </div>
    </main>
  );
}
