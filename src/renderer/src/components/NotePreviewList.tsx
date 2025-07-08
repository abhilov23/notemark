/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"
import { useNotesList } from "../../hooks/useNotesList"
import {isEmpty} from 'lodash'


export type notePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}



export const NotePreviewList = ({onSelect,  className, ...props }: notePreviewListProps) => {


  const { notes, selectedNoteIndex, handleNotesSelect } = useNotesList({onSelect})

  
    if(!notes) return null

  if (isEmpty(notes)) {
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