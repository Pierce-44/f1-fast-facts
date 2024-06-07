"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  itemName: string;
}

export default function SideBarItems({ itemName }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={`/${itemName}`}
      className={`p-3 w-full flex items-center justify-start gap-6 rounded-lg ${pathname === `/${itemName}` ? "bg-[#5d87ff] text-white" : "hover:bg-[#EAF0FF] hover:text-[#7296FF]"} transition-all group select-none`}
    >
      {itemName === "calendar" ? <CalendarSvg itemName={itemName} /> : ""}
      {itemName === "news" ? <NewsSvg itemName={itemName} /> : ""}

      <p>{capitalizeFirstLetter(itemName)}</p>
    </Link>
  );
}

function CalendarSvg({ itemName }: { itemName: string }) {
  const pathname = usePathname();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-6 h-6 fill-gray-600 ${pathname === `/${itemName}` ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all`}
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
      className={`w-6 h-6 fill-gray-600 ${pathname === `/${itemName}` ? "fill-white" : "group-hover:fill-[#7296FF]"} transition-all`}
    >
      <path d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z" />
    </svg>
  );
}

function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
