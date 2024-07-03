"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";

interface Props {
  itemName: string;
}

export default function SideBarItems({ itemName }: Props) {
  const pathname = usePathname();

  const [sideBarOpen, setSideBarOpen] = useAtom(atoms.sideBarOpen);
  const [sideBarHidden] = useAtom(atoms.sideBarHidden);

  return (
    <Link
      href={`/${itemName}`}
      onClick={() => {
        sideBarHidden && setSideBarOpen(false);
      }}
      className={`p-3 w-full flex items-center justify-start gap-6 rounded-lg ${pathname.includes(itemName) ? "bg-[#5d87ff] text-white" : "hover:bg-[#EAF0FF] dark:hover:bg-darkOffset hover:text-[#7296FF] dark:text-gray-400"} transition-all group select-none`}
    >
      {itemName === "forums" ? <ForumSvg itemName={itemName} /> : ""}
      {itemName === "calendar" ? <CalendarSvg itemName={itemName} /> : ""}
      {itemName === "news" ? <NewsSvg itemName={itemName} /> : ""}
      {itemName === "general" ? <GeneralSvg itemName={itemName} /> : ""}

      <p
        className={`${sideBarOpen ? "" : "opacity-0"} transition-opacity duration-700`}
      >
        {capitalizeFirstLetter(itemName)}
      </p>
    </Link>
  );
}

function CalendarSvg({ itemName }: { itemName: string }) {
  const pathname = usePathname();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-6 h-6 fill-gray-600 ${pathname.includes(itemName) ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all shrink-0`}
    >
      <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
    </svg>
  );
}

function NewsSvg({ itemName }: { itemName: string }) {
  const pathname = usePathname();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-6 h-6 fill-gray-600 ${pathname.includes(itemName) ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all shrink-0`}
    >
      <path d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
    </svg>
  );
}

function GeneralSvg({ itemName }: { itemName: string }) {
  const pathname = usePathname();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-6 h-6 fill-gray-600 ${pathname.includes(itemName) ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all shrink-0`}
    >
      <path d="m200-120-80-480h720l-80 480H200Zm67-80h426l51-320H216l51 320Zm133-160h160q17 0 28.5-11.5T600-400q0-17-11.5-28.5T560-440H400q-17 0-28.5 11.5T360-400q0 17 11.5 28.5T400-360ZM240-640q-17 0-28.5-11.5T200-680q0-17 11.5-28.5T240-720h480q17 0 28.5 11.5T760-680q0 17-11.5 28.5T720-640H240Zm80-120q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760H320Zm-53 560h426-426Z" />
    </svg>
  );
}

function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function ForumSvg({ itemName }: { itemName: string }) {
  const pathname = usePathname();

  return (
    <svg
      className={`w-6 h-6 fill-gray-600 ${pathname.includes(itemName) ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all shrink-0`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <path d="M284.62-275.39q-15.04 0-25.22-10.17-10.17-10.17-10.17-25.21v-60h495l12.69 12.69V-720h60q15.04 0 25.21 10.17 10.18 10.18 10.18 25.21v550.77L710.77-275.39H284.62Zm-176.93-33.84v-515.38q0-15.04 10.18-25.22Q128.04-860 143.08-860h498.46q15.04 0 25.21 10.17 10.17 10.18 10.17 25.22v338.46q0 15.03-10.17 25.21-10.17 10.17-25.21 10.17H249.23L107.69-309.23Zm509.23-201.54V-800H167.69v316.93l27.7-27.7h421.53Zm-449.23 0V-800v289.23Z" />
    </svg>
  );
}
