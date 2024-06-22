"use client";
import { News } from "@/interfaces/interfaces";
import NewsCard from "./newsCard";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import useDarkMode from "@/hooks/useDarkMode";

interface Props {
  news: News | null;
}

export default function NewsClient({ news }: Props) {
  const [darkMode] = useAtom(atoms.darkMode);

  useDarkMode();

  return (
    <main
      id="news-scrolled"
      className={`${darkMode ? "dark" : ""} w-full h-full p-20 overflow-y-scroll dark:bg-dark transition-all duration-700`}
    >
      <div className="w-full h-full max-w-[1330px] mx-auto">
        <div className=" bg-[#ebf3fe] px-4 py-2 mb-8 rounded-md flex items-center justify-between dark:bg-darkOffset transition-all duration-700">
          <div className="pl-4">
            <p className="text-3xl text-gray-800 mb-2 dark:text-white">News</p>
            <p className="text-gray-600 dark:text-gray-400">
              Read articles related to Formula 1
            </p>
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
