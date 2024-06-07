import Image from "next/image";
import DriversDropDown from "./sideBarDrivers";
import { fetchDrivers } from "@/util/fetchDrivers";

export default async function SideBar() {
  const drivers = await fetchDrivers();

  return (
    <div className="h-full w-[275px] p-4 border-r border-gray-200">
      <div className="flex items-center justify-start gap-4 mb-10">
        <Image alt="website logo" src="/ufo.png" height={36} width={36} />
        <p className="font-semibold text-2xl">F1 Fast Facts</p>
      </div>
      <DriversDropDown drivers={drivers} />
    </div>
  );
}
