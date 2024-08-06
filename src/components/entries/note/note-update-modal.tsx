"use client";
import { updateEntry } from "@/actions/entries";
import { useDateStore } from "@/app/states/calendarState";
import { useKeystrokeState } from "@/app/states/keyStrokeState";
import Editor2 from "@/components/editor/editor2";
import { Button } from "@/components/ui/button";
import queryKey from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UpdateEntryVariables {
  id: string;
  type: string;
  content: any;
  updatedAt: string;
}

const NoteUpdateModal = ({ entry, setIsOpen, isOpen, setValue }: any) => {
  const queryClient = useQueryClient();
  const [editorValue, setEditorValue] = useState<any>();
  const [updated, setUpdated] = useState(false);
  const { selectedDate } = useDateStore();

  const { isError, isPending, isSuccess, mutate, data } = useMutation({
    mutationKey: ["updateEntry", entry?.id],
    mutationFn: ({ id, type, content, updatedAt }: UpdateEntryVariables) =>
      updateEntry({
        id,
        type,
        content,
        updatedAt,
      }),
    onSuccess: () => {
      setIsOpen(false);
      toast.success("Note updated");
      queryClient.resetQueries({
        queryKey: [queryKey.ALL_ENTRIES],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ALL_ENTRIES, selectedDate],
      });
    },
    onError: (error: any) => {
      console.error("Error", error);
    },
  });

  useEffect(() => {
    if (entry?.content) {
      const s = JSON.stringify(entry?.content);
      setEditorValue(s);
    }
  }, [entry?.content]);

  const handleSubmission = () => {
    if (editorValue) {
      const jsonRes = JSON.parse(editorValue);
      mutate({
        id: entry?.id,
        type: "note",
        content: jsonRes,
        updatedAt: entry?.createdAt,
      });
    } else {
      console.warn("No content to submit");
      // Show a warning to the user here
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
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
  );
};

export default NoteUpdateModal;
