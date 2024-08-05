"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import Editor2 from "@/components/editor/editor2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry, updateEntry } from "@/actions/entries";
import queryKey from "@/lib/queryKeys";
import { Button } from "@/components/ui/button";
import DeleteEntryButton from "../delete-entry-button";
import { toast } from "sonner";

const NoteCard = ({ entry, index, id }: any) => {
  const [editorValue, setEditorValue] = useState<any>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { isError, isPending, isSuccess, mutate, data } = useMutation({
    mutationFn: (variables: {
      id: string;
      type: string;
      content: any;
      createdAt: string;
    }) => updateEntry(variables),
    onSuccess: async () => {
      toast.success("Note updated");

      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  useEffect(() => {

    if(isSuccess){
      console.log("Success");
    }
    
  }, [isSuccess]);

  const handleSubmission = () => {
    if (editorValue) {
      const jsonRes = JSON.parse(editorValue);
      mutate({
        id: id,
        type: "note",
        content: jsonRes,
        createdAt: entry?.createdAt,
      });
    } else {
      console.warn("No content to submit");
      // Show a warning to the user here
    }
  };

  useEffect(() => {
    if (entry?.content) {
      const s = JSON.stringify(entry?.content);
      setEditorValue(s);
    }
  }, [entry?.content]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.div
        className="min-h-[150px] group w-full bg-white/40 p-4 rounded-3xl transition-all ease-in hover:bg-white/60 cursor-pointer"
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "linear", delay: index * 0.05 }}
        onClick={toggleModal}
      >
        <div className="flex flex-row items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-icon"
          >
            <path
              d="M17.75 3A3.25 3.25 0 0 1 21 6.25V13h-4.75A3.25 3.25 0 0 0 13 16.25V21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm2.81 11.5-6.06 6.06v-4.31c0-.966.784-1.75 1.75-1.75h4.31Z"
              fill="currentColor"
            />
          </svg>
          <div className="text-sm font-semibold text-primary pl-2">Note</div>
          <div className="ml-2 text-sm text-black/30 opacity-0 group-hover:opacity-100 transition">
            Tap to see more
          </div>
          <div className="ml-auto cursor-pointer">
            <DeleteEntryButton entryId={entry?.id} />
          </div>
        </div>
        <div
          className="pt-2 pb-1  "
          ref={contentRef}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          {editorValue && (
            <MinimalTiptapEditor
              value={JSON.parse(editorValue!)}
              outputValue="json"
              disableToolbar
              disabled
              onValueChange={(val: string) => {}}
            />
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleModal}
          >
            <motion.div
              className="bg-white/80 p-4 rounded-[50px] max-w-2xl w-full m-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="flex flex-col bg-white/80 rounded-[35px] p-4 shadow-lg h-[40vh] z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                layout
              >
                <div className="overflow-y-scroll overflow-x-hidden">
                  <Editor2
                    value={JSON.parse(editorValue)}
                    onChange={(val: string) => {
                      setEditorValue(val);
                    }}
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
                    {isPending ? <div className="">Updating...</div> : "Update"}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteCard;
