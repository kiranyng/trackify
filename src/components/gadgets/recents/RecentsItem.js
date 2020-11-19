import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import RichNote from '../notes-listview/RichNote';
import EditTask from '../tasks-listview/EditTask';

const RecentsItem = ( props ) => {
    const modelRef = useRef();

    const item = useSelector( ( state ) => {
        // TODO check for existance/presence first!!

        const result = state.content[ props.item.folder ][ props.item.type+'s' ][ props.item.id ];
        result.title = !result.title ? result.text.substring(15) : result.title;

        return result;
    } );

    const clickHandler = ( ev ) => {
        modelRef.current.openModal();
    }

    const closeModal = ( ev ) => {
        modelRef.current.closeModal();
    }

    const attribs = props.item.type === 'task' ? { title: item.title } : {};

    return (
        <li className="recents-list__item">
            <div onClick={ clickHandler }>
                { item.title }
            </div>

            <ModalDialog ref={ modelRef } { ...attribs }>
                {
                    ( props.item.type === 'task' ) ? (
                        <EditTask item_id={ props.item.id } folder={props.item.folder} onFinish={ closeModal }/>
                    ) : (
                        <RichNote item_id={ props.item.id } folder={props.item.folder} onFinish={ closeModal }/>
                    )
                }
            </ModalDialog>
        </li>
    );
}

export default RecentsItem; 