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

    try {
        const notesFileNames = await readdir(rootDir, {
            encoding: fileEncoding,
            withFileTypes: false
        })
       
        const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))
        
        console.log('Found notes:', notes) // Debug log
        
        const noteInfos = await Promise.all(
            notes.map(fileName => getNotesInfoFromFileName(fileName, rootDir))
        )
        
        console.log('Processed note infos:', noteInfos) // Debug log
        
        return noteInfos
    } catch (error) {
        console.error('Error reading notes:', error)
        return []
    }
}

export const getNotesInfoFromFileName = async (fileName: string, directory: string): Promise<NoteInfo> => {
    const fullPath = path.join(directory, fileName)
    
    try {
        const fileStats = await stat(fullPath)
        
        // Make sure it's actually a file, not a directory
        if (!fileStats.isFile()) {
            throw new Error(`${fullPath} is not a file`)
        }

        // Extract just the base filename without path and extension
        const baseFileName = path.basename(fileName, '.md')

        return {
            title: baseFileName,
            lastEditTime: fileStats.mtime.getTime(),
            fullPath: fullPath
        }
    } catch (error) {
        console.error(`Error processing file ${fullPath}:`, error)
        throw error
    }
}










export const readNote: ReadNote = async(fullPath: string)=>{
    try {
        console.log('Reading note from:', fullPath) // Debug log
        const content = await readFile(fullPath, {encoding: fileEncoding})
        console.log('Successfully read note content, length:', content.length) // Debug log
        return content
    } catch (error) {
        console.error('Error reading note:', fullPath, error)
        // Return empty string if file can't be read
        return ''
    }
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