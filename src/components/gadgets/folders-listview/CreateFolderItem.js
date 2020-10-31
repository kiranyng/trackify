import React from 'react';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
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
            <div tabIndex="0" role="button" arialabel="create folder" className="Folder-name" onClick={ launchNewFolderModal }>
                <span className="Create-folder-item-icon">NEW Folder</span>
            </div>
            <ModalDialog ref={newFolderModelRef} title="Create new folder">
                <EditFolder mode="create" folder={ props.folder } onFinish={ editFinishHanlder }/>
            </ModalDialog>
        </li>
    );
}

export default CreateFolderItem;