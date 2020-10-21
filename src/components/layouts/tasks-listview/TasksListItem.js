import React from 'react';
import ModalDialog from '../../gadgets/modal-dialog/ModalDialog';
import EditTask from './EditTask';

function TasksListItem(props) {
    const editModalRef = React.useRef();

    const launchModal = () => {
        editModalRef.current.openModal();
    }

    const closeModal = () => {
        editModalRef.current.closeModal();
    }

    return (
        <li> 
            <div onClick={ launchModal }> {props.item.title.substring(0, 15)} </div> 
            <ModalDialog ref={ editModalRef }>
                <EditTask item_id={ props.item.id } folder={props.item.folder} onFinish={ closeModal }/>
            </ModalDialog>
        </li>
    );
}

export default TasksListItem;