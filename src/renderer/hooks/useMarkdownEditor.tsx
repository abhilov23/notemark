/* eslint-disable prettier/prettier */

import { useAtomValue, useSetAtom } from "jotai"
import { saveNoteAtom, selectedNoteAtom } from "../store/index"
import { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef } from "react";
import { NoteContent } from "@shared/models";
import {throttle} from 'lodash'
import { autoSavingTime } from "@shared/constants";



/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const saveNote = useSetAtom(saveNoteAtom);
    const editorRef = useRef<MDXEditorMethods>(null);
    
    
    const handleAutoSaving = throttle(
        async (content: NoteContent) => {
        if(!selectedNote) return
        console.log('auto saving', selectedNote.title)

        await saveNote(content)


    }, autoSavingTime, {
        leading: false, 
        trailing: true
    })

    const handleBlur = async()=>{
        if(!selectedNote) return
        await handleAutoSaving.cancel()

        const content = editorRef.current?.getMarkdown()
        if(!content) return
        await saveNote(content)
    }


    return {
        editorRef,
        selectedNote,
        handleAutoSaving,
        handleBlur
    }
}