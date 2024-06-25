"use client";
import Image from "next/image";
import DriversDropDown from "./sideBarDrivers";
import SideBarItems from "./sideBarItems";
import { Driver } from "@/util/fetchDrivers";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import React from "react";

interface Props {
  drivers: Driver[];
}

export default function SideBarClient({ drivers }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);
  const [sideBarOpen, setSideBarOpen] = useAtom(atoms.sideBarOpen);
  const [, setDriversDropDownOpen] = useAtom(atoms.driversDropDownOpen);

  const supportedSideBarItems = ["calendar", "news"];

  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      window &&
      window?.innerWidth <= 800
    ) {
      setSideBarOpen(false);
    }
  };

  const handleResize = () => {
    console.log("hewrerererer");

    if (window && window?.innerWidth <= 800) {
      setSideBarOpen(false);
      setDriversDropDownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        className={`${sideBarOpen ? "w-full h-full" : ""} hidden max-[800px]:block  fixed top-0 left-0 bg-[#0000008c] z-40`}
      ></div>

      <div
        ref={wrapperRef}
        className={`${darkMode ? "dark" : ""} h-full  py-4 bg-white  border-r border-gray-200 shrink-0 transition-all duration-700 dark:bg-dark
      dark:border-opacity-20 dark:border-dark
      ${sideBarOpen ? "w-[275px] px-6 max-[800px]:left-0   " : "w-[65px] px-2 max-[800px]:-left-[275px]"}



      max-[800px]:fixed max-[800px]:z-50 max-[800px]:!w-[275px]

      `}
      >
        <div className="flex items-center justify-start gap-4 mb-10">
          <Image alt="website logo" src="/ufo.webp" height={36} width={36} />
          <p
            className={`${sideBarOpen ? "" : "opacity-0"} font-semibold text-2xl dark:text-white text-nowrap transition-opacity duration-700`}
          >
            F1 Fast Facts
          </p>
        </div>
        <DriversDropDown drivers={drivers} />
        <div className="space-y-4">
          {supportedSideBarItems.map((item, index) => {
            return <SideBarItems key={index} itemName={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
