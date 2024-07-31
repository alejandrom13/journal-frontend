"use client";
import type { Editor as TiptapEditor } from "@tiptap/core";
import { useEditor, EditorContent, ReactNodeViewRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SectionOne from "./section-1";
import SectionTwo from "./section-2";
import SectionThree from "./section-3";
import SectionFour from "./section-4";
import { ImageViewBlock } from "./image/image-view-block";
import { LinkBubbleMenu } from "./bubble-menu/link-bubble-menu";
import { Plugin, TextSelection } from "@tiptap/pm/state";
import { getMarkRange } from "@tiptap/core";
import { getOutput } from "../utils";
import { ImageBubbleMenu } from "./bubble-menu/image-bubble-menu";
import { forwardRef, useEffect } from "react";

export interface MinimalTiptapProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value?: string | null;
  outputValue?: "html" | "json" | "text";
  disabled?: boolean;
  contentClass?: string;
  disableToolbar?: boolean;
  onValueChange: (value: any) => void;
}

const MinimalTiptapEditor = forwardRef<HTMLDivElement, MinimalTiptapProps>(
  (
    {
      value,
      outputValue = "json",
      disabled,
      contentClass,
      onValueChange,
      className,
      disableToolbar = false,
      ...props
    },
    ref
  ) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Image.extend({
          addNodeView() {
            return ReactNodeViewRenderer(ImageViewBlock);
          },
        }),
        Link.configure({
          openOnClick: false,
        }).extend({
          // https://github.com/ueberdosis/tiptap/issues/2571
          inclusive: false,

          addProseMirrorPlugins() {
            return [
              new Plugin({
                // mark the link
                props: {
                  handleClick(view, pos) {
                    const { schema, doc, tr } = view.state;
                    const range = getMarkRange(
                      doc.resolve(pos),
                      schema.marks.link
                    );

                    if (!range) {
                      return;
                    }

                    const { from, to } = range;
                    const start = Math.min(from, to);
                    const end = Math.max(from, to);

                    if (pos < start || pos > end) {
                      return;
                    }

                    const $start = doc.resolve(start);
                    const $end = doc.resolve(end);
                    const transaction = tr.setSelection(
                      new TextSelection($start, $end)
                    );

                    view.dispatch(transaction);
                  },
                },
              }),
            ];
          },
        }),
      ],
      editorProps: {
        attributes: {
          class:
            "prose mx-auto focus:outline-none max-w-none prose-stone dark:prose-invert",
        },
      },
      onUpdate: (props) => {
        onValueChange(getOutput(props.editor, outputValue));
      },
      content: value,
      editable: !disabled,
      onCreate: ({ editor }) => {
        if (value) {
          editor.chain().setContent(value).run();
        }
      },
    });

    useEffect(() => {
      if (editor) {
        editor.commands.focus();
      }
    }, [editor]);

    return (
      <div
        className={cn("flex h-full w-full flex-col rounded-md ", className)}
        {...props}
        ref={ref}
      >
        {editor && (
          <>
            {disableToolbar ? null : (
              <>
                <LinkBubbleMenu editor={editor} />
                <ImageBubbleMenu editor={editor} />
                <Toolbar editor={editor} />
              </>
            )}
          </>
        )}
        <div
          className="h-full grow"
          onClick={() => editor?.chain().focus().run()}
        >
          <EditorContent editor={editor} className={cn("p-2", contentClass)} />
        </div>
      </div>
    );
  }
);

MinimalTiptapEditor.displayName = "MinimalTiptapEditor";

const Toolbar = ({ editor }: { editor: TiptapEditor }) => {
  return (
    <div className="border-b border-border p-2">
      <div className="flex w-full flex-wrap items-center">
        <SectionOne editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionTwo editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionThree editor={editor} />
        <Separator orientation="vertical" className="mx-2 h-7" />
        <SectionFour editor={editor} />
      </div>
    </div>
  );
};

export { MinimalTiptapEditor };
