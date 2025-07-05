/* eslint-disable prettier/prettier */

import { contextBridge } from 'electron'


if(!process.contextIsolated){
  throw new Error('contextIsolated must be enabled in the browser window')
}

try {
  contextBridge.exposeInMainWorld('context',{
    //TODO  
  })
} catch (error) {
  console.error(error)
}