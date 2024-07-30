import { motion } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "@/actions/entries";
import Editor from "../editor/editor";
import { OutputData } from "@editorjs/editorjs";
import { simulateKeyPress } from "@/lib/utils";
import queryKey from "@/lib/queryKeys";

const CreateNote = () => {
  const [editorData, setEditorData] = useState<OutputData | undefined>() as any;

  const editorRef = React.useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { isError, isPending, isSuccess, mutate } = useMutation({
    mutationFn: (variables: { type: string; content: OutputData }) =>
      createEntry(variables),
    onSuccess: () => {
      console.log("Success");
      // Clear the form or show a success message here
      setEditorData(undefined);
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      simulateKeyPress("Escape");
    },
    onError: (error: any) => {
      console.error("Error", error);
      // Show an error message to the user here
    },
  });

  const handleSubmission = () => {
    if (editorData) {
      mutate({ type: "note", content: editorData });
    } else {
      console.warn("No content to submit");
      // Show a warning to the user here
    }
  };

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
          {/* <Editor
            initialValue={value}
            onChange={(value) => {
              setValue(value);
              console.log(value);
            }}
          /> */}

          <Editor
            data={editorData}
            onChange={setEditorData}
            editorRef={editorRef}
          />
        </div>

        <div className="flex flex-col mt-auto">
          {isError && <div>Error</div>}
          <Button
            variant={"ghost"}
            size={"lg"}
            className="text-md rounded-full text-primary hover:text-primary bg-primary/20 hover:bg-primary/30"
            onClick={handleSubmission}
            disabled={isPending}
          >
            {isPending ? <div className="">Saving...</div> : "Save"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateNote;
