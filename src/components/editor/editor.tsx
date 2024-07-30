import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import './styles.css'

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  editorRef?: React.RefObject<HTMLDivElement>;
  readonly?: boolean;
  updateMode?: boolean;
  minHeight?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  data,
  onChange,
  editorRef,
  readonly = false,
  updateMode = false,
  minHeight = false,
}) => {
  const instanceRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const startEditor = async () => {
      if (!instanceRef.current && editorRef?.current) {
        instanceRef.current = new EditorJS({
          readOnly: readonly,
          minHeight: minHeight ? 0 : 200,
          autofocus: true,
          holder: editorRef.current,
          tools: {
            header: Header,
            list: List,
          },
          
          data: data,
          onChange: async () => {
            const content = await instanceRef.current!.save();
            onChange(content);
          },
        });
      }

      return () => {
        if (instanceRef.current) {
          instanceRef.current.destroy();
          instanceRef.current = null;
        }
      };
    };
    startEditor();
  }, [data, editorRef, minHeight, onChange, readonly]);

  useEffect(() => {
    const updateEditorData = async () => {
      if (instanceRef.current && data) {
        try {
          await instanceRef.current.isReady;
          await instanceRef.current.render(data);
        } catch (error) {
          console.error("Error rendering editor data:", error);
        }
      }
    };
    if (updateMode) {
      updateEditorData();
    }
  }, [data, updateMode]);

  return (
    <div
      ref={editorRef}
      style={{
        position: "relative",
        zIndex: 0,
      }}

    >

    </div>


  );
};

export default Editor;
