"use client";
import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import queryKey from "@/lib/queryKeys";
import { simulateKeyPress } from "@/lib/utils";

const CreateCalendarEntry: React.FC = () => {

  return (
    <motion.div
      className="z-50"
      initial={{ height: 0 }}
      animate={{ height: "110px", width: "600px" }}
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
        className="relative overflow-visible flex flex-col bg-white/50 rounded-[35px] h-[80px] p-4 shadow-lg z-30 items-center justify-center" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        layout
      >
          <div className="">
          <h6 className="font-medium text-md text-black/60">Creating Calendar Entries will be available soon</h6>
          </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateCalendarEntry;
