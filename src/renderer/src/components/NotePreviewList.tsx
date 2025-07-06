/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import {notesMock} from "../../store/mocks/index"
import { ComponentProps } from "react"



export const NotePreviewList = ({...props}: ComponentProps<"ul">) =>{

    return(
    <ul {...props}>{
        notesMock.map((note) => (
          <li key={note.title}>{note.title}</li>  
        ))
        }</ul>
)
}