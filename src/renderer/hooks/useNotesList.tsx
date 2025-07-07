/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useAtom, useAtomValue } from "jotai"
import { notesAtom, SelectedNoteIndexAtom } from "../store"

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
    const notes = useAtomValue(notesAtom);
    const [selectedNoteIndex, setSelectedNoteIndex] = useAtom(SelectedNoteIndexAtom);

    const handleNotesSelect = (index : number ) => async () => {
        setSelectedNoteIndex(index)

        if (onSelect) {
            onSelect()
        }
    }

    return {
        notes,
        selectedNoteIndex,
        handleNotesSelect
    }
}