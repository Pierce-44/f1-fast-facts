import NewsClient from "@/components/newsClient";
import { fetchLatestNews } from "@/util/fetchLatestNews";

export default async function News() {
  const news = await fetchLatestNews();

  return <NewsClient news={news} />;
}
