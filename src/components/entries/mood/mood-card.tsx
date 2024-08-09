"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { useQueryClient } from "@tanstack/react-query";

import DeleteEntryButton from "../delete-entry-button";
import { useKeystrokeState } from "@/app/states/keyStrokeState";
import { useDateStore } from "@/app/states/calendarState";
import HappyEmoji from "@/lib/emojis/happy";
import CalmEmoji from "@/lib/emojis/calm";
import SadEmoji from "@/lib/emojis/sad";
import MadEmoji from "@/lib/emojis/mad";
import StressEmoji from "@/lib/emojis/stress";
import AnxietyEmoji from "@/lib/emojis/anxiety";

const MoodCard = ({ entry, index, id }: any) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        className="min-h-[150px] group w-full bg-white/40 p-4 rounded-3xl transition-all ease-in hover:bg-white/60 cursor-pointer"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "linear", delay: index * 0.05 }}
      >
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={"w-5 h-5 svg-icon"}
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0ZM6,10a2,2,0,0,1,4,0c0,1-.895,1-2,1S6,11,6,10Zm10,7H8a1,1,0,0,1,0-2h8a1,1,0,0,1,0,2Zm0-6c-1.105,0-2,0-2-1a2,2,0,0,1,4,0C18,11,17.105,11,16,11Z"
            />
          </svg>{" "}
          <div className="text-sm font-semibold text-primary pl-2">Mood</div>
          <div className="ml-auto cursor-pointer">
            <DeleteEntryButton entryId={entry?.id} />
          </div>
        </div>
        <div
          className="pt-2 pb-1 "
          ref={contentRef}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div className="w-full flex flex-row gap-4 items-center h-[90px] bg-white/50 p-4 rounded-2xl">
            {returnMoodComponent(entry?.content?.mood)}

            <div className="flex flex-col">
              <p className="text-lg font-semibold">{entry?.content?.mood}</p>
              <p className="text-sm text-black/50">
                {new Date(entry?.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MoodCard;

function returnMoodComponent(mood: string) {
  switch (mood.toLowerCase()) {
    case "happy":
      return <HappyEmoji className="h-10 w-10" />;
    case "calm":
      return <CalmEmoji className="h-10 w-10" />;
    case "sad":
      return <SadEmoji className="h-10 w-10" />;
    case "angry":
      return <MadEmoji className="h-10 w-10" />;
    case "stressed":
      return <StressEmoji className="h-10 w-10" />;
    case "anxious":
      return <AnxietyEmoji className="h-10 w-10" />;
    default:
      return <HappyEmoji className="h-10 w-10" />;
  }
}
