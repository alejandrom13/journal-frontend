"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { useQueryClient } from "@tanstack/react-query";

import DeleteEntryButton from "../delete-entry-button";
import { useKeystrokeState } from "@/app/states/keyStrokeState";
import { useDateStore } from "@/app/states/calendarState";
import NoteUpdateModal from "./note-update-modal";

const NoteCardV2 = ({ entry, index, id }: any) => {
  const [editorValue, setEditorValue] = useState<any>();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { setEnableKeyStroke } = useKeystrokeState();
  const { selectedDate, setSelectedDate } = useDateStore();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setEnableKeyStroke(!isOpen);
  }, [isOpen, setEnableKeyStroke]);

  useEffect(() => {
    if (entry?.content) {
    //   const s = JSON.stringify(entry?.content);
      setEditorValue(entry?.content?.text);
    }
  }, [entry?.content]);

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
          className="pt-2 pb-1 "
          ref={contentRef}
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        >
          {editorValue && (
            <MinimalTiptapEditor
              value={editorValue}
              outputValue="html"
              disableToolbar
              disabled
              onValueChange={(val: string) => {
                setEditorValue(val);
              }}
            />
          )}
        </div>
      </motion.div>

      <NoteUpdateModal
        isOpen={isOpen}
        entry={entry}
        setIsOpen={setIsOpen}
        setValue={setEditorValue}
      />
    </>
  );
};

export default NoteCardV2;
