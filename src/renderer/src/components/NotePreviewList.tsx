/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"
import { useNotesList } from "../../hooks/useNotesList"

export const NotePreviewList = ({ className, ...props }: ComponentProps<"ul">) => {


  const { notes, selectedNoteIndex, handleNotesSelect } = useNotesList({})

  if (notes.length === 0) {
    return (
      <ul className={twMerge("text-center pt-4", className)} {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul {...props}>
      {notes.map((note, index) => (
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNotesSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}