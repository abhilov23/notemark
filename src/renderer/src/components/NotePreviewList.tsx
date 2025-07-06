/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import {notesMock} from "../../store/mocks/index"
import { ComponentProps } from "react"
import { NotePreview } from "./NotePreview"
import { twMerge } from "tailwind-merge"



export const NotePreviewList = ({className, ...props}: ComponentProps<"ul">) =>{
  
  if(notesMock.length === 0){
    return <ul className={twMerge('text-center pt-4 ',className)} {...props}>
      <span>No Notes Yet!</span>
    </ul>
  }




    return(
    <ul {...props}>{
        notesMock.map((note) => (
          <NotePreview key={note.title + note.lastEditTime} {...note}/>  
        ))
        }</ul>
)
}