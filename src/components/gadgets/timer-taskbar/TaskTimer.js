import React from 'react';
import { connect } from 'react-redux';

import './TaskTimer.css';

import ActionIcon from '../../layouts/action-icon/ActionIcon';
import Icon from '../../layouts/icon/Icon';
import { rejectTask, reopenTask, resolveTask, timerStopTask } from '../../../statemanagement/Project/ProjectActionCreator';

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
    }, []);

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
                <div className="task-timer-title"> { props.title } </div>
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
        </li>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( TaskTimer );