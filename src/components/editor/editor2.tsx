import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "./styles.css";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";

interface EditorProps {
  value?: any;
  onChange: (data: any) => void;
  disableToolbar?: boolean;
}

const Editor2: React.FC<EditorProps> = ({
  value,
  onChange,
  disableToolbar = true,
}) => {
  return (
    <MinimalTiptapEditor
      value={value}
      onValueChange={(val: string) => {
        onChange(val);
      }}
      outputValue="json"
      disabled={false}
      contentClass=""
      disableToolbar={disableToolbar}
    />
  );
};

export default Editor2;
