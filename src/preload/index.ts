/* eslint-disable prettier/prettier */

import { contextBridge, ipcRenderer } from 'electron'
import { createNote, writeNote } from 'src/main/lib'
import { CreateNote, GetNotes, ReadNote, WriteNote } from 'src/shared/types'


if(!process.contextIsolated){
  throw new Error('context Isolated must be enabled in the browser window')
}

try {
  contextBridge.exposeInMainWorld('context',{
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),

    readNote: (...args: Parameters<ReadNote>) =>  ipcRenderer.invoke('readNote', ...args),
    
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),

    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),

  })
} catch (error) {
  console.error(error)
}