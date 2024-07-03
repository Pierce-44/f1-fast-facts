"use client";
import { Forum, Message } from "@/util/fetchForums";
import { useParams } from "next/navigation";
import React from "react";
import * as atoms from "@/util/atoms";
import { useAtom } from "jotai";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginPopUp from "./loginPopUp";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

interface Props {
  forumsArray: Forum[];
}

export default function ForumPage({ forumsArray }: Props) {
  const { user, isLoading } = useUser();

  const params = useParams();

  const forumPage = params?.forum
    ? (params.forum as any).replace(/%20/g, " ")
    : "";

  const [forumMessage, setForumMessage] = React.useState("");

  const [loginPopUp, setLoginPopUp] = React.useState(false);

  const [socketConnection, setSocketConnection] =
    React.useState<HubConnection>();

  const handleInputChange = (event: any) => {
    if (!user) {
      setLoginPopUp(true);
      return;
    }

    setForumMessage(event.target.value);
  };

  const handleSubmit = (event: any) => {
    if (!user || !socketConnection) {
      setLoginPopUp(true);
      return;
    }

    event.preventDefault();

    const forumName = forumPage;
    const userName = user.name;
    const userImage = user.picture;
    const timestamp = Math.floor(new Date().getTime() / 1000);

    socketConnection
      .invoke(
        "SendMessage",
        forumName,
        userName,
        userImage,
        forumMessage,
        timestamp
      )
      .catch(function (err) {
        return console.error(err.toString());
      });
  };

  const [showMenuButton, setShowMenuButton] = React.useState(false);

  const handleResize = () => {
    if (window && window?.innerWidth <= 1080) {
      setShowMenuButton(true);
    } else {
      setShowMenuButton(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [, setOpenForumSideBar] = useAtom(atoms.openForumSideBar);

  React.useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl("http://localhost:5041/chathub")
      .withAutomaticReconnect()
      .build();

    connect?.start().then(() => {
      console.log("Connected!");
      connect.on("ReceiveMessage", (forumName, messageObject) => {
        // setMessages(prevMessages => [...prevMessages, message]);
        console.log("Message reseived!", forumName, messageObject);

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

  const [messages, setMessages] = React.useState<Message[]>([]);

  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const currentForum = forumsArray.filter(
      (forum) => forum.forumName === forumPage
    )[0];

    if (!currentForum) return;

    setMessages(currentForum.messages);
  }, [forumPage]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, scrollRef.current, scrollRef.current?.scrollHeight]);

  return (
    <div className="w-full ">
      {loginPopUp ? <LoginPopUp setLoginPopUp={setLoginPopUp} /> : ""}
      {/* <a href="/api/auth/logout">Login</a> */}
      <div className="px-8 py-6 text-base sm:text-lg lg:text-2xl text-gray-800 border-b border-gray-200 dark:border-gray-700 dark:text-gray-100 transition-colors duration-500 flex gap-5">
        {showMenuButton ? (
          <button
            onClick={() => {
              setOpenForumSideBar(true);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="h-8 w-8 fill-gray-900 dark:fill-gray-400"
            >
              <path d="M140-260v-60h488.46v60H140Zm637.85-38.08L595.15-480l182.7-181.54L820-619.38 679.46-480 820-340.23l-42.15 42.15ZM140-450v-60h371.54v60H140Zm0-190v-60h488.46v60H140Z" />
            </svg>
          </button>
        ) : (
          ""
        )}
        <p>
          {forumPage
            ? `2024 - ${forumPage?.replace(/_/g, " ")}`
            : "F1 Fast Facts - 2024 Forums"}{" "}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="p-2 h-[calc(100%-151px)] overflow-y-scroll space-y-10"
      >
        {!isLoading ? (
          messages.map((message, index) => {
            return (
              <div key={index}>
                {message.username === user?.name ? (
                  <YourMessage message={message} />
                ) : (
                  <OtherUserMessage message={message} />
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>

      {!forumPage ? (
        <></>
      ) : (
        <div className="bg-white dark:bg-dark transition-all duration-500">
          <div className="p-2 mb-2 w-full">
            <form onSubmit={handleSubmit} className="mx-auto">
              <label
                // for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Send
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="w-6 h-6 fill-gray-500 dark:fill-gray-400 "
                  >
                    <path d="M140-190v-580l688.46 290L140-190Zm60-90 474-200-474-200v147.69L416.92-480 200-427.69V-280Zm0 0v-400 400Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="default-send-forum"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Send a message"
                  required
                  value={forumMessage}
                  onChange={handleInputChange}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function returnTimeSinceMessage(timestamp: number) {
  // Convert the given timestamp to milliseconds
  const timestampInMs = timestamp * 1000;

  // Create a Date object using the timestamp in milliseconds
  const date = new Date(timestampInMs);

  // Array of month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract and format the day, month, year, and time
  const day = String(date.getDate()).padStart(2, "0");
  const month = monthNames[date.getMonth()]; // Get month name from array
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine date and time into the desired format
  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

  return formattedDate;
}

interface MessageProps {
  message: Message;
}

function OtherUserMessage({ message }: MessageProps) {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row">
        <img
          className="object-contain sm:h-12 sm:w-12 h-8 w-8 rounded-full"
          referrerPolicy="no-referrer"
          src={message.userImage}
          alt=""
        />
        <div className="sm:pl-4  w-full lg:w-[80%]">
          <p className="text-xs text-gray-500 font-semibold sm:pl-2 pt-2 sm:pt-0">{`${message.username}, ${returnTimeSinceMessage(message.timeStamp)}`}</p>
          <p className=" bg-[#ebf3fe] dark:bg-darkOffset transition-all duration-500 dark:text-gray-400 sm:ml-2 mt-2 p-4 rounded-md text-gray-800 text-sm sm:text-base">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function YourMessage({ message }: MessageProps) {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="flex flex-col justify-end w-full lg:max-w-[80%] ml-auto sm:pr-6">
          <p className="text-xs text-gray-500 font-semibold pl-2 text-right">{`Pierce, ${returnTimeSinceMessage(1719851133)}`}</p>
          <p className=" bg-[#d0f7d4] sm:ml-2 mt-2 p-4 rounded-md text-gray-800 dark:bg-[#779c7b] dark:text-gray-800 transition-all duration-500 text-sm sm:text-base">
            {message.content}
          </p>
        </div>
        <img
          className="object-contain sm:h-12 sm:w-12 h-8 w-8 rounded-full"
          referrerPolicy="no-referrer"
          src={message.userImage}
          alt=""
        />
      </div>
    </div>
  );
}
