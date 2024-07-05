import { Message } from "@/util/fetchForums";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React from "react";

interface Props {
  forumPage: any;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  messages: Message[];
}

export default function useWebSocketHub({
  forumPage,
  setMessages,
  messages,
}: Props) {
  const [socketConnection, setSocketConnection] =
    React.useState<HubConnection>();

  React.useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("https://f1-data-api-d7f25ebaa706.herokuapp.com/chathub")
      .withAutomaticReconnect()
      .build();

    connect?.start().then(() => {
      console.log("Connected!");
      connect.on("ReceiveMessage", (forumName, messageObject) => {
        if (forumPage === forumName) {
          const messageArrayCopy = [...messages];
          messageArrayCopy.push(messageObject);
          setMessages((prev) => {
            const copy = [...prev];
            copy.push(messageObject);

            return copy;
          });
        }
      });
      setSocketConnection(connect);
    });

    return () => {
      connect.stop();
    };
  }, []);

  return {
    socketConnection,
  };
}
