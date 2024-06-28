"use client";
import { Driver } from "@/util/fetchDrivers";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

interface Props {
  drivers: Driver[];
}

export default function DriversDropDown({ drivers }: Props) {
  const [sideBarOpen, setSideBarOpen] = useAtom(atoms.sideBarOpen);

  const [showDropDown, setShowDropDown] = useAtom(atoms.driversDropDownOpen);
  const [sideBarHidden] = useAtom(atoms.sideBarHidden);

  const params = useParams();

  React.useEffect(() => {
    if (params.driver && sideBarOpen) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }, [params]);

  return (
    <div>
      <button
        onClick={() => {
          if (!sideBarOpen) {
            setSideBarOpen(true);
          }
          setShowDropDown(!showDropDown);
        }}
        className={`p-3 w-full flex items-center justify-start gap-6 rounded-lg ${params.driver ? "bg-[#5d87ff] text-white " : "hover:bg-[#EAF0FF] dark:hover:bg-darkOffset hover:text-[#7296FF] dark:text-gray-400"} group transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`w-6 h-6 fill-gray-600 ${params.driver ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all shrink-0`}
        >
          <path d="M480-480Zm80 240q100 0 170-70t70-170q0-101-73.5-170.5T550-720q-48 0-93 11t-87 33l100 40q41 17 65.5 52.5T560-504q0 60-41.5 102T418-360H162q-2 24-2 54.5v65.5h400ZM176-440h240q27 0 45.5-18.5T480-504q0-19-10.5-34.5T440-562l-148-60q-42 37-71.5 84T176-440Zm384 280H160q-33 0-56.5-23.5T80-240v-90q0-98 37-183.5t100.5-149Q281-726 367-763t183-37q68 0 128 25t105 68.5Q828-663 854-605t26 125q0 66-25 124.5t-68.5 102Q743-210 684.5-185T560-160Z" />
        </svg>
        <p
          className={`${sideBarOpen ? "" : "opacity-0"} transition-opacity duration-700`}
        >
          Drivers
        </p>
      </button>
      <div
        style={{ height: showDropDown ? `${drivers.length * 48}px` : "0px" }}
        className={`${showDropDown ? "py-3 mb-4 border dark:border-opacity-20 dark:border-dark dark:shadow-none shadow-mine" : "h-0 dark:shadow-none"} overflow-y-scroll transition-all duration-300 max-h-80  rounded-lg mt-4 select-none dark:shadow-none dark:border-dark dark:border-opacity-20

        `}
      >
        {drivers
          .filter((driver) => driver.driverId !== "bearman")
          .map((driver, index) => {
            return (
              <div
                className="h-12 p-4 flex items-center justify-center text-gray-600 dark:text-gray-400"
                key={index}
              >
                <Link
                  href={`/drivers/${driver.driverId}`}
                  onClick={() => {
                    if (window && window.innerWidth < 800) {
                      setTimeout(() => {
                        sideBarHidden && setSideBarOpen(false);
                      }, 1000);
                    }
                  }}
                  className={`${driver.driverId === params.driver ? "bg-[#eaf0ff] text-[#7296FF] dark:bg-darkOffset" : "hover:bg-[#eaf0ff] hover:text-[#7296FF] dark:hover:bg-darkOffset"}  py-2 rounded w-full text-start pl-11 transition-all`}
                >
                  {driver.familyName}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
