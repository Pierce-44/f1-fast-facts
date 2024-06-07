"use client";

import { DriverResults } from "@/interfaces/interfaces";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import React from "react";

interface Props {
  driverResults: DriverResults | null;
}

export default function DriverSliderClient({ driverResults }: Props) {
  if (!driverResults) return null;

  const totalPoints = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].points),
    0
  );

  const positionSum = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].position),
    0
  );

  const gridSum = driverResults?.results.reduce(
    (acc, result) => acc + Number(result.Results[0].grid),
    0
  );

  const finishTimeSum =
    driverResults?.results.reduce((acc, result) => {
      if (result.Results[0]?.Time?.millis) {
        return acc + Number(result.Results[0]?.Time.millis);
      } else {
        return 0;
      }
    }, 0) / 1000;

  const racesFinished = driverResults?.results.reduce((acc, result) => {
    if (result.Results[0]?.Time?.millis) {
      return acc + 1;
    } else {
      return 0;
    }
  }, 0);

  const averageFinishing = positionSum / driverResults?.results.length;

  const averageStartingGrid = gridSum / driverResults?.results.length;

  const averageFinishingTime = finishTimeSum / racesFinished;

  return (
    <Swiper
      slidesPerView="auto"
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={1500} // Set the transition speed to 800ms
      // modules={[Autoplay]}
    >
      <SwiperSlide className="!w-44 rounded mx-4 !h-44 bg-[#e6fffa] text-green-400 font-semibold">
        <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-14 w-14 fill-green-400"
          >
            <path d="M335.38-160v-40H460v-150.15q-52.85-9.47-92.5-44.2-39.65-34.73-54.58-86.11-63.46-7.46-108.19-52.04T160-640v-40q0-16.08 11.96-28.04T200-720h106.15v-80h347.7v80H760q16.08 0 28.04 11.96T800-680v40q0 62.92-44.73 107.5t-108.19 52.04q-14.93 51.38-54.58 86.11t-92.5 44.2V-200h124.62v40H335.38Zm-29.23-363.38V-680H200v40q0 45.69 30.46 78.5t75.69 38.12ZM480-389.23q55.38 0 93.85-38.46 38.46-38.46 38.46-93.85V-760H347.69v238.46q0 55.39 38.46 93.85 38.47 38.46 93.85 38.46Zm173.85-134.15q45.23-5.31 75.69-38.12Q760-594.31 760-640v-40H653.85v156.62ZM480-574.62Z" />
          </svg>
          <p className="text-sm text-center">Total Points</p>
          <p>{totalPoints}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44 bg-[#eaf0ff] text-blue-400 font-semibold">
        <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-14 w-14 fill-blue-400"
          >
            <path d="M240-140v-620h287.69l16 80H760v320H552.31l-16-80H280v300h-40Zm260-420Zm86 160h134v-240H510l-16-80H280v240h290l16 80Z" />
          </svg>
          <p className="text-sm text-center">Avg Starting</p>
          <p>{averageStartingGrid}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44 bg-[#fdede8] text-red-400 font-semibold">
        <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-14 w-14 fill-red-400"
          >
            <path d="M352.31-716.92h73.84v-73.85h-73.84v73.85Zm147.69 0v-73.85h73.85v73.85H500ZM352.31-421.54v-73.84h73.84v73.84h-73.84Zm295.38-147.69v-73.85h73.85v73.85h-73.85Zm0 147.69v-73.84h73.85v73.84h-73.85Zm-147.69 0v-73.84h73.85v73.84H500Zm147.69-295.38v-73.85h73.85v73.85h-73.85Zm-221.54 73.84v-73.84H500v73.84h-73.85ZM238.46-181.54v-609.23h40v73.85h73.85v73.84h-73.85v73.85h73.85v73.85h-73.85v313.84h-40Zm335.39-313.84v-73.85h73.84v73.85h-73.84Zm-147.7 0v-73.85H500v73.85h-73.85Zm-73.84-73.85v-73.85h73.84v73.85h-73.84Zm147.69 0v-73.85h73.85v73.85H500Zm73.85-73.85v-73.84h73.84v73.84h-73.84Z" />
          </svg>
          <p className="text-center text-sm">Finishing Position Avg</p>
          <p>{averageFinishing}</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44 bg-[#fef5e5] text-yellow-400 font-semibold">
        <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-14 w-14 fill-yellow-400"
          >
            <path d="M200.69-460H320q5.62 0 10.23 2.81 4.62 2.81 7.31 8.42L400-325.38l142.46-283.39q5.62-11.46 17.92-11.46 12.31 0 17.93 11.46L652.69-460h106.62q-7.31-109.69-88-184.85Q590.62-720 480-720t-191.31 75.15Q208-569.69 200.69-460ZM480-160q110.62 0 191.31-75.15 80.69-75.16 88-184.85H640q-5.62 0-10.23-2.81-4.62-2.81-7.31-8.42L560-554.62 417.54-270.46q-5.62 11.46-17.92 11.08-12.31-.39-17.93-11.85L307.31-420H200.69q7.31 109.69 88 184.85Q369.38-160 480-160Zm0 40q-66.31 0-124.5-25.04t-101.81-68.65q-43.61-43.62-68.65-101.81Q160-373.69 160-440h40q0 116 82 198t198 82q116 0 198-82t82-198h40q0 66.31-25.04 124.5t-68.65 101.81q-43.62 43.61-101.81 68.65Q546.31-120 480-120ZM160-440q0-66.31 25.04-124.5t68.65-101.81q43.62-43.61 101.81-68.65Q413.69-760 480-760q58.15 0 112.46 20.77 54.31 20.77 99.69 58.77l43.7-43.69 28.3 28.3-43.69 43.7q38 45.38 58.77 99.69Q800-498.15 800-440h-40q0-116-82-198t-198-82q-116 0-198 82t-82 198h-40Zm215.38-420v-40h209.24v40H375.38ZM480-160q-116 0-198-82t-82-198q0-116 82-198t198-82q116 0 198 82t82 198q0 116-82 198t-198 82Zm0-280Z" />
          </svg>
          <p className="text-center text-sm">Avg Finishing Time</p>
          <p>+ {Math.round(averageFinishingTime)} secs</p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44 bg-[#ffeefd] text-pink-400 font-semibold">
        <div className="flex flex-col justify-evenly items-center h-full px-2 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-14 w-14 fill-pink-400"
          >
            <path d="M184.62-160q-27.62 0-46.12-18.5Q120-197 120-224.62v-510.76q0-27.62 18.5-46.12Q157-800 184.62-800h590.76q27.62 0 46.12 18.5Q840-763 840-735.38v510.76q0 27.62-18.5 46.12Q803-160 775.38-160H184.62Zm0-40h590.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-510.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H184.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v510.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM220-300h160v-40H220v40Zm362-88.46L751.54-558 723-586.54l-141 142-57-57L497.46-473 582-388.46ZM220-460h160v-40H220v40Zm0-160h160v-40H220v40Zm-60 420v-560 560Z" />
          </svg>
          <p className="text-center text-sm">Races Finished</p>
          <p>
            {racesFinished} of {driverResults?.results.length}
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
      <SwiperSlide className="!w-44 rounded mx-4 !h-44">Slide</SwiperSlide>
    </Swiper>
  );
}
