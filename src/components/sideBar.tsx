import { fetchDrivers } from "@/util/fetchDrivers";
import SideBarClient from "./sideBarCLient";

export default async function SideBar() {
  const drivers = await fetchDrivers();

  return <SideBarClient drivers={drivers} />;
}
