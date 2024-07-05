import { fetchForums, Message } from "@/util/fetchForums";
import React from "react";

export default function useForumData({
  forumPage,
  setMessages,
}: {
  forumPage: any;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchForums();

        const currentForum = result.filter(
          (forum) => forum.forumName === forumPage
        )[0];

        setMessages(currentForum.messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [forumPage]);
}
