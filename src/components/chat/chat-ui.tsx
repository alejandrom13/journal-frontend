"use client";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import ChatBubble from "./chat-bubble";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const ChatUI = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [chatHeight, setChatHeight] = useState<number>(0);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/chat",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (chatContainerRef.current) {
        const windowHeight = window.innerHeight;
        const containerTop = chatContainerRef.current.getBoundingClientRect().top;
        const newHeight = windowHeight - containerTop;
        setChatHeight(newHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleButtonClick = (message: string) => {
    handleInputChange({
      target: { value: message },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={`px-4 md:px-0 flex flex-col`}
      style={{ height: `${chatHeight - 50}px` }}
    >
      <ScrollArea className="flex-grow overflow-y-auto" ref={chatContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className="w-full">
            {message.role === "user" ? (
              <ChatBubble message={message.content} from="user" dir="right" />
            ) : (
              <ChatBubble
                message={message.content}
                from="jana"
                dir="left"
              />
            )}
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="mt-auto">
        <div
          className={`group parent flex flex-row gap-4 p-4 rounded-xl transition-all bg-white/50 
          ${
            isFocused
              ? "bg-white/60 rounded-[40px] shadow-lg"
              : "hover:bg-white/60 hover:shadow-lg"
          }
          duration-300`}
        >
          <Input
            className="bg-transparent border-none text-[16px] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
            type="text"
            name="prompt"
            id="input"
            placeholder="Ask anything about you..."
            autoComplete="off"
            autoFocus
            value={input}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Button
            className={`rounded-xl child transition-all 
            ${isFocused ? "rounded-[20px]" : ""}
            duration-300`}
            type="submit"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;