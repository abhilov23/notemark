/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { useSetAtom } from "jotai";
import { ActionButton, ActionButtonProps } from "../../components";
import {MdNoteAdd} from 'react-icons/md';
import { createEmptyNoteAtom } from "../../../../renderer/store/index";

export const NewNoteButton = ({...props}: ActionButtonProps) => {

   const createEmptyNote = useSetAtom(createEmptyNoteAtom);

   const handleCreation = async () => {
      await createEmptyNote();
   }


    return <ActionButton onClick={handleCreation} {...props}>
        <MdNoteAdd className='w-4 h-4 text-zinc-300'/>
    </ActionButton>;
};