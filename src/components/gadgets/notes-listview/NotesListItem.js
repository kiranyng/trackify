import React from 'react';
import ContentEditable from 'react-contenteditable';
import { connect } from 'react-redux';

import { deleteNote } from '../../../statemanagement/Project/ProjectActionCreator';
import ActionIcon from '../../layouts/action-icon/ActionIcon';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import NoteView from './NoteView';
import RichNote from './RichNote';

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
        if( window.confirm( `Really want to delete note '${ props.item.title }'?` ) ) {
            props.deleteNote();
        }
    }

    const title = props.item.title;//"test";

    return (
        <li>
            <div role="button" aria-label={ title } tabIndex="0" className="Note-listitem-title" onClick={ launchModal }>{ title } </div>
            <div>
                <ActionIcon type='bin' arialabel="delete"  onClick={ deleteNote } />
            </div>
            <ModalDialog ref={editNoteRef} >
                <RichNote  folder={ props.folder } onFinish={ hideModal } item_id={ props.item.id }/>
            </ModalDialog>
        </li>
    );
}

export default connect( null, mapDispatchToProps )( NotesListItem );