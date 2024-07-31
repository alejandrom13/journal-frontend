import React, { useEffect, useState } from "react";
import Editor from "@/components/editor/editor";
import { OutputData } from "@editorjs/editorjs";
import { motion } from "framer-motion";
import { EditorContent, JSONContent } from "@tiptap/react";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import ReadTipTapEditor from "@/components/ui/minimal-tiptap/readOnlyTipTap";

const NoteCard = ({ entry, index }: any) => {
  // const [value, setValue] = useState<JSONContent>(entry?.content);
  // const [editorData, setEditorData] = useState<OutputData | undefined>();
  const [editorData, setEditorData] = useState<any>();
  // const editorRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entry?.content) {
      const s = JSON.stringify(entry?.content);
      setEditorData(s);
    }
  }, [entry?.content]);

  return (
    <motion.div
      className="w-full bg-white/40 p-4 rounded-3xl transition-all ease-in "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "linear", delay: index * 0.05 }}
    >
      <div className="flex flex-row items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className=""
        >
          <path
            d="M17.75 3A3.25 3.25 0 0 1 21 6.25V13h-4.75A3.25 3.25 0 0 0 13 16.25V21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm2.81 11.5-6.06 6.06v-4.31c0-.966.784-1.75 1.75-1.75h4.31Z"
            fill="#3379E3"
          />
        </svg>
        <div className="text-sm font-semibold text-[#3379E3] pl-2">Note</div>
      </div>
      <div className="pt-2 pb-1 ">
        {/* <Editor
          data={editorData}
          onChange={setEditorData}
          editorRef={editorRef}
          readonly
          updateMode
          minHeight
        /> */}

        {editorData && (
          <MinimalTiptapEditor
            value={JSON.parse(editorData)}
            outputValue="json"
            disableToolbar
            disabled
            onValueChange={(val: string) => {}}
          />
        )}

        {/* {editorData && (
          <pre>{JSON.stringify(JSON.parse(editorData), null, 2)}</pre>
        )} */}
      </div>
      {/* <pre>{JSON.stringify(editorData.blocks)}</pre> */}
      {/* <span className="text-sm text-black/40">
        {moment(entry?.created_at).format("MMMM DD YYYY, h:mm a")}
      </span> */}
    </motion.div>
  );
};

export default NoteCard;
