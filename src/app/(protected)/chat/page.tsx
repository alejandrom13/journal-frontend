import ChatUI from "@/components/chat/chat-ui";
import ChatUI2 from "@/components/chat/chat-ui2";
import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-full w-full  bg-white/50 rounded-3xl">
      <ChatUI />
      {/* <ChatUI2 /> */}
    </div>
  );
};

export default ChatPage;
