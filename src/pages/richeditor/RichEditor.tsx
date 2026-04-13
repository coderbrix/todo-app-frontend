import React, { useState, useMemo } from 'react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'

// Core extensions
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

// Marks
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import { FontFamily, TextStyle } from '@tiptap/extension-text-style'
import { ListKit } from '@tiptap/extension-list'

import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  List,
  ListOrdered,
  CheckSquare,
  Link as LinkIcon,
  Code as CodeIcon,
  Code2
} from "lucide-react"

// Markdown
import TurndownService from 'turndown'

// Code highlight
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'

const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('css', css)
lowlight.register('python', python)

const RichEditor: React.FC = () => {

  // ✅ FIX 1: Hooks at top level
  const [markdown, setMarkdown] = useState<string>('')

  // ✅ FIX 2: create once (not every render)
  const turndownService = useMemo(() => {
    const service = new TurndownService()

    // ✅ underline
    service.addRule('underline', {
      filter: ['u'],
      replacement: (content) => `<u>${content}</u>`,
    })

    // ✅ strike
    service.addRule('strike', {
      filter: ['s', 'del', 'strike'],
      replacement: (content) => `~~${content}~~`,
    })

    // ✅ task list
    service.addRule('taskList', {
      filter: (node) =>
        node.nodeName === 'UL' && node.getAttribute('data-type') === 'taskList',
      replacement: (content) =>
        content
          .split('\n')
          .filter(Boolean)
          .map(line => `- [ ] ${line}`)
          .join('\n'),
    })

    return service
  }, [])
  const editor: Editor | null = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      Highlight,
      TextStyle,
      FontFamily,
      BulletList,
      OrderedList,
      ListItem,

      TaskList,
      ListKit.configure({
        bulletList: true,
        orderedList: true,
      }),

      CodeBlockLowlight.configure({
        lowlight,
      }),

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: `
      <p>This isn’t bold.</p>
      <p><strong>This is bold.</strong></p>
      <p><b>And this.</b></p>
    `,

    shouldRerenderOnTransaction: true,
    immediatelyRender: true,

    onUpdate({ editor }) {
      const html = editor.getHTML()
      const md = turndownService.turndown(html)
      setMarkdown(md)
    },
  })

  if (!editor) return null

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md">

        {/* Bold */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('bold')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <BoldIcon size={16} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('italic')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <ItalicIcon size={16} />
        </button>

        {/* Underline */}
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('underline')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Strike */}
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('strike')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
           <Strikethrough size={16} />
        </button>

        {/* Highlight */}
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('highlight')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <Highlighter size={16} />
        </button>

        

        

        {/* Bullet List */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('bulletList')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <List size={16} />
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('orderedList')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <ListOrdered size={16} />
        </button>

        {/* Task List */}
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('taskList')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <CheckSquare size={16} />
        </button>

        {/* Link */}
        <button
          onClick={() => {
            const url = prompt('Enter URL')

            if (url === null) return

            if (url === '') {
              editor.chain().focus().unsetLink().run()
              return
            }

            editor.chain().focus().setLink({ href: url }).run()
          }}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('link')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
        <LinkIcon size={16} />
        </button>


       {/* Code */}
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('code')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
           <CodeIcon size={16} />
        </button> 

        {/* Code Block */}
        <button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleCodeBlock().run()
          }}
          className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-150
          hover:bg-gray-100 hover:shadow-sm
          ${editor.isActive('codeBlock')
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white border-gray-200'
            }`}
        >
          <Code2 size={16} />
        </button>

      </div>
      {/* Editor */}
     <div className="
          border border-gray-200 rounded-2xl p-5
          h-[350px] overflow-y-auto
          bg-white/70 backdrop-blur-md shadow-md
          prose prose-sm max-w-none

          [&_.ProseMirror]:min-h-[260px]
          [&_.ProseMirror]:outline-none

          [&_ul:not([data-type='taskList'])]:list-disc
          [&_ul:not([data-type='taskList'])]:ml-6
          [&_ol]:list-decimal
          [&_ol]:ml-6

          [&_ul[data-type='taskList']_li]:flex
          [&_ul[data-type='taskList']_li]:items-start
          [&_ul[data-type='taskList']_li]:gap-2
          [&_ul[data-type='taskList']_label]:mt-1
          [&_ul[data-type='taskList']_div]:flex
          [&_ul[data-type='taskList']_div]:items-center
          [&_ul[data-type='taskList']_p]:m-0

          [&_code]:bg-gray-100
          [&_code]:text-gray-800
          [&_code]:px-2
          [&_code]:py-0.5
          [&_code]:rounded

          [&_a]:text-blue-600
          [&_a]:underline

          [&_pre]:bg-gray-900
          [&_pre]:text-gray-100
          [&_pre]:p-4
          [&_pre]:rounded-xl
          [&_pre]:overflow-x-auto
          [&_pre]:text-sm
        ">
          <EditorContent editor={editor} />
      </div>

      {/* Buttons */}
      <div className="flex justify-start gap-3 mt-4">
        <button
          onClick={() => console.log("Back clicked")}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Back
        </button>

        <button
          onClick={() => console.log("Save clicked")}
          className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
        >
          Save
        </button>
      </div>
            


      <div className="mt-4">
        <h2 className="font-bold mb-2">Markdown Output</h2>
        <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap">
          {markdown}
        </pre>
      </div>


    </div>
  )
}

export default RichEditor