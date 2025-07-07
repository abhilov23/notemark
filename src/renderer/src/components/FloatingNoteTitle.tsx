/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { useAtomValue } from "jotai"
import { ComponentProps } from "react"
import { selectedNoteAtom } from "../../store/index"
import { twMerge } from "tailwind-merge"



const FloatingNoteTitle = ({className, ...props}:ComponentProps<'div'>) => {
  const selectedNode=useAtomValue(selectedNoteAtom)

  if(!selectedNode) return null


  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
        <span className="text-gray-400">{selectedNode.title}</span>
    </div>
  )
}

export default FloatingNoteTitle