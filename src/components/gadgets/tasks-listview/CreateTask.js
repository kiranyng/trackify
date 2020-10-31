import React from 'react';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import EditTask from './EditTask';

function CreateTask( props ) {
    const newTaskModelRef = React.useRef();

    const openEditTaskModal = () => {
        newTaskModelRef.current.openModal();
    }

    const closeModal = () => {
        newTaskModelRef.current.closeModal();
    }

    return (
        <li className="Task-create">
            <div tabIndex="0" role="button" arialabel="create task" onClick={ openEditTaskModal }>
                <span className="Create-task-icon">NEW Task</span>
            </div>
            <ModalDialog ref={newTaskModelRef} title="Create new task">
                <EditTask folder={ props.folder } onFinish={ closeModal }/>
            </ModalDialog>
        </li>
    );
}

export default CreateTask;