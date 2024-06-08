import { fetchDriverRaceResults } from "@/util/fetchDriverRaceResults";
import DriverSliderClient from "./driverSliderClient";
import { DriverResults } from "@/interfaces/interfaces";

export default async function DriverSliderStats({
  driverResults,
}: {
  driverResults: DriverResults | null;
}) {
  return <DriverSliderClient driverResults={driverResults} />;
}
