import { Article } from "@/interfaces/interfaces";
import NewsImage from "./newsImage";
import Link from "next/link";
import { getRandomColor } from "@/util/getRandomColour";

interface Props {
  article: Article;
}

export default function NewsCard({ article }: Props) {
  return (
    <Link
      target="_blank"
      href={article.url}
      className="group w-[300px] h-[350px] shadow-mine rounded-md p-5 flex flex-col justify-between hover:bg-blue-50 relative dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500 dark:hover:bg-darkOffset"
    >
      <div
        className="h-[40px] w-1 absolute left-0"
        style={{ background: getRandomColor() }}
      ></div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-800 dark:text-white">
          {article.source.name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {article.title}
        </p>
      </div>
      <NewsImage urlToImage={article.urlToImage} />
      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-800 dark:text-gray-400">
          {article.author}
        </p>
        <p className="text-[10px] text-gray-800 dark:text-gray-400">
          {new Date(article.publishedAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
