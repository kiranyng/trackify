import React from 'react';
import { connect } from 'react-redux';

import './timer-taskbar.css';
import TaskTimer from './TaskTimer';
import { timerStartNextTask } from '../../../statemanagement/Project/ProjectActionCreator';

const mapStateToProps = ( state ) => {
    const activeTask = state.task_timers.active;
    const taskList = state.task_timers.queue;

    return {
        activeTask,
        taskList
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        startNext: ( startTimestamp )=> {
            dispatch( timerStartNextTask( startTimestamp ) );
        }
    }
};

const TimerTaskbar = ( props ) => {
    React.useEffect( () => {
        if( props.activeTask == null && props.taskList.length > 0) {
            props.startNext( Date.now() );
        }
    } );

    return (
        <ul className="Timer-taskbar">
            {
                props.activeTask ? <TaskTimer data={ props.activeTask }/> : ''
            }
            {
                props.taskList.map(( item ) => {
                    return <TaskTimer key={ item.id } data={ item }/>
                })
            }
        </ul>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( TimerTaskbar );