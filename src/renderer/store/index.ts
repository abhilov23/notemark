/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { NoteContent, NoteInfo } from './../../shared/models';
import { atom } from "jotai";
import {unwrap} from "jotai/utils"

const loadNotes = async () => {
  const notes = await window.context.getNotes()
  //sort them by most recently added
  return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

export const notesAtom = unwrap(notesAtomAsync, (prev)=> prev)

export const SelectedNoteIndexAtom = atom<number | null>(null)

const selectedNoteAtomAsync = atom(async (get) =>{
   const notes=get(notesAtom)
   const selectedNoteIndex = get(SelectedNoteIndexAtom);

   if(selectedNoteIndex === null || !notes) return null
   
   const selectedNote = notes[selectedNoteIndex]

   // Use fullPath instead of title
   const noteContent = await window.context.readNote(selectedNote.fullPath)
   
   return {
    ...selectedNote,
    content: noteContent
   }
})

export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
  title: '',
  content: '',
  lastEditTime: Date.now(),
  fullPath: ''
})

export const saveNoteAtom = atom(null, async (get, set, newContent:NoteContent) => {
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);
   
  if(!selectedNote || !notes) return

  // Use fullPath for saving
  await window.context.writeNote(selectedNote.fullPath, newContent)

  //update the saved note's last edit time
  set(notesAtom, notes.map((note) =>{ 
    if(note.fullPath === selectedNote.fullPath){
      return {
        ...note,
        lastEditTime: Date.now()
      }
    }  
    return note
  }))
})

export const createEmptyNoteAtom = atom(null, async(get, set) => {
  const notes = get(notesAtom);

  if (!notes) return 

  const fullPath = await window.context.createNote()
  
  if(!fullPath) return

  // Extract filename from full path for display
  const fileName = fullPath.split('/').pop()?.replace('.md', '') || 'untitled'

  const newNote: NoteInfo = { 
    title: fileName, 
    lastEditTime: Date.now(),
    fullPath: fullPath
  };

  set(notesAtom, [newNote, ...notes.filter((note) => note.fullPath !== newNote.fullPath)]);
  set(SelectedNoteIndexAtom, 0);
})

export const deleteNoteAtom = atom(null, async (get, set)=>{
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if(!selectedNote || !notes) return 

  // Actually delete the file from disk
  await window.context.deleteNote(selectedNote.fullPath)

  // Remove from UI state
  set(notesAtom, notes.filter((note) => note.fullPath !== selectedNote.fullPath))
  set(SelectedNoteIndexAtom, null)
})