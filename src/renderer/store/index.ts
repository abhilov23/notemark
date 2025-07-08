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

   const noteContent = await window.context.readNote(selectedNote.title)
   
   return {
    ...selectedNote,
    content: noteContent
   }
})


export const selectedNoteAtom = unwrap(selectedNoteAtomAsync, (prev) => prev ?? {
  title: '',
  content: '',
  lastEditTime: Date.now()
})


export const saveNoteAtom = atom(null, async (get, set, newContent:NoteContent) => {
     
  const notes = get(notesAtom);
  const selectedNote = get(selectedNoteAtom);
   
  if(!selectedNote || !notes) return

  //save on disk
  await window.context.writeNote(selectedNote.title, newContent)

  //update the saved note's last edit time
  set(notesAtom, notes.map((note) =>{ 

    if(note.title === selectedNote.title){
      return {
        ...note,
        lastEditTime: Date.now()
      }
    }  

    return note
  }))
})





export const createEmptyNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom);

  if (!notes) return 

  const title = `Note ${notes.length + 1}`;
  const newNote: NoteInfo = { title, lastEditTime: Date.now() };

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)]);

  set(SelectedNoteIndexAtom, 0);
})

export const deleteNoteAtom = atom(null, (get, set)=>{
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if(!selectedNote || !notes) return 

  set(notesAtom, notes.filter((note) => note.title !== selectedNote.title))


  set(SelectedNoteIndexAtom, null)
})