import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Check,
  Trash2,
  ArrowLeftRight,
  Bold,
  Italic,
  Link,
  Underline,
  ExternalLink,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

/* =========================
   HELPERS
========================= */
function parseMarkdown(md: string): Todo[] {
  return md
    .split("\n")
    .map((line) => {
      const match = line.match(/^\s*-\s\[( |x|X)\]\s(.+)$/);
      if (!match) return null;

      return {
        id: crypto.randomUUID(),
        done: match[1].toLowerCase() === "x",
        text: match[2],
      };
    })
    .filter(Boolean) as Todo[];
}

function toMarkdown(todos: Todo[]) {
  return todos.map((t) => `- [${t.done ? "x" : " "}] ${t.text}`).join("\n");
}

function parseNormalText(text: string): Todo[] {
  return text
    .split("\n")
    .filter((l) => l.trim() !== "")
    .map((line) => ({
      id: crypto.randomUUID(),
      text: line,
      done: false,
    }));
}

function toNormalText(todos: Todo[]) {
  return todos.map((t) => `${t.done ? "✔ " : ""}${t.text}`).join("\n");
}

type Mode = "markdown" | "normal";

export default function Markdown() {
  const [mode, setMode] = useState<Mode>("markdown");

  const [input, setInput] = useState<string>(
    localStorage.getItem("markdown-todos") ||
      `- [ ] Learn **React**
- [ ] Build *project*
- [ ] Visit <u>portfolio</u> [Google](https://google.com)
- [x] Setup environment`
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const todos = useMemo(() => {
    return mode === "markdown"
      ? parseMarkdown(input)
      : parseNormalText(input);
  }, [input, mode]);

  /* =========================
     SCROLL
  ========================= */
  const isNearBottom = () => {
    const el = textareaRef.current;
    if (!el) return false;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 50;
  };

  const scrollToBottom = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (isNearBottom()) scrollToBottom();
  }, [input]);

  /* =========================
     TEXT TOOL
  ========================= */
  const wrapText = (before: string, after: string = "") => {
    const el = textareaRef.current;
    if (!el) return;

    const shouldScroll = isNearBottom();

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = input.substring(start, end);

    const updated =
      input.substring(0, start) +
      before +
      selected +
      after +
      input.substring(end);

    setInput(updated);

    setTimeout(() => {
      el.focus();
      el.selectionStart = start + before.length;
      el.selectionEnd = end + before.length;

      if (shouldScroll) scrollToBottom();
    }, 0);
  };

  const insertLink = () => {
    const url = prompt("Link URL:");
    if (!url) return;
    wrapText(`[Click here](${url})`);
  };

  const toggleTodo = (id: string) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setInput(mode === "markdown" ? toMarkdown(updated) : toNormalText(updated));
  };

  const removeTodo = (id: string) => {
    const updated = todos.filter((t) => t.id !== id);
    setInput(mode === "markdown" ? toMarkdown(updated) : toNormalText(updated));
  };

  const switchMode = () => {
    setMode((p) => (p === "markdown" ? "normal" : "markdown"));
  };

  const handleSave = () => {
    localStorage.setItem("markdown-todos", input);
    alert("Saved ✅");
  };

  return (
    <div className="h-[90vh] bg-gradient-to-br from-gray-100 to-gray-200 p-4 flex flex-col md:flex-row gap-4">

      {/* LEFT */}
      <div className="w-full md:w-1/2 h-full bg-white/80 border shadow-md rounded-xl p-4 flex flex-col">

        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">Editor</h2>

          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              mode === "markdown"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {mode === "markdown" ? "Markdown Mode" : "Normal Mode"}
          </span>
        </div>

        <div className="flex gap-2 mb-3">
          <button onClick={() => wrapText("**", "**")} className="p-1.5 bg-white shadow rounded">
            <Bold size={14} />
          </button>
          <button onClick={() => wrapText("*", "*")} className="p-1.5 bg-white shadow rounded">
            <Italic size={14} />
          </button>
          <button onClick={() => wrapText("<u>", "</u>")} className="p-1.5 bg-white shadow rounded">
            <Underline size={14} />
          </button>
          <button onClick={insertLink} className="p-1.5 bg-white shadow rounded">
            <Link size={14} />
          </button>

          <button
            onClick={() => wrapText("\n- [ ] ")}
            className="px-2 text-xs bg-blue-100 text-blue-600 rounded"
          >
            + List
          </button>

          <button
            onClick={switchMode}
            className="ml-auto flex items-center gap-1 px-2 text-xs bg-black text-white rounded"
          >
            <ArrowLeftRight size={14} />
            {mode === "markdown" ? "To Normal" : "To Markdown"}
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full flex-1 p-3 text-sm border rounded-lg font-mono focus:ring-1 focus:ring-blue-400"
        />

        <button
          onClick={handleSave}
          className="mt-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 h-full bg-white border shadow-md rounded-xl flex flex-col overflow-hidden">

        <h2 className="text-sm font-semibold px-4 py-2 border-b bg-white sticky top-0">
          Preview
        </h2>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-2">

                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 flex items-center justify-center rounded border ${
                    todo.done ? "bg-green-500" : ""
                  }`}
                >
                  {todo.done && <Check size={12} className="text-white" />}
                </button>

                <div className={`text-xs ${todo.done ? "line-through text-gray-400" : ""}`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800 cursor-pointer inline-flex items-center gap-1"
                        >
                          {children}
                          <ExternalLink size={12} />
                        </a>
                      ),
                    }}
                  >
                    {todo.text}
                  </ReactMarkdown>
                </div>
              </div>

              <button onClick={() => removeTodo(todo.id)}>
                <Trash2 size={14} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}