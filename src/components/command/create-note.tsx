import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "@/actions/entries";
import Editor from "../editor/editor";
import { OutputData } from "@editorjs/editorjs";
import { simulateKeyPress } from "@/lib/utils";
import queryKey from "@/lib/queryKeys";
import Editor2 from "../editor/editor2";
import { useDateStore } from "@/app/states/calendarState";
import { useHotkeys } from "react-hotkeys-hook";
import { Icon } from "@iconify/react/dist/iconify.js";

const CreateNote = () => {
  // const [editorData, setEditorData] = useState<OutputData | undefined>() as any;
  const [editorValue, setEditorValue] = useState<string>();
  const queryClient = useQueryClient();

  const { selectedDate, setSelectedDate } = useDateStore();

  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (variables: {
      type: string;
      content: any;
      createdAt: string;
    }) => createEntry(variables),
    onSuccess: () => {
      setEditorValue(undefined);
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      simulateKeyPress("Escape");
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  const handleSubmission = () => {
    if (editorValue) {
      // const jsonRes = JSON.parse(editorValue);
      mutate({
        type: "note",
        content: {
          text: editorValue
        },
        createdAt: selectedDate.toISOString(),
      });
    } else {
      console.warn("No content to submit");
      // Show a warning to the user here
    }
  };

  useHotkeys("ctrl+enter", () => handleSubmission(), {
    enableOnFormTags: true,
    enableOnContentEditable: true,
  });

  return (
    <motion.div
      className="z-50"
      initial={{ height: 0 }}
      animate={{ height: "350px", width: "600px" }}
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
        className="flex flex-col bg-white/50 rounded-[35px] p-4 shadow-lg h-[330px] z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        layout
      >
        <div className="overflow-y-scroll overflow-x-hidden">
     
          <Editor2
            value={editorValue}
            onChange={(val: string) => {
              setEditorValue(val);
              console.log(val);
            }}
          />
        </div>
        <div className="flex flex-col mt-auto">
          <p className="text-xs flex justify-center pb-2  text-black/50">
            {selectedDate.toDateString()}
          </p>

          {isError && <div>Error</div>}
          <Button
            variant={"ghost"}
            size={"lg"}
            className="text-md rounded-full text-primary hover:text-primary bg-primary/20 hover:bg-primary/30 relative group"
            onClick={handleSubmission}
            disabled={isPending}
          >
            {isPending ? (
              <div className="">Saving...</div>
            ) : (
              <div className="">
                Save
                <span className="text-sm text-primary/70 ml-2 opacity-0 group-hover:opacity-100 duration-200 flex flex-row items-center absolute right-4 bottom-3">
                  Ctrl +{" "}
                  <Icon icon={"uil:enter"} height={15} className="ml-2" />
                </span>
              </div>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateNote;
