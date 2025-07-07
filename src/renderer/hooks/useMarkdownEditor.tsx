/* eslint-disable prettier/prettier */

import { useAtomValue } from "jotai"
import { selectedNoteAtom } from "../store/index"


/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);

    return {
        selectedNote
    }
}