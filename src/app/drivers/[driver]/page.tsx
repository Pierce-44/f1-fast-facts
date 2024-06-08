import DriveRacePointsChat from "@/components/charts/driverRacePoints";
import DriverSliderStats from "@/components/driverSliderStats";
import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";

export default async function Driver({
  params,
}: {
  params: { driver: string };
}) {
  const driverName = params.driver.toLocaleLowerCase();

  const driverResults = await fetchDriverRaceResults(driverName);

  return (
    <main className="w-full h-full flex flex-col items-center justify-start overflow-x-hidden">
      <div className="max-w-6xl mt-16 w-full">
        <DriverSliderStats driverResults={driverResults} />
      </div>
      <div className="h-[450px] w-full px-4 pb-4 pt-6 max-w-6xl flex gap-6">
        <DriveRacePointsChat />
        <div className="w-full h-full  rounded-md shadow-mine"></div>
      </div>
    </main>
  );
}
