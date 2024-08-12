"use client";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "ai/react";
import ChatBubble from "./chat-bubble";
import {
  ArrowRight,
  CalendarIcon,
  Info,
  LucideCheckCircle,
  LucideLoader2,
} from "lucide-react";
import Image from "next/image";
import { useDateStore } from "@/app/states/calendarState";
import { AnimatePresence, motion } from "framer-motion";
import messagestest from "./chat_examples";
import ScrollToBottom from "react-scroll-to-bottom";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@/lib/queryKeys";
import { generateCustomQuestions } from "@/actions/ai";
import MainLogo2 from "@/lib/logo2";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns-tz";
import moment from "moment";
import { Entry } from "@/lib/entryType";
import { getAllEntriesByRange } from "@/actions/entries";

const ChatUI = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [chatHeight, setChatHeight] = useState<number>(0);

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const [dateRange, setDateRange] = useState({
    from: now,
    to: now,
  });

  const {
    isLoading: entriesLoading,
    isError: entriesError,
    data: entriesData,
    isSuccess: entriesSuccess,
  } = useQuery<Entry[]>({
    queryKey: [queryKey.ALL_ENTRIES_RANGE, dateRange],
    queryFn: () => getAllEntriesByRange(dateRange),
    enabled: !!dateRange,
    retry: 1,
  });

  const [preDateRange, setPreDateRange] = useState({
    from: now,
    to: now,
  });

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    data,
    isLoading,
    append,
  } = useChat({
    api: "api/chat",
    body: {
      from: dateRange.from,
      to: dateRange.to,
      currentDay: now,
      data: entriesData,
    },
  });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    isLoading: isQuestionsLoading,
    isError: isQuestionsError,
    data: questions,
    isFetching: isQuestionsFetching,
    isSuccess: isQuestionsSuccess,
  } = useQuery<any>({
    queryKey: [queryKey.CUSTOM_QUESTIONS, data],
    queryFn: () =>
      generateCustomQuestions(messages[messages.length - 1].content),
    enabled: () => {
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        return lastMessage.role !== "user";
      }
      return false;
    },
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [displayedMonth, setDisplayedMonth] = useState<Date>(new Date());

  return (
    <div className={`flex flex-col h-full`}>
      <div className="flex flex-row  items-start pt-4 pl-4">
        <Popover open={popoverOpen}>
          <AnimatePresence>
            <PopoverTrigger asChild>
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                id="onborda-step2"
              >
                <Button
                  variant={"outline"}
                  className="border-none  rounded-full font-semibold text-md text-primary hover:text-primary"
                  onClick={() => setPopoverOpen((prev) => !prev)}
                >
                  <CalendarIcon className="mr-2" size={20} />
                  {moment(dateRange.from).format("MMM DD")} -
                  {moment(dateRange.to).format("MMM DD")}
                </Button>
              </motion.div>
            </PopoverTrigger>
          </AnimatePresence>

          <PopoverContent className="w-auto p-4 bg-white/40 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl">
            <DayPicker
              mode="range"
              captionLayout="dropdown"
              numberOfMonths={1}
              style={{
                width: "auto",
                backgroundColor: "transparent",
              }}
              selected={{
                from: preDateRange.from,
                to: preDateRange.to,
              }}
              onSelect={(selected, triggerDate, modifiers, e) => {
                setPreDateRange({
                  from: selected?.from!,
                  to: selected?.to!,
                });
                if(selected?.from && selected?.to === undefined) {
                  setPreDateRange({
                    from: selected?.from!,
                    to: selected?.from!,
                  });
                }
              }}
              min={1}
              max={31}
              required
              excludeDisabled
              month={displayedMonth}
              onMonthChange={(month) => setDisplayedMonth(month)}
              showOutsideDays
            />

            <div className="w-full pt-4">
              <Button
                variant={"default"}
                className="w-full rounded-full"
                onClick={() => {
                  setPopoverOpen(false);

                  setDateRange({
                    from: preDateRange?.from!,
                    to: preDateRange?.to!,
                  });
                }}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <div className="ml-2  flex flex-row gap-2 h-full items-center px-2 ">
          {entriesSuccess ? (
            <>
              <LucideCheckCircle className="w-4 h-4 text-primary" />
              <p className="text-sm">Context successfully loaded.</p>
            </>
          ) : (
            <>
              <LucideLoader2 className="w-4 h-4 text-primary animate-spin" />
              <p className="text-sm">Context is being loaded.</p>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((message: any) => (
          <motion.div
            key={message.id}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.05 * message.id,
            }}
          >
            {message.role === "user" ? (
              <ChatBubble message={message.content} from="user" dir="right" />
            ) : (
              <ChatBubble message={message.content} from="jana" dir="left" />
            )}
          </motion.div>
        ))}
        {isLoading && (
          <div className="ml-4 flex flex-row gap-2">
            <div className="w-2 h-2 rounded-full bg-black/10 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-black/10 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-black/10 animate-pulse"></div>
          </div>
        )}

        <div ref={messagesEndRef} />

        {messages.length === 0 && (
          <div className="w-full bg-primary/10 p-4 rounded-2xl flex flex-row gap-4 items-center">
            <MainLogo2 height={40} />
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-primary">Jana</h3>
              <p className="text-md text-primary">
                I can help with today{"'"}s journal entries. Ask me anything!{" "}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-row flex-wrap w-fit gap-2 bg-transparent pt-6">
          {!data && (
            <>
              <Button
                className="rounded-full bg-transparent border-primary/50"
                variant={"outline"}
                onClick={() => {
                  append({
                    id: (messages.length + 1).toString(),
                    content: " What have I done today??",
                    role: "user",
                  });
                }}
              >
                What have I done today?
              </Button>

              <Button
                className="rounded-full bg-transparent border-primary/50"
                variant={"outline"}
                onClick={() => {
                  append({
                    id: (messages.length + 1).toString(),
                    content: "Do you have any reflections for me??",
                    role: "user",
                  });
                }}
              >
                Do you have any reflections for me?
              </Button>
            </>
          )}
          {questions && (
            <>
              {questions.map((question: any, index: any) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.05 * index,
                  }}
                >
                  <Button
                    key={index}
                    className="rounded-full bg-transparent border-primary/50"
                    variant={"outline"}
                    onClick={() => {
                      append({
                        id: (messages.length + 1).toString(),
                        content: question,
                        role: "user",
                      });
                    }}
                  >
                    {question}
                  </Button>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      <div className="px-4 pb-4">
        <form onSubmit={handleSubmit} className="mt-auto">
          <div
            className={`group parent flex flex-row gap-4 p-4 rounded-xl transition-all bg-white/50 
          ${
            isFocused
              ? "bg-white/60 rounded-[34px] shadow-lg"
              : "hover:bg-white/60 hover:shadow-lg"
          }
          duration-300`}
          >
            <Input
              className="bg-transparent  text-[16px]  w-full h-10 focus-within:outline-none transition-none"
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
              className={`rounded-lg child transition-all 
            ${isFocused ? "rounded-[20px]" : ""}
            duration-300`}
              type="submit"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;
