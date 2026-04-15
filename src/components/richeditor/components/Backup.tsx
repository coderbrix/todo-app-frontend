import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const Button = ({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-3 py-1 rounded-md text-sm font-medium border transition
      ${
        active
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
};

export default function Backup() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-6",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-6",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class:
              "bg-gray-900 text-white p-3 rounded-md font-mono overflow-x-auto",
          },
        },
      }),
      Highlight,
      TaskList.configure({
        HTMLAttributes: {
          class: "not-prose ml-2",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex gap-2",
        },
      }),
    ],
    content: `
      <p>Write something...</p>
    `,
  });

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto mt-8 border rounded-xl shadow-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-b">
        <Button
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Button>

        <Button
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Button>

        <Button
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          Strike
        </Button>

        <Button
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          Highlight
        </Button>

        <Button
          active={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          Code
        </Button>

        <Button
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code Block
        </Button>

        <Button
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          UL
        </Button>

        <Button
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          OL
        </Button>

        <Button
          active={editor.isActive("taskList")}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          Checklist
        </Button>
      </div>

      {/* Editor */}
      <div className="p-5 prose prose-sm max-w-none focus:outline-none min-h-[300px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}