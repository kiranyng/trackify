import React from 'react';
import { connect } from 'react-redux';

import { deleteNote } from '../../../statemanagement/Project/ProjectActionCreator';
import ActionIcon from '../../layouts/action-icon/ActionIcon';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import NoteView from './NoteView';

const mapDispatchToProps = ( dispatch, props ) => {
    return {
        deleteNote: () => {
            dispatch( deleteNote( props.item.folder, props.item.id ) );
        }
    }
}

function NotesListItem( props ) {
    const editNoteRef = React.useRef();

    const launchModal = () => {
        editNoteRef.current.openModal();
    }

    const hideModal = () => {
        editNoteRef.current.closeModal();
    }

    const deleteNote = () => {
        if( window.confirm( `Really want to delete note '${ props.item.text.substring(0, 30) }'?` ) ) {
            props.deleteNote();
        }
    }

    return (
        <li>
            <div className="Note-listitem-title" onClick={ launchModal }>{props.item.text.substring(0, 30)} </div>
            <div>
                <ActionIcon type='bin' onClick={ deleteNote } />
            </div>
            <ModalDialog ref={editNoteRef} title="Create a new note">
                <NoteView folder={ props.folder } onFinish={ hideModal } item_id={ props.item.id }/>
            </ModalDialog>
        </li>
    );
}

export default connect( null, mapDispatchToProps )( NotesListItem );