import { DriverResults } from "@/util/fetchDriverRaceResults";
import DriverSliderClient from "./driverSliderClient";

export default async function DriverSliderStats({
  driverResults,
}: {
  driverResults: DriverResults | null;
}) {
  return <DriverSliderClient driverResults={driverResults} />;
}
