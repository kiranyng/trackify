import React from 'react';
import { connect } from 'react-redux';

import { startTask, resolveTask, rejectTask, reopenTask, deleteTask, timerTrackTask, recentsTouch, recentsDelete } from '../../../statemanagement/Project/ProjectActionCreator';

import ActionIcon from '../../layouts/action-icon/ActionIcon';
import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import EditTask from './EditTask';

const mapDispatchToProps = ( dispatch, props ) => {
    const timestamp = Date.now();

    return {
        start: () => dispatch( startTask( props.item.folder, props.item.id, timestamp ) ),
        resolve: () => dispatch( resolveTask( props.item.folder, props.item.id ) ),
        reject: () => dispatch( rejectTask( props.item.folder, props.item.id ) ),
        reopen: () => dispatch( reopenTask( props.item.folder, props.item.id ) ),
        delete: () => dispatch( deleteTask( props.item.folder, props.item.id ) ),

        track: () => dispatch( timerTrackTask( props.item.folder, props.item.id ) ),

        upsertRecents: () => dispatch( recentsTouch( props.item.folder, props.item.id, 'task' ) ),
        deleteFromRecents: () => dispatch( recentsDelete( props.item.folder, props.item.id, 'task' ) )
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
        props.start();
        props.track();
    }

    const reopenTask = () => {
        if( window.confirm( `Really want to reopen task '${props.item.title}'?` ) ) {
            props.reopen()
        }
    }

    const deleteTask = () => {
        if( window.confirm( `Really want to delete task '${props.item.title ? props.item.title : 'Empty note'}'?` ) ) {
            props.delete();

            props.deleteFromRecents();
        }
    }

    const launchModal = () => {
        props.upsertRecents();

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
    } else if(status === 'inprogress') {
        statusClassName = 'task-listitem-inprogress';
    }

    const dragStartHandler = ( ev ) => {
        const endtime = (new Date(Date.now()));
        endtime.setHours( parseInt( endtime.getHours() ) + 1 );
        endtime.setMinutes( parseInt( endtime.getMinutes() ) + 15 );

        ev.dataTransfer.setData("text", JSON.stringify( {
            id: props.item.id,
            subject: props.item.title,
            start: {
                timestamp: Date.now()
            },
            end: {
                timestamp: endtime.getTime()
            }
        } ) );
    }

    return (
        <li className={ `task-listitem ${statusClassName}` }> 
            <div>
            {
                ( status === 'open' || status === 'reopen' ) ? 
                    <div>
                        <ActionIcon type='accept' arialabel="resolve task" onClick={ resolveTask } />
                        <ActionIcon type='reject' arialabel="reject task" onClick={ rejectTask } />
                    </div> : 
                    <div>
                        <ActionIcon type='refresh' onClick={ reopenTask } />
                    </div>
            }
            </div>
            
            <div role="button" tabIndex="0" aria-label={ props.item.title } className={ `task-listitem-title ${ statusClassName }` } onClick={ launchModal } draggable="true"  onDragStart={ dragStartHandler } > { props.item.title } </div> 
            
            <div>
            {
                ( status === 'open' || status === 'reopen' )? <ActionIcon type='play' arialabel="add to timer queue" onClick={ trackTask }/> : ''
            }
                <ActionIcon type='bin' arialabel="delete" onClick={ deleteTask } />
            </div>

            <ModalDialog ref={ editModalRef } title="Task details">
                <EditTask item_id={ props.item.id } folder={props.item.folder} onFinish={ closeModal }/>
            </ModalDialog>
        </li>
    );
}

// export default TasksListItem;

export default connect( null, mapDispatchToProps )( TasksListItem );