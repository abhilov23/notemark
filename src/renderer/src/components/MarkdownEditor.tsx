/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { codeBlockPlugin, headingsPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin } from "@mdxeditor/editor"
import {useMarkdownEditor} from "../../hooks/useMarkdownEditor";


const MarkdownEditor = () => {
   const {selectedNote, editorRef, handleAutoSaving} = useMarkdownEditor();


   if(!selectedNote) return null;



  return (
    <MDXEditor 
    ref={editorRef}
    markdown={selectedNote.content} 
    key={selectedNote.title}
    onChange={handleAutoSaving}
    plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin(), linkPlugin(), codeBlockPlugin()]}
          contentEditableClassName={`outline-none min-h-screen max-w-none px-8 py-5 text-white prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-header:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']`}/>

  )
}

export default MarkdownEditor