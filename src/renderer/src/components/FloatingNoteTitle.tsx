/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"



const FloatingNoteTitle = ({className, ...props}:ComponentProps<'div'>) => {
  const title='Note Title'


  return (
    <div className={twMerge('flex justify-center', className)} {...props}>
        <span className="text-gray-400">{title}</span>
    </div>
  )
}

export default FloatingNoteTitle