/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { WindowControls } from './WindowsControls'

export const DraggableTopBar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 h-8 bg-black/90 backdrop-blur-sm flex items-center justify-between px-2">
      <div className="flex-1" />
      <div className="text-sm text-white/70 font-medium">Notemark</div>
      <WindowControls />
    </header>
  )  
}