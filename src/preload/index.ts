/* eslint-disable prettier/prettier */

import { contextBridge, ipcRenderer } from 'electron'
import { CreateNote, GetNotes, ReadNote, WriteNote, DeleteNote } from 'src/shared/types'

if(!process.contextIsolated){
  throw new Error('context Isolated must be enabled in the browser window')
}

try {
  contextBridge.exposeInMainWorld('context',{
    locale: navigator.language,
    // Note-related functions
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
    readNote: (...args: Parameters<ReadNote>) =>  ipcRenderer.invoke('readNote', ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args),
    
    // Window control functions
    minimizeWindow: () => ipcRenderer.invoke('window-minimize'),
    maximizeWindow: () => ipcRenderer.invoke('window-maximize'),
    restoreWindow: () => ipcRenderer.invoke('window-restore'),
    closeWindow: () => ipcRenderer.invoke('window-close'),
    isWindowMaximized: () => ipcRenderer.invoke('window-is-maximized'),
    
    // Window event listeners
    onWindowMaximized: (callback: () => void) => {
      ipcRenderer.on('window-maximized', callback)
      return () => ipcRenderer.removeListener('window-maximized', callback)
    },
    onWindowUnmaximized: (callback: () => void) => {
      ipcRenderer.on('window-unmaximized', callback)
      return () => ipcRenderer.removeListener('window-unmaximized', callback)
    }
  })
} catch (error) {
  console.error(error)
}