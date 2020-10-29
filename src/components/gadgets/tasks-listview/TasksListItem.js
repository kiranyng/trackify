import React from 'react';
import { connect } from 'react-redux';

import { resolveTask, rejectTask, reopenTask, deleteTask, timerTrackTask } from '../../../statemanagement/Project/ProjectActionCreator';

import ActionIcon from '../../layouts/action-icon/ActionIcon';
import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import EditTask from './EditTask';

const mapDispatchToProps = ( dispatch, props ) => {
    return {
        resolve: () => dispatch( resolveTask( props.item.folder, props.item.id ) ),
        reject: () => dispatch( rejectTask( props.item.folder, props.item.id ) ),
        reopen: () => dispatch( reopenTask( props.item.folder, props.item.id ) ),
        delete: () => dispatch( deleteTask( props.item.folder, props.item.id ) ),
        track: () => dispatch( timerTrackTask( props.item.folder, props.item.id ) ),
    }
}

function TasksListItem(props) {
    const editModalRef = React.useRef();

    const resolveTask = () => {
        props.resolve()
    }

    const rejectTask = () => {
        props.reject()
    }

    const trackTask = () => {
        props.track();
    }

    const reopenTask = () => {
        if( window.confirm( `Really want to reopen task '${props.item.title}'?` ) ) {
            props.reopen()
        }
    }

    const deleteTask = () => {
        if( window.confirm( `Really want to delete task '${props.item.title}'?` ) ) {
            props.delete();
        }
    }

    const launchModal = () => {
        editModalRef.current.openModal();
    }

    const closeModal = () => {
        editModalRef.current.closeModal();
    }

    const status =  props.item.status ? props.item.status : 'open';
    let statusClassName = '';
    
    if( status === 'resolved' ){
        statusClassName = 'task-listitem-resolved';
    } else if(status === 'rejected') {
        statusClassName = 'task-listitem-rejected';
    } 

    return (
        <li className={ `task-listitem ${statusClassName}` } > 
            <div>
            {
                ( status === 'open' || status === 'reopen' ) ? 
                    <div><ActionIcon type='accept' onClick={ resolveTask } /><ActionIcon type='reject' onClick={ rejectTask } /></div> : 
                    <div><ActionIcon type='refresh' onClick={ reopenTask } /></div>
            }
            </div>
            
            <div className={ `task-listitem-title ${ statusClassName }` } onClick={ launchModal }> { props.item.title } </div> 
            
            <div>
            {
                ( status === 'open' || status === 'reopen' )? <ActionIcon type='play' onClick={ trackTask }/> : ''
            }
                <ActionIcon type='bin' onClick={ deleteTask } />
            </div>

            <ModalDialog ref={ editModalRef }>
                <EditTask item_id={ props.item.id } folder={props.item.folder} onFinish={ closeModal }/>
            </ModalDialog>
        </li>
    );
}

// export default TasksListItem;

export default connect( null, mapDispatchToProps )( TasksListItem );