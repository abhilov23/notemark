import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types"

declare global {
  interface Window {
    context: {
      locale: string,
      // Note-related functions
      getNotes: GetNotes,
      readNote: ReadNote,
      writeNote: WriteNote,
      createNote: CreateNote,
      deleteNote: DeleteNote,
      
      // Window control functions
      minimizeWindow: () => Promise<void>,
      maximizeWindow: () => Promise<void>,
      restoreWindow: () => Promise<void>,
      closeWindow: () => Promise<void>,
      isWindowMaximized: () => Promise<boolean>,
      
      // Window event listeners
      onWindowMaximized: (callback: () => void) => () => void,
      onWindowUnmaximized: (callback: () => void) => () => void
    }
  }
}