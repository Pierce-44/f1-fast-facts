"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React from "react";
import Image from "next/image";
import useDriverPageSlider from "@/hooks/useDriverPageSlider";
import { DriverResults } from "@/util/fetchDriverRaceResults";

interface Props {
  driverResults: DriverResults | null;
}

export default function DriverSliderClient({ driverResults }: Props) {
  const supportedSliderItems = useDriverPageSlider(driverResults);

  return (
    <Swiper
      slidesPerView="auto"
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={1500} // Set the transition speed to 800ms
      modules={[Autoplay]}
    >
      {supportedSliderItems?.map((item, index) => {
        return (
          <SwiperSlide
            key={index}
            className="!w-44 rounded-md mx-4 !h-44 font-semibold select-none"
            style={{
              color: `${item.textColour}`,
              background: `${item.bgColour}`,
            }}
          >
            <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
              <Image
                width={56}
                height={56}
                src={item.imgUrl}
                alt={item.title}
              ></Image>
              <p className="text-sm text-center">{item.title}</p>
              <p>{item.value}</p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
