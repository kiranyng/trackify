import React from 'react';
import { connect } from 'react-redux';

import EditFolder from './EditFolder';
import ModalDialog from '../../layouts/modal-dialog/ModalDialog.js'
import { Link } from 'react-router-dom';
import { deleteFolder } from '../../../statemanagement/Project/ProjectActionCreator';
import ActionIcon from '../../layouts/action-icon/ActionIcon';

//      deleteFolder: ( id ) => dispatch( deleteFolder( id ) )

const mapDispatchToProps = ( dispatch, props ) => {
    return {
        deleteFolder: () => dispatch( deleteFolder( props.item.id ) )
    }
}

function FoldersListItem(props) {
    const modelRef = React.useRef();

    const launchModal = () => {
        modelRef.current.openModal();
    }
    
    const editFinishHanlder = (ev) => {
        console.log('Editing finished!');

        modelRef.current.closeModal();
    }

    const deleteFolder = () => {
        if( window.confirm( `Really want to delete folder '${ props.item.name }'?` ) ) {
            props.deleteFolder();
        }
    }

    const showMoveToFolderModal = ( ev ) => {
        ev.preventDefault();

        alert( "folder right clicked" );
    }

    // <div onClick={ launchModal }> { props.item.name } </div>
    return (
        <li> 
            <div onContextMenu={ showMoveToFolderModal }>
                <Link to={`/explore/${ props.item.id }`}> { props.item.name } </Link> 
                <ActionIcon type='edit' arialabel="edit" onClick={ launchModal } />
                <ActionIcon type='bin' arialabel="delete" onClick={ deleteFolder } />
            </div>
            <ModalDialog ref={modelRef} title={`Rename folder from '${props.item.name}'`}>
                <EditFolder item_id={props.item.id} onFinish={ editFinishHanlder } />
            </ModalDialog>
        </li>
    );
}

export default connect( null, mapDispatchToProps )( FoldersListItem );