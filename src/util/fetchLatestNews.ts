import { News } from "@/interfaces/interfaces";

export async function fetchLatestNews(): Promise<News | null> {
  try {
    const response = await fetch(
      "https://newsapi.org/v2/everything?q=Formula-1&language=en&apiKey=4d13c03e0d0f4806807fd2c0bb0d1975",
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching drivers: ${response.statusText}`);
    }

    const news: News = await response.json();

    return news;
  } catch (error) {
    console.error("Failed to fetch drivers:", error);
    return null;
  }
}
