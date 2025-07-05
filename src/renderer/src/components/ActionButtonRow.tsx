/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { ComponentProps } from "react"
import { DeleteNoteButton, NewNoteButton } from "./Button"



const ActionButtonRow = ({...props}:ComponentProps<'div'>) => {
  return (
    <div {...props}>
     <NewNoteButton/>
     <DeleteNoteButton/>
    </div>
  )
}

export default ActionButtonRow