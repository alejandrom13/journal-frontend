import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { JSONContent } from "@tiptap/core";

interface TipTapEditorProps {
  initialContent: JSONContent | string;
  readOnly?: boolean;
  onUpdate?: (content: JSONContent) => void;
}

const ReadTipTapEditor: React.FC<TipTapEditorProps> = ({
  initialContent,
  readOnly = true,
  onUpdate,
}) => {
  const [content, setContent] = useState<JSONContent | string>(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      setContent(newContent);
      if (onUpdate) {
        onUpdate(newContent);
      }
    },
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return <EditorContent editor={editor} />;
};

export default ReadTipTapEditor;
