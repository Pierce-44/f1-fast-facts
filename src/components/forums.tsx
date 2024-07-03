"use client";
import { Forum } from "@/util/fetchForums";
import React from "react";
import ForumSideBar from "./forumSideBar";
import ForumPage from "./forum";

interface Props {
  forumsArray: Forum[];
}

export default function Forums({ forumsArray }: Props) {
  return (
    <div className="dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500 grow shadow-mine rounded-md h-[calc(100%-200px)] flex">
      <ForumSideBar forumsArray={forumsArray} />
      <ForumPage forumsArray={forumsArray} />
    </div>
  );
}
