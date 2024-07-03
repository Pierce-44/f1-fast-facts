import ForumsPageClient from "@/components/ForumsPageClient";
import { fetchForums } from "@/util/fetchForums";

export default async function General() {
  const forumsArray = await fetchForums();

  return <ForumsPageClient forumsArray={forumsArray} />;
}
