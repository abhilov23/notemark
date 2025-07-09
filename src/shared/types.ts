import { NoteContent, NoteInfo } from "./models"

export type GetNotes = () => Promise<NoteInfo[]>

export type ReadNote = (fullPath: string) => Promise<NoteContent>  // Changed from title to fullPath

export type WriteNote = (fullPath: string, content: NoteContent) => Promise<void>  // Changed from title to fullPath

export type CreateNote = () => Promise<string | false>  // Return full path instead of just filename

export type DeleteNote = (fullPath: string) => Promise<void>  // Add delete function