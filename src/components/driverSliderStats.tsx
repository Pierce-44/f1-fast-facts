import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";
import DriverSliderClient from "./driverSliderClient";

export default async function DriverSliderStats({
  driverName,
}: {
  driverName: string;
}) {
  const driverResults = await fetchDriverRaceResults(driverName);

  return <DriverSliderClient driverResults={driverResults} />;
}
