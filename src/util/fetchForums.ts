export async function fetchForums(): Promise<Forum[]> {
  try {
    const response = await fetch(
      "https://f1-data-api-d7f25ebaa706.herokuapp.com/forums",
      {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching forums: ${response.statusText}`);
    }

    const forums: Forum[] = await response.json();

    return forums;
  } catch (error) {
    console.error("Failed to fetch forums:", error);
    return [];
  }
}
export interface Forum {
  id: Id;
  forumName: string;
  messages: Message[];
}

export interface Id {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: string;
}

export interface Message {
  id: Id2;
  username: string;
  userImage: string;
  content: string;
  timeStamp: number;
}

export interface Id2 {
  timestamp: number;
  machine: number;
  pid: number;
  increment: number;
  creationTime: string;
}
