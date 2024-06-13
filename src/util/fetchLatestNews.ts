import { News } from "@/interfaces/interfaces";

export async function fetchLatestNews(): Promise<News | null> {
  try {
    const response = await fetch();

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
