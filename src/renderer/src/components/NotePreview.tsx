/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NoteInfo } from "@shared/models"
import { ComponentProps } from "react"
import {cn} from "../../../main/utils/index";
import {formatDateFromMs} from "../../../main/utils/index";


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
     const date = formatDateFromMs(lastEditTime)


  return (
    <div className={cn('cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75 my-1', {
        'bg-zinc-400/75' : isActive,
        'hover:bg-zinc-500/75' : !isActive
    }, className
)} {...props}>
    <h3 className="mb-1 font-bold truncate">{title}</h3>
    <span className="inline-block w-full mb-2 text-xs font-light text-left">{date}</span>
</div>
  )
}

