"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React from "react";
import Image from "next/image";
import useDriverPageSlider from "@/hooks/useDriverPageSlider";
import { DriverResults } from "@/util/fetchDriverRaceResults";
import Link from "next/link";

interface Props {
  driverRaceResults: (DriverResults[] | null)[];
}

export default function DriverImageGallery({ driverRaceResults }: Props) {
  const drivers = driverRaceResults.filter(
    (driver) => driver![0]?.driverId !== "bearman"
  );

  return (
    <Swiper
      className=""
      slidesPerView="auto"
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      speed={1100} // Set the transition speed to 800ms
      modules={[Autoplay]}
    >
      {drivers?.map((driver, index) => {
        return (
          <SwiperSlide
            key={index}
            className="!w-44 rounded-md mx-4 !h-44 font-semibold select-none"
          >
            <div className="flex flex-col justify-evenly items-center h-full px-2 py-4 ">
              <Link
                href={`/drivers/${driver![0]?.driverId}`}
                className="group rounded-full overflow-hidden"
              >
                <Image
                  className=" group-hover:scale-110 transition-all duration-300"
                  width={100}
                  height={100}
                  src={`/imagesDrivers/${driver![0]?.driverId}.webp`}
                  alt=""
                ></Image>
              </Link>

              <p className="text-sm text-center pt-4 text-gray-700 font-semibold dark:text-gray-200">
                {driver![0]?.races[0].results[0].driver.givenName}{" "}
                {driver![0]?.races[0].results[0].driver.familyName}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
