import React from "react";

type Props = {
  message: {
    name: string;
    message: string;
  };
};

const ChatMsg = ({ message }: Props) => {
  return (
    <p className=" items-center mb-2 font-semibold my-4">
      <span className="bg-[#005c4b] text-white p-1 rounded-lg">
        <span className="text-sm text-black tracking-widest">
          {message.name}:
        </span>
        <span className="ml-2 text-sm flex-wrap">{message.message}</span>
      </span>
    </p>
  );
};

export default ChatMsg;
