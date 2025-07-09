/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */

import { VscChromeMinimize, VscChromeMaximize, VscChromeRestore, VscChromeClose } from 'react-icons/vsc'
import { useState, useEffect } from 'react'

export const WindowControls = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // Listen for window state changes
    const handleMaximize = () => setIsMaximized(true)
    const handleUnmaximize = () => setIsMaximized(false)

    // Add event listeners if they exist
    if (window.context?.onWindowMaximized) {
      window.context.onWindowMaximized(handleMaximize)
    }
    if (window.context?.onWindowUnmaximized) {
      window.context.onWindowUnmaximized(handleUnmaximize)
    }

    // Check initial state
    if (window.context?.isWindowMaximized) {
      window.context.isWindowMaximized().then(setIsMaximized)
    }

    return () => {
      // Clean up listeners if needed
    }
  }, [])

  const handleMinimize = () => {
    window.context?.minimizeWindow?.()
  }

  const handleMaximize = () => {
    if (isMaximized) {
      window.context?.restoreWindow?.()
    } else {
      window.context?.maximizeWindow?.()
    }
  }

  const handleClose = () => {
    window.context?.closeWindow?.()
  }

  return (
    <div className="flex items-center h-full ml-auto">
      <button
        onClick={handleMinimize}
        className="flex items-center justify-center w-12 h-8 hover:bg-white/10 transition-colors duration-100"
        aria-label="Minimize"
      >
        <VscChromeMinimize className="w-4 h-4 text-white" />
      </button>
      
      <button
        onClick={handleMaximize}
        className="flex items-center justify-center w-12 h-8 hover:bg-white/10 transition-colors duration-100"
        aria-label={isMaximized ? "Restore" : "Maximize"}
      >
        {isMaximized ? (
          <VscChromeRestore className="w-4 h-4 text-white" />
        ) : (
          <VscChromeMaximize className="w-4 h-4 text-white" />
        )}
      </button>
      
      <button
        onClick={handleClose}
        className="flex items-center justify-center w-12 h-8 hover:bg-red-600 transition-colors duration-100"
        aria-label="Close"
      >
        <VscChromeClose className="w-4 h-4 text-white" />
      </button>
    </div>
  )
}