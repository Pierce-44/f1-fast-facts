"use client";

import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import useDarkMode from "@/hooks/useDarkMode";
import { Forum } from "@/util/fetchForums";
import Image from "next/image";
import Forums from "./forums";
import { useParams, useSearchParams } from "next/navigation";

interface Props {
  forumsArray: Forum[];
}

export default function ForumsPageClient({ forumsArray }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);

  useDarkMode();

  const params = useParams();

  const forumPage = params?.forum
    ? (params.forum as any).replace(/%20/g, " ")
    : "";

  return (
    <div
      className={`${darkMode ? "dark" : ""} h-full  pb-4 transition-colors duration-700  overflow-y-scroll dark:bg-dark`}
      id="forum-scrolled"
    >
      <div className=" max-w-[1330px] h-full  mx-auto pt-[90px] flex flex-col px-4">
        <div className="hidden bg-[#ebf3fe] px-4 py-2 mb-4 rounded-md sm:flex items-center justify-between dark:bg-darkOffset transition-all duration-700">
          <div className="pl-4">
            <p className="text-3xl text-gray-800 mb-2 dark:text-white max-md:text-lg">
              Forums
            </p>
            <p className="text-gray-600 dark:text-gray-400 max-md:text-xs">
              Forum &#x2022; {forumPage?.replace(/_/g, " ") || "General"}
            </p>
          </div>
          <div className="relative w-[95px] h-[95px] shrink-0 max-sm:w-[80px] max-sm:h-[80px] overflow-hidden">
            <Image fill src="/newsIcon.png" alt="news icon" />
          </div>
        </div>
        <Forums forumsArray={forumsArray} />
      </div>
    </div>
  );
}
