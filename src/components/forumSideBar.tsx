"use client";
import { Forum } from "@/util/fetchForums";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import { useUser } from "@auth0/nextjs-auth0/client";

interface Props {
  forumsArray: Forum[];
}

export default function ForumSideBar({ forumsArray }: Props) {
  const { user } = useUser();

  const [searchValue, setSearchValue] = React.useState("");

  const handleInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setSearchValue(event.target.value);
  };

  const router = useRouter();

  const filteredForumsArray = forumsArray.filter((forum) =>
    forum.forumName
      .toLowerCase()
      .replace(/_/g, " ")
      .includes(searchValue.toLowerCase())
  );

  const params = useParams();

  const forumPage = params?.forum
    ? (params.forum as any).replace(/%20/g, " ")
    : "";

  const [showSideBar, setShowSideBar] = React.useState(true);

  const handleResize = () => {
    if (window && window?.innerWidth <= 1080) {
      setShowSideBar(false);
    } else {
      setShowSideBar(true);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollDivRef = React.useRef<HTMLDivElement>(null);

  const scrollRef = React.useRef<HTMLButtonElement>(null);
  const nullRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollRef.current]);

  const [openForumSideBar, setOpenForumSideBar] = useAtom(
    atoms.openForumSideBar
  );

  return (
    <div>
      <div
        onClick={() => {
          setOpenForumSideBar(false);
        }}
        className={`${openForumSideBar && !showSideBar ? "h-screen w-screen bg-[#00000071] fixed top-0 left-0 z-30 " : "hidden"}`}
      ></div>
      <div
        className={`${showSideBar ? "" : "fixed bg-white dark:bg-dark z-[100] top-0"} w-[350px] shrink-0 border-r border-gray-200 dark:border-gray-700 transition-all duration-500 h-full overflow-hidden
      
      
      ${openForumSideBar && !showSideBar ? "left-0" : "-left-[350px]"}
      
      `}
      >
        <div className="flex gap-4 p-4">
          <div className="p-1 bg-[#65c9ff] rounded-full overflow-hidden">
            {user?.picture ? (
              <img
                referrerPolicy="no-referrer"
                className="object-contain h-16 w-16 "
                // src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFro&accessoriesType=Prescription01&hairColor=Platinum&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Diamond&eyeType=Close&eyebrowType=Angry&mouthType=Default&skinColor=Tanned"
                src={user?.picture || ""}
                alt=""
              />
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  className="!h-16 !w-16 fill-gray-600 dark:fill-gray-400"
                >
                  <path d="M358.52-388.67q-20.85 0-35.69-14.98Q308-418.63 308-439.82q0-21.18 14.98-35.68 14.99-14.5 36.17-14.5t35.68 14.74q14.5 14.73 14.5 36.08 0 20.85-14.73 35.68-14.74 14.83-36.08 14.83Zm242.66 0q-20.85 0-35.68-14.98-14.83-14.98-14.83-36.17 0-21.18 14.98-35.68t36.17-14.5q21.18 0 35.68 14.74 14.5 14.73 14.5 36.08 0 20.85-14.74 35.68-14.73 14.83-36.08 14.83ZM479.94-156q135.64 0 229.85-94.26Q804-344.52 804-480.34q0-24.33-3.33-47.16-3.34-22.83-10.37-43.83-21.3 5-42.47 7.5-21.18 2.5-45.02 2.5-91.89 0-174.18-39.34-82.3-39.33-139.96-110-32 78-92.5 136.5T156-485.87v5.87q0 135.68 94.14 229.84Q344.29-156 479.94-156Zm.23 24q-72.17 0-135.73-27.39-63.56-27.39-110.57-74.35-47.02-46.96-74.44-110.43Q132-407.65 132-479.83q0-72.17 27.39-135.73 27.39-63.56 74.35-110.57 46.96-47.02 110.43-74.44Q407.65-828 479.83-828q72.17 0 135.73 27.39 63.56 27.39 110.57 74.35 47.02 46.96 74.44 110.43Q828-552.35 828-480.17q0 72.17-27.39 135.73-27.39 63.56-74.35 110.57-46.96 47.02-110.43 74.44Q552.35-132 480.17-132Z" />
                </svg>
              </div>
            )}
          </div>
          <div className="h-16 flex flex-col justify-evenly">
            <p className="text-gray-800 font-semibold dark:text-white">
              {user?.name || "Logged Out"}
            </p>
            <p className="text-gray-500 text-xs">
              {user ? "Forum User" : "No Forum Account"}
            </p>
          </div>
        </div>
        <div className="px-2 mb-2">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <label
              // for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search forums"
                value={searchValue}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div
          ref={scrollDivRef}
          className="h-[calc(100%-168px)] overflow-y-scroll divide-y divide-gray-100 dark:divide-gray-700"
        >
          {(searchValue.length === 0 ? forumsArray : filteredForumsArray).map(
            (forum, index) => {
              return (
                <button
                  ref={forum.forumName === forumPage ? scrollRef : nullRef}
                  id={`forum-side-${forum.forumName}`}
                  onClick={() => {
                    router.push(`/forums/${forum.forumName}`);
                    setOpenForumSideBar(false);
                  }}
                  key={index}
                  className={`${
                    forumPage
                      ?.toLowerCase()
                      .replace(/_/g, " ")
                      .includes(
                        forum.forumName.toLowerCase().replace(/_/g, " ")
                      )
                      ? "bg-slate-100 dark:bg-darkOffset"
                      : ""
                  } p-4 space-y-2 hover:bg-slate-100 transition-colors duration-300 dark:hover:bg-darkOffset w-full`}
                >
                  <p className="font-semibold text-gray-800 dark:text-gray-100 text-start">{`2024 - ${forum.forumName.replace(/_/g, " ")}`}</p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs text-start">
                    By Pierce - 01 July 2024, 18:42
                  </p>
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
