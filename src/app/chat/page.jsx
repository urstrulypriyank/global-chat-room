"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMsg from "../components/ChatMsg";
let socket;
export default function Page() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_DOMAIN, {
      path: "/api/server",
      addTrailingSlash: false,
    });
    socket.on("connect", () => {
      console.log("connected ");
    });
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
    return () => socket.disconnect();
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    // Send the message to the server
    socket.emit("message", currentMessage);
    // Clear the currentMessage state
    setCurrentMessage("");
  };
  return (
    <div
      className="flex flex-col min-h-screen w-screen 
   bg-[#21323c]"
    >
      {/* top container */}
      <div
        className="flex
      h-[10vh]
      border-b-0 bg-[#212b32] 
      w-full  
      shadow-xl 
      justify-center items-center
      "
      >
        <div className=" flex px-2 space-x-10">
          <h2 className="text-2xl font-bold">
            Global Chat Room{"  "}(userName)
          </h2>
        </div>
      </div>

      {/* chats container */}
      <div className="h-[80vh] w-full overflow-y-scroll py-2 px-7">
        {/* Display the messages */}
        {messages.map((message, index) => (
          <ChatMsg message={{ name: message, message }} />
        ))}
      </div>
      {/* forms container */}
      <div className="h-[10vh] w-[97vw] mx-auto ">
        <form className="grid grid-cols-9 w-full mx-auto ">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type here..."
            className=" rounded-xl p-2 text-black col-span-7 "
          />

          {/* Button to submit the new message */}
          <button
            type="submit"
            onClick={sendMessage}
            className="border rounded-md mx-2 py-1 col-span-2 "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
