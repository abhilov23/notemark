/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NoteInfo } from "@shared/models"
import { ComponentProps } from "react"


export type NotePreviewProps = NoteInfo & {
   isActive?:boolean
} & ComponentProps<'div'>


export const NotePreview = ({
    title,
    content, 
    lastEditTime, 
    isActive = false,
    className,
    ...props}:NotePreviewProps) => {
  return (
    <div {...props}>NotePreview</div>
  )
}

