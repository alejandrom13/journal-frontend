"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogMood from "./log-mood";
import CreateCalendarEntry from "../calendar/create-calendar";

const MenuEntry: React.FC = () => {
  const [block, setBlock] = React.useState("none");

  return (
    <motion.div
      className="z-50"
      initial={{ height: 0 }}
      animate={{ height: "200px", width: "600px" }}
      exit={{ height: 0, width: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.1,
      }}
      layout
    >
      <motion.div
        className="relative overflow-visible flex flex-col bg-white/50 rounded-[35px] h-[180px] p-4 shadow-lg z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        layout
      >
        {block === "none" ? (
          <>
            <Button
              variant="ghost"
              className={`rounded-2xl group text-slate-800 py-3 h-16 justify-start gap-3 text-md w-full transition-all duration-200 hover:bg-white 
          hover:text-primary`}
              onClick={() => {
                setBlock("mood");
              }}
              asChild
            >
              <Button variant={"ghost"}>
                <Icon icon={"ion:happy"} height={20} className="text-primary" />
                Log your Mood
                <span className={`ml-auto text-sm text-black/30`}>
                  Log how you feel today
                </span>
              </Button>
            </Button>
            <Button
              variant="ghost"
              className={`rounded-2xl group text-slate-800 py-3 h-16 justify-start gap-3 text-md w-full transition-all duration-200 hover:bg-white 
          hover:text-primary`}
              onClick={() => {}}
              asChild
            >
              <Button variant={"ghost"}>
                <Icon
                  icon={"basil:invoice-solid"}
                  height={20}
                  className="text-primary"
                />
                Upload Receipt
                <span className={`ml-auto text-sm text-black/30`}>
                  COMING SOON
                </span>
              </Button>
            </Button>

            <Button
              variant="ghost"
              className={`rounded-2xl group text-slate-800 py-3 h-16 justify-start gap-3 text-md w-full transition-all duration-200 hover:bg-white 
          hover:text-primary`}
              onClick={() => {
                setBlock("event");
              }}
              asChild
            >
              <Button variant={"ghost"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  className="svg-icon"
                  fill="currentColor"
                >
                  <path d="M0,19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10H0Zm17-4.5A1.5,1.5,0,1,1,15.5,16,1.5,1.5,0,0,1,17,14.5Zm-5,0A1.5,1.5,0,1,1,10.5,16,1.5,1.5,0,0,1,12,14.5Zm-5,0A1.5,1.5,0,1,1,5.5,16,1.5,1.5,0,0,1,7,14.5Z" />
                  <path d="M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V8H24V7A5.006,5.006,0,0,0,19,2Z" />
                </svg>
                Create Event
                <span className={`ml-auto text-sm text-black/30`}>
                  COMING SOON
                </span>
              </Button>
            </Button>
          </>
        ) : block === "upload" ? (
          <></>
        ) : block === "mood" ? (
          <>
            <LogMood />
          </>
        ) : block === "event" ? (
          <>
          <CreateCalendarEntry />
          </>
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default MenuEntry;
