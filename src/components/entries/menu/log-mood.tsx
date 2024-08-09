import { createEntry } from "@/actions/entries";
import { useDateStore } from "@/app/states/calendarState";
import { DockDemo } from "@/components/ui/dock";
import AnxietyEmoji from "@/lib/emojis/anxiety";
import CalmEmoji from "@/lib/emojis/calm";
import HappyEmoji from "@/lib/emojis/happy";
import MadEmoji from "@/lib/emojis/mad";
import SadEmoji from "@/lib/emojis/sad";
import StressEmoji from "@/lib/emojis/stress";
import queryKey from "@/lib/queryKeys";
import { simulateKeyPress } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { color, motion } from "framer-motion";
import React from "react";

const MoodList = [
  {
    name: "Sad",
    emoji: (
      <SadEmoji className="h-full w-full hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100" />
    ),
    color: "#F6DF50",
  },
  {
    name: "Happy",
    emoji: (
      <HappyEmoji className="h-full w-full hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100" />
    ),
    color: "#F6DF50",
  },
  {
    name: "Angry",
    emoji: (
      <MadEmoji className="h-full w-full hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100" />
    ),
    color: "#F6DF50",
  },
  {
    name: "Calm",
    emoji: (
      <CalmEmoji className="h-full w-full hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100" />
    ),
  },
  {
    name: "Anxious",
    emoji: (
      <AnxietyEmoji
        className="h-full w-full hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100"
        onClick={() => {
          // your click handler code here
        }}
      />
    ),
  },
  {
    name: "Stressed",
    emoji: (
      <StressEmoji
        className="h-full w-fullxxx hover:scale-125 transition-all shadow-none  rounded-full cursor-pointer active:scale-100"
        onClick={() => {
          // your click handler code here
        }}
      />
    ),
  },
];

const LogMood = () => {
  const { selectedDate, setSelectedDate } = useDateStore();
  const queryClient = useQueryClient();

  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (variables: {
      type: string;
      content: any;
      createdAt: string;
    }) => createEntry(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      simulateKeyPress("Escape");
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  const handleSubmission = (emotion: string) => {
    mutate({
      type: "mood",
      content: {
        mood: emotion,
      },
      createdAt: selectedDate.toISOString(),
    });
  };

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      <div className="w-full flex flex-row gap-8 justify-center h-full items-center p-2">
        {MoodList.map((mood, index) => {
          const { emoji, name, color } = mood;
          return (
            <div
              key={index}
              className="flex flex-col gap-2 group justify-center items-center"
              onClick={() => handleSubmission(name)}
            >
              <>{emoji}</>
              <p className="text-sm text-black/50">{name}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LogMood;
