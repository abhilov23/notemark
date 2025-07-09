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

export const getRootDir = () => {
    return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir()
    await ensureDir(rootDir)

    try {
        const dirEntries = await readdir(rootDir, {
            encoding: fileEncoding,
            withFileTypes: true
        })
       
        // Filter only .md files that are actually files, not directories
        const noteFiles = dirEntries.filter(entry => 
            entry.isFile() && entry.name.endsWith('.md')
        )
        
        console.log('Found note files:', noteFiles.map(f => f.name))
        
        const noteInfos = await Promise.all(
            noteFiles.map(file => getNotesInfoFromFileName(file.name, rootDir))
        )
        
        console.log('Processed note infos:', noteInfos)
        
        return noteInfos.filter(note => note !== null) // Remove any failed reads
    } catch (error) {
        console.error('Error reading notes:', error)
        return []
    }
}

export const getNotesInfoFromFileName = async (fileName: string, directory: string): Promise<NoteInfo | null> => {
    const fullPath = path.join(directory, fileName)
    
    try {
        const fileStats = await stat(fullPath)
        
        // Double-check it's a file
        if (!fileStats.isFile()) {
            console.warn(`${fullPath} is not a file, skipping`)
            return null
        }

        // Extract filename without extension for title
        const baseFileName = path.basename(fileName, '.md')

        return {
            title: baseFileName,
            lastEditTime: fileStats.mtime.getTime(),
            fullPath: fullPath
        }
    } catch (error) {
        console.error(`Error processing file ${fullPath}:`, error)
        return null
    }
}

export const readNote: ReadNote = async (fullPath: string) => {
    try {
        console.log('Reading note from:', fullPath)
        
        // Verify file exists and is readable
        const fileStats = await stat(fullPath)
        if (!fileStats.isFile()) {
            console.error('Not a file:', fullPath)
            return ''
        }
        
        const content = await readFile(fullPath, { encoding: fileEncoding })
        console.log('Successfully read note content, length:', content.length)
        return content
    } catch (error) {
        console.error('Error reading note:', fullPath, error)
        return ''
    }
}

export const writeNote: WriteNote = async (fullPath: string, content: string) => {
    try {
        console.info(`Writing note ${fullPath}`)
        
        // Get the directory path
        const dir = path.dirname(fullPath)
        console.log('Directory path:', dir)
        
        // Only try to create directory if it's not a root directory
        // Check if it's a root directory (like C:\ or D:\)
        const parsedPath = path.parse(dir)
        const isRootDir = parsedPath.root === dir
        
        if (!isRootDir) {
            // Ensure the directory exists (but not for root directories)
            await ensureDir(dir)
        } else {
            console.log('Skipping directory creation for root directory:', dir)
            // For root directories, just check if they exist
            try {
                await stat(dir)
            } catch (error) {
                console.error('Root directory does not exist:', dir)
                throw new Error(`Cannot write to ${dir} - drive not accessible`)
            }
        }
        
        await writeFile(fullPath, content, {
            encoding: fileEncoding
        })
        
        console.log('Successfully wrote note:', fullPath)
    } catch (error) {
        console.error('Error writing note:', fullPath, error)
        throw error
    }
}

export const deleteNote: DeleteNote = async (fullPath: string) => {
    try {
        console.info(`Deleting note ${fullPath}`)
        
        // Verify file exists before trying to delete
        const fileStats = await stat(fullPath)
        if (!fileStats.isFile()) {
            console.error('Cannot delete: not a file', fullPath)
            return
        }
        
        await unlink(fullPath)
        console.log('Successfully deleted note:', fullPath)
    } catch (error) {
        console.error('Error deleting note:', fullPath, error)
        throw error
    }
}

export const createNote = async () => {
    const rootDir = getRootDir()
    await ensureDir(rootDir)
    
    // Generate a unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const defaultFileName = `note-${timestamp}.md`
    
    const { filePath, canceled } = await dialog.showSaveDialog({
        title: 'New note',
        defaultPath: path.join(rootDir, defaultFileName),
        buttonLabel: 'Create',
        properties: ['showOverwriteConfirmation'],
        showsTagField: false,
        filters: [
            { name: 'Markdown', extensions: ['md'] }
        ]
    })

    if (canceled || !filePath) {
        console.info('Note creation cancelled')
        return false
    }
    
    console.info(`Creating note ${filePath}`)
    
    try {
        // Write the file first
        await writeNote(filePath, '')
        
        // Verify the file was actually created by checking if it exists
        const fileStats = await stat(filePath)
        if (!fileStats.isFile()) {
            console.error('File was not created successfully')
            return false
        }
        
        console.log('Note created successfully:', filePath)
        return filePath
    } catch (error) {
        console.error('Error creating note:', error)
        return false
    }
}