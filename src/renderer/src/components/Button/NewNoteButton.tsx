/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
import { ActionButton, ActionButtonProps } from "../../components";
import {MdNoteAdd} from 'react-icons/md';


export const NewNoteButton = ({...props}: ActionButtonProps) => {

    return <ActionButton {...props}>
        <MdNoteAdd className='w-4 h-4 text-zinc-300'/>
    </ActionButton>;
};