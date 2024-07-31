import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import "./styles.css";
import { MinimalTiptapEditor } from "../ui/minimal-tiptap";

interface EditorProps {
  value?: any;
  onChange: (data: any) => void;
}

const Editor2: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <MinimalTiptapEditor
      value={value}
      onValueChange={(val:string) => {
        onChange(val);
      }}
      outputValue="json"
      disabled={false}
      contentClass=""
    />
  );
};

export default Editor2;
