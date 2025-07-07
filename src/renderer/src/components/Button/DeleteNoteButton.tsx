/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { useSetAtom } from "jotai";
import { ActionButton, ActionButtonProps } from "./ActionButton";
import {FaRegTrashCan} from 'react-icons/fa6';
import { deleteNoteAtom} from "../../../../renderer/store/index";




export const DeleteNoteButton = ({...props}: ActionButtonProps) => {
   const deleteNode = useSetAtom(deleteNoteAtom);

   const handleDelete = () => {
      deleteNode();
   }


    return <ActionButton onClick={handleDelete} {...props}>
        <FaRegTrashCan className='w-4 h-4 text-zinc-300'/>
    </ActionButton>
}