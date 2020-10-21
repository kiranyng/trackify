import React from 'react';

import EditFolder from './EditFolder';
import ModalDialog from '../../gadgets/modal-dialog/ModalDialog.js'
import { Link } from 'react-router-dom';

function FoldersListItem(props) {
    const modelRef = React.useRef();

    const launchModal = () => {
        modelRef.current.openModal();
    }
    
    const editFinishHanlder = (ev) => {
        console.log('Editing finished!');

        modelRef.current.closeModal();
    }

    // <div onClick={ launchModal }> { props.item.name } </div>
    return (
        <li> 
            <div> 
                <Link to={`/explore/${ props.item.id }`}> { props.item.name } </Link> 
            </div>
            <ModalDialog ref={modelRef} title={`Rename folder from '${props.item.name}'`}>
                <EditFolder item_id={props.item.id} onFinish={ editFinishHanlder } />
            </ModalDialog>
        </li>
    );
}

export default FoldersListItem;