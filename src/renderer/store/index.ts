/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { NoteContent, NoteInfo } from './../../shared/models';
import { atom } from "jotai";
import { unwrap } from "jotai/utils"

const loadNotes = async () => {
  try {
    const notes = await window.context.getNotes()
    console.log('Loaded notes:', notes)
    // Sort them by most recently edited
    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
  } catch (error) {
    console.error('Error loading notes:', error)
    return []
  }
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev) => prev ?? [])

export const SelectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) => {
   const notes = get(notesAtom)
   const selectedNoteIndex = get(SelectedNoteIndexAtom);

   if (selectedNoteIndex === null || !notes || notes.length === 0) return null
   
   const selectedNote = notes[selectedNoteIndex]
   
   if (!selectedNote) return null

   console.log('Loading content for note:', selectedNote.fullPath)
   
   try {
     const noteContent = await window.context.readNote(selectedNote.fullPath)
     
     return {
       ...selectedNote,
       content: noteContent
     }
   } catch (error) {
     console.error('Error loading note content:', error)
     return {
       ...selectedNote,
       content: ''
     }
   }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? null)

export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);
   
  if (!selectedNote || !notes) {
    console.warn('Cannot save: no selected note or notes')
    return
  }
  
  try {
    console.log('Saving note:', selectedNote.fullPath)
    await window.context.writeNote(selectedNote.fullPath, newContent)
    
    // Update the saved note's last edit time
    const updatedNotes = notes.map((note) => { 
      if (note.fullPath === selectedNote.fullPath) {
        return {
          ...note,
          lastEditTime: Date.now()
        }
      }  
      return note
    })
    
    // Re-sort by last edit time
    updatedNotes.sort((a, b) => b.lastEditTime - a.lastEditTime)
    
    set(notesAtom, updatedNotes)
    
    console.log('Note saved successfully')
  } catch (error) {
    console.error('Error saving note:', error)
  }
})

export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom);

  if (!notes) return 

  try {
    const fullPath = await window.context.createNote()
    
    if (!fullPath) return

    // Extract filename from full path for display
    const fileName = fullPath.split('/').pop()?.replace('.md', '') || 'untitled'

    const newNote: NoteInfo = { 
      title: fileName, 
      lastEditTime: Date.now(),
      fullPath: fullPath
    };

    // Add new note to the beginning and remove any duplicates
    const updatedNotes = [newNote, ...notes.filter((note) => note.fullPath !== newNote.fullPath)]
    
    set(notesAtom, updatedNotes);
    set(SelectedNoteIndexAtom, 0);
    
    console.log('Created new note:', fullPath)
    
    // Force a refresh of the notes list to ensure the file is visible
    // This is important because the file system operation might take a moment
    setTimeout(async () => {
      try {
        const refreshedNotes = await window.context.getNotes()
        const sortedNotes = refreshedNotes.sort((a, b) => b.lastEditTime - a.lastEditTime)
        set(notesAtom, sortedNotes)
        
        // Find the index of the newly created note
        const newNoteIndex = sortedNotes.findIndex(note => note.fullPath === fullPath)
        if (newNoteIndex !== -1) {
          set(SelectedNoteIndexAtom, newNoteIndex)
        }
        
        console.log('Notes list refreshed after creation')
      } catch (error) {
        console.error('Error refreshing notes after creation:', error)
      }
    }, 100) // Small delay to ensure file system operation completes
    
  } catch (error) {
    console.error('Error creating note:', error)
  }
})

export const deleteNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) {
    console.warn('Cannot delete: no selected note or notes')
    return 
  }

  try {
    console.log('Deleting note:', selectedNote.fullPath)
    
    // Actually delete the file from disk
    await window.context.deleteNote(selectedNote.fullPath)

    // Remove from UI state
    const updatedNotes = notes.filter((note) => note.fullPath !== selectedNote.fullPath)
    set(notesAtom, updatedNotes)
    set(SelectedNoteIndexAtom, null)
    
    console.log('Note deleted successfully')
  } catch (error) {
    console.error('Error deleting note:', error)
  }
})