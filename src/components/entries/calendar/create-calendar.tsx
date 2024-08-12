"use client";
import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "@wavesurfer/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import queryKey from "@/lib/queryKeys";
import { simulateKeyPress } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/actions/calendar";

const CreateCalendarEntry: React.FC = () => {
  const client = useQueryClient();

  const { isPending, isSuccess, isError, data, mutate } = useMutation({
    mutationKey: [queryKey.CREATE_EVENT],
    mutationFn: async () => {
      createEvent({
        type: "event",
        content: {
          summary: "Meeting with John",
          description: "Discuss project progress",
          start: {
            dateTime: "2024-08-11T09:00:00-07:00",
            timeZone: "America/Los_Angeles",
          },
          end: {
            dateTime: "2024-08-11T10:00:00-07:00",
            timeZone: "America/Los_Angeles",
          },
        },
        createdAt: new Date().toISOString(),
      });
    },

    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      simulateKeyPress("Escape");
    },
  });

  const handleMutation = () => {
    mutate();
  };

  return (
    <motion.div
      className="z-50"
      initial={{ height: 0 }}
      animate={{ height: "100%", width: "auto" }}
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
        className="relative h-full p-4  items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        layout
      >
        <div className="">
          <h6 className="font-medium text-md text-black/60">
            Creating Calendar Entries will be available soon
          </h6>
          <Button
            variant="default"
            className="mt-4"
            onClick={() => {
              handleMutation();
            }}
          >
            {isPending ? "Creating..." : "Create Calendar Entry"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateCalendarEntry;
