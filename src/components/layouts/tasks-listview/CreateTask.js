import React from 'react';

import ModalDialog from '../../gadgets/modal-dialog/ModalDialog';
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
        <li >
            <div onClick={ openEditTaskModal }>
                <span className="Create-task-icon">NEW</span>
            </div>
            <ModalDialog ref={newTaskModelRef} title="Create new task">
                <EditTask folder={ props.folder } onFinish={ closeModal }/>
            </ModalDialog>
        </li>
    );
}

export default CreateTask;