import NewsCard from "@/components/newsCard";
import { fetchLatestNews } from "@/util/fetchLatestNews";

export default async function News() {
  const news = await fetchLatestNews();

  return (
    <main className="w-full h-full p-10 overflow-y-scroll ">
      <div className="w-full h-full max-w-[1330px] mx-auto">
        <div className=" bg-[#ebf3fe] px-4 py-2 mb-8 rounded-md flex items-center justify-between">
          <div className="pl-4">
            <p className="text-3xl text-gray-800 mb-2">News</p>
            <p className="text-gray-600">Read articles related to Formula 1</p>
          </div>
          <img className="" src="/newsIcon.png" width={145} height={145} />
        </div>
        <div className="flex items-start justify-center flex-wrap gap-10">
          {news?.articles.map((article, index) => {
            if (article.source.name === "[Removed]") {
              return <></>;
            } else {
              return <NewsCard key={index} article={article} />;
            }
          })}
        </div>
      </div>
    </main>
  );
}
