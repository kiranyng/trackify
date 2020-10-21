import React from 'react';

import ModalDialog from '../../gadgets/modal-dialog/ModalDialog';
import NoteView from './NoteView';

function NotesListItem(props) {
    const editNoteRef = React.useRef();

    const launchModal = () => {
        editNoteRef.current.openModal();
    }

    const hideModal = () => {
        editNoteRef.current.closeModal();
    }

    return (
        <li>
            <div onClick={ launchModal }>
                {props.item.text.substring(0, 15)} 
            </div>
            <ModalDialog ref={editNoteRef} title="Create a new note">
                <NoteView folder={ props.folder } onFinish={ hideModal } item_id={ props.item.id }/>
            </ModalDialog>
        </li>
    );
}

export default NotesListItem;