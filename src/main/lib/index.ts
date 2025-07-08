/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ensureDir } from "fs-extra"
import { homedir } from "os"
import { appDirectoryName, fileEncoding } from "../../shared/constants"
import { NoteInfo } from "../../shared/models"
import { readdir, stat, readFile, writeFile } from "fs/promises"
import { GetNotes, ReadNote, WriteNote } from "../../shared/types"




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

export const readNote: ReadNote = async(filename)=>{
    const rootDir = getRootDir()
    return readFile(`${rootDir}/${filename}.md`, {encoding: fileEncoding})
}


export const writeNote : WriteNote = async (filename, content)=>{
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, {
    encoding: fileEncoding
  })
}