"use client";
import Image from "next/image";
import DriversDropDown from "./sideBarDrivers";
import SideBarItems from "./sideBarItems";
import { Driver } from "@/util/fetchDrivers";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

interface Props {
  drivers: Driver[];
}

export default function SideBarClient({ drivers }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);

  const supportedSideBarItems = ["calendar", "news"];

  return (
    <div
      className={`${darkMode ? "dark" : ""} h-full w-[275px] py-4 px-6 border-r border-gray-200 shrink-0 transition-colors duration-700 dark:bg-dark`}
    >
      <div className="flex items-center justify-start gap-4 mb-10">
        <Image alt="website logo" src="/ufo.webp" height={36} width={36} />
        <p className="font-semibold text-2xl">F1 Fast Facts</p>
      </div>
      <DriversDropDown drivers={drivers} />
      <div className="space-y-4">
        {supportedSideBarItems.map((item, index) => {
          return <SideBarItems key={index} itemName={item} />;
        })}
      </div>
    </div>
  );
}
