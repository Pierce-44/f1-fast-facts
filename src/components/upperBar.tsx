"use client";
import useScrolled from "@/hooks/useScrolled";
import * as atoms from "@/util/atoms";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function UpperBar() {
  const { user } = useUser();

  const [darkMode, setDarkMode] = useAtom(atoms.darkMode);
  const [sideBarOpen, setSideBarOpen] = useAtom(atoms.sideBarOpen);
  const [showDropDown, setShowDropDown] = useAtom(atoms.driversDropDownOpen);

  const pathname = usePathname();

  const { isScrolled } = useScrolled();

  const router = useRouter();

  return (
    <div
      className={`${isScrolled ? "shadow-upperBar dark:border" : "dark:border-[#202936]"} bg-white   py-4 px-8  fixed top-0 z-20 transition-all duration-700 flex justify-between items-center dark:bg-dark ${darkMode ? "dark" : ""} dark:border-b dark:border-x-0 dark:border-t-0  border-white dark:shadow-none  dark:border-opacity-20 dark:border-dark ${sideBarOpen ? "w-[calc(100vw-275px)]" : "w-[calc(100vw-65px)]"}
            max-[800px]:!w-full
      `}
    >
      <button
        className={`hover:bg-blue-50 group dark:hover:bg-darkOffset transition-all p-1 rounded-full`}
        onClick={() => {
          setSideBarOpen(!sideBarOpen);

          if (pathname.includes("drivers")) {
            setShowDropDown(!sideBarOpen);
          } else {
            setShowDropDown(false);
          }
        }}
      >
        <svg
          className={`${!sideBarOpen ? "rotate-180" : ""} fill-gray-600 dark:fill-gray-400 group-hover:fill-[#7296FF] transition-all`}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
        >
          <path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z" />
        </svg>
      </button>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => {
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
            setDarkMode(!darkMode);
          }}
          className="hover:bg-blue-50 dark:hover:bg-darkOffset group transition-colors p-1 rounded-full"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="fill-gray-400 group-hover:fill-[#7296FF]"
            >
              <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
            </svg>
          ) : (
            <svg
              className="fill-gray-600 group-hover:fill-[#7296FF]"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
            </svg>
          )}
        </button>
        <div className="relative group cursor-pointer">
          {user ? (
            <img
              referrerPolicy="no-referrer"
              className="object-contain h-10 w-10 rounded-full overflow-hidden"
              // src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFro&accessoriesType=Prescription01&hairColor=Platinum&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Diamond&eyeType=Close&eyebrowType=Angry&mouthType=Default&skinColor=Tanned"
              src={user?.picture || ""}
              alt=""
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-7 w-7 fill-gray-600 dark:fill-gray-400"
            >
              <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z" />
            </svg>
          )}
          {user ? (
            <div className="w-max hidden group-hover:block absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:!h-min shadow-mine bg-white rounded-md p-8 space-y-4 dark:bg-dark dark:shadow-none cursor-default dark:border dark:border-[#5e5e5e]">
              <p className="text-lg whitespace-nowrap font-semibold pb-2 dark:text-white">
                User Profile
              </p>
              <div className="flex gap-4 pb-7">
                <img
                  referrerPolicy="no-referrer"
                  className="object-contain h-20 w-20 rounded-full overflow-hidden shrink-0"
                  src={user?.picture || ""}
                  alt=""
                />
                <div className="flex flex-col justify-evenly dark:text-white">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Forum Member
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  router.push("/api/auth/logout");
                }}
                className="w-full shrink-0 text-center py-2 text-white rounded-md bg-[#5d87ff] hover:bg-[#4f73d9] transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="w-max hidden group-hover:block absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:!h-min shadow-mine bg-white rounded-md p-8 space-y-4 dark:bg-dark dark:shadow-none dark:border dark:border-[#5e5e5e]">
              <div className="flex items-center justify-start gap-4 mb-5">
                <Image
                  alt="website logo"
                  src="/ufo.webp"
                  height={36}
                  width={36}
                />
                <p
                  className={`font-semibold text-2xl dark:text-white text-nowrap transition-opacity duration-700 ml-4`}
                >
                  F1 Fast Facts
                </p>
              </div>
              <p className="text-center pt-10 text-gray-600 dark:text-gray-400">
                Sign in using your google account
              </p>
              <p className="text-center pb-10 text-gray-600 dark:text-gray-400">
                to use the forums
              </p>
              <button
                onClick={() => {
                  router.push("/api/auth/login");
                }}
                className="w-full shrink-0 text-center py-2 text-white rounded-md bg-[#5d87ff] hover:bg-[#4f73d9] transition-colors"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
