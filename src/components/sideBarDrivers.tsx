"use client";
import { Driver } from "@/interfaces/interfaces";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  drivers: Driver[];
}

export default function DriversDropDown({ drivers }: Props) {
  const [showDropDown, setShowDropDown] = React.useState(false);

  const params = useParams();

  React.useEffect(() => {
    if (params.driver) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
    }
  }, [params]);

  return (
    <div>
      <p className="text-[12px] font-extrabold pb-4">HOME</p>
      <Link
        href={`/drivers/${drivers[0].familyName}`}
        className={`p-3 w-full flex items-center justify-start gap-6 rounded-lg ${params.driver ? "bg-[#5d87ff] text-white" : "hover:bg-[#EAF0FF] hover:text-[#7296FF]"} group transition-all`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className={`w-6 h-6 fill-gray-600 ${params.driver ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all`}
        >
          <path d="M480-480Zm80 240q100 0 170-70t70-170q0-101-73.5-170.5T550-720q-48 0-93 11t-87 33l100 40q41 17 65.5 52.5T560-504q0 60-41.5 102T418-360H162q-2 24-2 54.5v65.5h400ZM176-440h240q27 0 45.5-18.5T480-504q0-19-10.5-34.5T440-562l-148-60q-42 37-71.5 84T176-440Zm384 280H160q-33 0-56.5-23.5T80-240v-90q0-98 37-183.5t100.5-149Q281-726 367-763t183-37q68 0 128 25t105 68.5Q828-663 854-605t26 125q0 66-25 124.5t-68.5 102Q743-210 684.5-185T560-160Z" />
        </svg>
        <p>Drivers</p>
      </Link>
      <div
        style={{ height: showDropDown ? `${drivers.length * 48}px` : "0px" }}
        className={`${showDropDown ? "py-3 mb-4" : "h-0"} overflow-y-scroll transition-all duration-300 max-h-80 shadow-mine rounded-lg mt-4 select-none`}
      >
        {drivers.map((driver, index) => {
          return (
            <div
              className="h-12 p-4 flex items-center justify-center text-gray-600"
              key={index}
            >
              <Link
                href={`/drivers/${driver.familyName}`}
                className={`${driver.familyName === params.driver ? "bg-[#eaf0ff] text-[#7296FF]" : "hover:bg-[#eaf0ff] hover:text-[#7296FF]"}  py-2 rounded w-full text-start pl-11 transition-all`}
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
