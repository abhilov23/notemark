/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ensureDir } from "fs-extra"
import { homedir } from "os"
import { appDirectoryName, fileEncoding } from "src/shared/constants"
import { NoteInfo } from "src/shared/models"
import { readdir, stat } from "fs/promises"
import { GetNotes } from "src/shared/types"



export const getRootDir = ()=>{
    return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async ()=>{
    const rootDir = getRootDir()

    await ensureDir(rootDir)

    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false
    })
   
    const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))


    return Promise.all(notes.map(getNotesInfoFromFileName)) 
}

export const getNotesInfoFromFileName = async (fileName: string): Promise<NoteInfo> => {
   
    const fileStats = await stat(`${getRootDir()}/${fileName}`)

    return {
        title: fileName.replace('.md', ''),
        lastEditTime: fileStats.mtime.getTime()
    }
}