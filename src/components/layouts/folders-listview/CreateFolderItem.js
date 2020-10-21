import React from 'react';

import ModalDialog from '../../gadgets/modal-dialog/ModalDialog';
import EditFolder from './EditFolder';

function CreateFolderItem(props) {
    const newFolderModelRef = React.useRef();

    const launchNewFolderModal = (ev) => {
        newFolderModelRef.current.openModal();
    }

    const editFinishHanlder = (ev) => {
        newFolderModelRef.current.closeModal();
    }

    return (
        <li>
            <div onClick={ launchNewFolderModal }>
                <span className="Create-folder-item-icon">NEW</span>
            </div>
            <ModalDialog ref={newFolderModelRef} title="Create new folder">
                <EditFolder mode="create" folder={ props.folder } onFinish={ editFinishHanlder }/>
            </ModalDialog>
        </li>
    );
}

export default CreateFolderItem;