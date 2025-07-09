/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ensureDir } from "fs-extra"
import { homedir } from "os"
import { appDirectoryName, fileEncoding } from "../../shared/constants"
import { NoteInfo } from "../../shared/models"
import { readdir, stat, readFile, writeFile, unlink } from "fs/promises"
import { GetNotes, ReadNote, WriteNote, DeleteNote } from "../../shared/types"
import { dialog } from "electron"
import path from "path"

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

    return Promise.all(notes.map(fileName => getNotesInfoFromFileName(fileName, rootDir))) 
}

export const getNotesInfoFromFileName = async (fileName: string, directory: string): Promise<NoteInfo> => {
    const fullPath = path.join(directory, fileName)
    const fileStats = await stat(fullPath)

    return {
        title: fileName.replace('.md', ''),
        lastEditTime: fileStats.mtime.getTime(),
        fullPath: fullPath  // Store the full path
    }
}

export const readNote: ReadNote = async(fullPath: string)=>{
    return readFile(fullPath, {encoding: fileEncoding})
}

export const writeNote: WriteNote = async (fullPath: string, content: string)=>{
    console.info(`Writing note ${fullPath}`)
    return writeFile(fullPath, content, {
        encoding: fileEncoding
    })
}

export const deleteNote: DeleteNote = async (fullPath: string) => {
    console.info(`Deleting note ${fullPath}`)
    return unlink(fullPath)
}

export const createNote = async () => {
    const rootDir = getRootDir()
    await ensureDir(rootDir)
    
    const {filePath, canceled} =  await dialog.showSaveDialog({
        title: 'New note',
        defaultPath: `${rootDir}/untitled.md`,
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [
            { name: 'Markdown', extensions: ['md'] }
        ]
    })

    if(canceled || !filePath) {
        console.info('Note creation cancelled')
        return false
    }
    
    console.info(`Creating note ${filePath}`)
    await writeNote(filePath, '')
    
    return filePath  // Return full path instead of just filename
}