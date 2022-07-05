import React from 'react';
import { connect } from 'react-redux';

import { deleteNote, recentsDelete, recentsTouch } from '../../../statemanagement/Project/ProjectActionCreator';
import ActionIcon from '../../layouts/action-icon/ActionIcon';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import RichNote from './RichNote';

const mapDispatchToProps = ( dispatch, props ) => {
    return {
        deleteNote: () => {
            dispatch( deleteNote( props.item.folder, props.item.id ) );
        },
        upsertRecents: () => dispatch( recentsTouch( props.item.folder, props.item.id, 'note' ) ),
        deleteFromDecents: () => dispatch( recentsDelete( props.item.folder, props.item.id, 'note' ) )
    }
}

function NotesListItem( props ) {
    const editNoteRef = React.useRef();
    const previewNoteRef = React.useRef();
    
    const launchPreviewModal = () => {
        previewNoteRef.current.openModal();
    }

    const hidePreviewModal = () => {
        previewNoteRef.current.closeModal();
    }

    const launchModal = () => {
        props.upsertRecents();

        editNoteRef.current.openModal();
    }

    const hideModal = () => {
        editNoteRef.current.closeModal();
    }

    const deleteNote = () => {
        if( window.confirm( `Really want to delete note '${ props.item.title }'?` ) ) {
            props.deleteNote();

            props.deleteFromDecents();
        }
    }

    const copyToClipboard = (ev) => {
        navigator.clipboard.writeText( JSON.stringify({type: 'note', data: props.item }) );
        ev.preventDefault();
        ev.stopPropagation();
    }

    const title = props.item.title;//"test";

    return (
        <li onContextMenu={ copyToClipboard }>
            <div role="button" aria-label={ title } tabIndex="0" className="Note-listitem-title" onClick={ launchPreviewModal }>{ title } </div>
            <div>
                <ActionIcon type='edit' arialabel="edit"  onClick={ launchModal } />
                <ActionIcon type='bin' arialabel="delete"  onClick={ deleteNote } />
            </div>
            <ModalDialog ref={previewNoteRef} >
                <RichNote  folder={ props.folder } onFinish={ hidePreviewModal } item_id={ props.item.id } mode="preview"/>
            </ModalDialog>
            <ModalDialog ref={editNoteRef} >
                <RichNote  folder={ props.folder } onFinish={ hideModal } item_id={ props.item.id }/>
            </ModalDialog>
        </li>
    );
}

export default connect( null, mapDispatchToProps )( NotesListItem );