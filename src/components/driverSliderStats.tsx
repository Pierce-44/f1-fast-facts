import { DriverResults } from "@/util/fetchDriverRaceResults";
import DriverSliderClient from "./driverSliderClient";

export default function DriverSliderStats({
  driverResults,
}: {
  driverResults: DriverResults | null;
}) {
  return <DriverSliderClient driverResults={driverResults} />;
}
