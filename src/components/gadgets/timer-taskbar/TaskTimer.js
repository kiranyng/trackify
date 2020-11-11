import React, { useRef } from 'react';
import { connect } from 'react-redux';

import './TaskTimer.css';

import ActionIcon from '../../layouts/action-icon/ActionIcon';
import Icon from '../../layouts/icon/Icon';
import { rejectTask, reopenTask, resolveTask, timerStopTask } from '../../../statemanagement/Project/ProjectActionCreator';

import ModalDialog from '../../layouts/modal-dialog/ModalDialog';
import EditTask from '../tasks-listview/EditTask';

const mapStateToProps = ( state, props ) => {
    if(!props.data) {
        throw new Error("Task details must be wrapped within an object with name `data`");
    }

    const isTimer = !!props.data.startTimeStamp;

    var startDateTime = new Date ( isTimer ? props.data.startTimeStamp : Date.now() );
    var estimatedEndDateTime = new Date ( +startDateTime + props.data.estimate * 60 * 1000 ); // estimate is value saved in terms of minutes

    return {
        id: props.data.id, 
        folder: props.data.folder,
        title: props.data.title,
        startDateTime: startDateTime,
        estimatedEndDateTime: estimatedEndDateTime,
        progress: props.data.progress,
        isTimer
    }
}

const mapDispatchToProps = ( dispatch, props )=> {
    return {
        rejectTask: () => {
            dispatch( rejectTask( props.data.folder, props.data.id ) );

            dispatch( timerStopTask( props.data.folder, props.data.id ) );
        }, 
        resolveTask: () => {
            dispatch( resolveTask( props.data.folder, props.data.id ) );

            dispatch( timerStopTask( props.data.folder, props.data.id ) );
        }, 
        reopenTask: () => {
            dispatch( timerStopTask( props.data.folder, props.data.id ) );

            dispatch( reopenTask( props.data.folder, props.data.id ) );
        }
    }
}

const TaskTimer = ( props ) => {
    const modelRef = useRef();

    const currentTime = Date.now();

    const initProgress = ( (+currentTime - +props.startDateTime) / (+props.estimatedEndDateTime - +props.startDateTime) ) * 100;

    const diffTime = props.estimatedEndDateTime - currentTime;//props.startDateTime;
    const diffTimeInSecs = Math.floor( diffTime/1000 );

    const initHrs = Math.floor( diffTimeInSecs / (60 * 60) );
    const initMins = Math.abs( ( initHrs*60 ) - Math.floor( diffTimeInSecs/60 ) );
    const initSecs = Math.abs( diffTimeInSecs - ((initHrs * 60 * 60) + (initMins * 60)) );

    const [hrs, setHrs] = React.useState(initHrs);
    const [mins, setMins] = React.useState(initMins);
    const [secs, setSecs] = React.useState(initSecs);
    const [progress, setProgress] = React.useState(initProgress);

    const [showWarning, setWarningStatus] = React.useState(false);

    const markResolved = () => {
        props.resolveTask();
    }

    const markRejected = () => {
        props.rejectTask()
    }

    const resetAndRemove = () => {
        props.reopenTask();
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = Date.now();
    
            const initProgress = ( (+currentTime - +props.startDateTime) / (+props.estimatedEndDateTime - +props.startDateTime) ) * 100;
    
            const diffTime = props.estimatedEndDateTime -currentTime;//props.startDateTime;
            const diffTimeInSecs = Math.floor( diffTime/1000 );
    
            const initHrs = Math.floor( diffTimeInSecs / (60 * 60) );
            const initMins = Math.abs( ( initHrs*60 ) - Math.floor( diffTimeInSecs/60 ) );
            const initSecs = Math.abs( diffTimeInSecs - ((initHrs * 60 * 60) + (initMins * 60)) );
            
            setHrs( initHrs );
            setMins( initMins );
            setSecs( initSecs );
    
            setProgress( initProgress );
            // document.title = `${  (hrs < 10 ? '0'+hrs : hrs) + ':' + (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs) }`;
    
            if( initProgress >= 100 ){
                clearInterval(interval);
                setWarningStatus(true);
            }
        }, 1000);

        return () => clearInterval( interval );
    });

    const showEditNoteModal = () => {
        modelRef.current.openModal();
    }

    const closeEditNoteModal = () => {
        modelRef.current.closeModal();
    }

    return (
        <li className="Timer-taskbaritem">
            <div className="Timer-taskbaritem-summary">{
                    props.isTimer ? (
                        showWarning ? (
                            <div className="task-timer-warning">
                                <Icon type="warning"></Icon>
                                Timeup!!
                            </div>
                        ) : (
                            <div className="task-timer-countdown" role="timer">
                                <span>{ hrs < 10 ? '0'+hrs : hrs }</span><span>:</span><span>{ mins < 10 ? '0' + mins : mins }</span><span>:</span><span>{ secs < 10 ? '0' + secs : secs }</span>
                                <progress value={ progress } max="100"/>
                            </div>
                        ) ) :
                    <div className="task-timer-title"> { props.title } </div>
            }</div>
            <div className="task-timer-detailview">
                <div className="task-timer-title" onClick={ showEditNoteModal }> { props.title } </div>
                <div>
                    <div className="task-timer-targettime">
                        { props.estimatedEndDateTime.toLocaleString([], { hour12: true }) }
                    </div>
                </div>
                <div className="task-timer-actions"> 
                    <ActionIcon type='accept' onClick={ markResolved }>Accept</ActionIcon>
                    <ActionIcon type='reject' onClick={ markRejected }>Reject</ActionIcon>
                    <ActionIcon type='refresh' onClick={ resetAndRemove }>Reset and Remove</ActionIcon>
                </div>
            </div>
            <ModalDialog ref={ modelRef } title="Preview Task">
                <EditTask folder={ props.folder } item_id={ props.id }  onFinish={ closeEditNoteModal } preview={ true }/>
            </ModalDialog>
        </li>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( TaskTimer );