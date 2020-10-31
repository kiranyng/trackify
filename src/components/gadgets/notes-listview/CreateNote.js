import React from 'react';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import NoteView from './NoteView';

function CreateNote( props ) {
    const createNoteModalRef = React.useRef();

    const launchModal = () => {
        createNoteModalRef.current.openModal();
    }

    const hideModal = () => {
        createNoteModalRef.current.closeModal();
    }

    return (
        <li>
            <div tabIndex="0" role="button" arialabel="create note" className="Note-listitem-title" onClick={ launchModal }>
                <span className="Create-note-icon">NEW Note</span>
            </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            <ModalDialog ref={createNoteModalRef} title="Create a new note">
                <NoteView folder={ props.folder } onFinish={ hideModal } />
            </ModalDialog>
        </li>
    );
}

export default CreateNote;