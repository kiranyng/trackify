import React, { useRef, useState, useEffect } from 'react';

import ModalDialog from '../../../layouts/modal-dialog/ModalDialog';
import EditTask from '../../tasks-listview/EditTask';

import './timeline-container.css';
import { debounce } from 'lodash';

const calculateDimentions = (el) => {
    const dimentions = { width: el.clientWidth, height: el.clientHeight }
    console.log("> new timeline dimentions:", dimentions);

    return dimentions;
}
const testData= [];

const TaskItem = ( props ) => {
    const [isActive, setActive] = useState(false);
    const [isSelected, setSelected] = useState(false);

    const taskRef = useRef();
    const editTaskModalRef = useRef();

    const openModal = () => {
        editTaskModalRef.current.openModal();
    }

    const closeModal = () => {
        editTaskModalRef.current.closeModal();
    }

    useEffect( () => {
        const adjustUI = () => {
            const diff = Math.abs(new Date(props.task.start.timestamp) - new Date(props.task.end.timestamp));
            const minutes = Math.floor((diff/1000)/60);
    
            const goldenRatio = ( props.containerWidth/1440 );
            taskRef.current.style.width = ( goldenRatio * minutes ) +"px";
    
            const date = new Date(props.task.start.timestamp);
            taskRef.current.style.left =  (( (date.getHours() * 60) + date.getMinutes() ) * goldenRatio) +"px";
        };

        adjustUI();
    }, [props.containerWidth, props.task.start.timestamp, props.task.end.timestamp] );

    useEffect( () => {
        const rootEl = taskRef.current;

        const calcActiveState = () => {
            var minDate = new Date( props.task.start.timestamp );
            var maxDate =  new Date( props.task.end.timestamp );
            var currentDate =  new Date();
        
            if( currentDate > minDate && currentDate < maxDate ){
                if( isActive !== true ){
                    setActive( true )
                }
            } else {
                if( isActive !== false ){
                    setActive( false )
                }
            }
        }

        const keyDownHandler = ( ev ) => {
            if( ev.keyCode === 46 ){    // delete key
                props.onRemoveItem( props.task );
            } else if( ev.keyCode === 13 || ev.keyCode === 32 ) { // Enter or Space key
                openModal();
            }
        }

        const selectTask = () => {
            setSelected( true );
            rootEl.addEventListener( "keydown", keyDownHandler );
        }

        const deselectTask = () => {
            setSelected( false );
            rootEl.removeEventListener( "keydown", keyDownHandler );
        }

        calcActiveState();
        const interv = setInterval( calcActiveState, 1000 );
        if( isActive !== true ){
            rootEl.addEventListener( "keydown", keyDownHandler );
        }

        rootEl.addEventListener( "focus", selectTask );
        rootEl.addEventListener( "blur", deselectTask );

        return () => {
            clearInterval( interv );

            rootEl.removeEventListener( "focus", selectTask );
            rootEl.removeEventListener( "blur", deselectTask );
            rootEl.removeEventListener( "keydown", keyDownHandler );
        }
    } );

    const getClassName = () => {
        let className = "c-timeline-container--task";

        if( isActive ){ 
            className += " c-timeline-container--task__active";
        }

        if( isSelected ) {
            className += " c-timeline-container--task__selected";
        }

        return className;
    }

    return (
        <div className={ getClassName() } ref={ taskRef } title={ props.task.subject } tabIndex="0">
            <ModalDialog ref={ editTaskModalRef } title="Task details">
                <EditTask item_id={ props.task.id } folder={props.task.details.folder} onFinish={ closeModal }/>
            </ModalDialog>

            <span>
                { props.task.subject }
            </span>
        </div>
    );
}

const TimelineClock = ( props ) => {
    return (
        <div className="c-timeline-container--clock">
            {
                ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00'].map(( item ) => {
                    return <span key={ item }>{ item }</span>
                })
            }
        </div>
    );
};

const TimelineHandle = ( props ) => {
    const [timestamp, setTimestamp] = useState( Date.now() );
    const handleRef = useRef();

    useEffect( () => {
        const goldenRatio = ( props.containerWidth/1440 );

        const date = new Date( timestamp );
        handleRef.current.style.left =  (( (date.getHours() * 60) + date.getMinutes() ) * goldenRatio) +"px";

        const timeout = setTimeout( ()=>{
            setTimestamp( Date.now() );
        }, 1000 );

        return () => {
            clearTimeout( timeout );
        }
    } );

    return (
        <div className="c-timeline-container--handle" ref={ handleRef }></div>
    );
}

const TimelineTaskSettings = ( props ) => {
    const startTime = useRef();
    const endTime = useRef();

    console.log( 'timeline task:', props );

    const applySettings = () => {
        const task = { ...props.task };

        const startDateTime = new Date();
        startDateTime.setHours( startTime.current.value.split(":")[0] );
        startDateTime.setMinutes( startTime.current.value.split(":")[1] );

        const endDateTime = new Date();
        endDateTime.setHours( endTime.current.value.split(":")[0] );
        endDateTime.setMinutes( endTime.current.value.split(":")[1] );

        task.start.timestamp = startDateTime.getTime();
        task.end.timestamp = endDateTime.getTime();

        props.onAddNewTask( props.task );
    }

    return (
        <div className="c-timeline-container--task-settings">
            <label htmlFor="starttime">Select start time:</label>
            <input name="starttime" ref={ startTime } type="time"/>

            <label htmlFor="endtime">Select end time:</label>
            <input name="endtime" ref={ endTime } type="time"/>

            <div className="Modal-buttons">
                <input type="button" value="Ok" onClick={ applySettings }/>
            </div>
        </div>
    );
}

const TimelineContainer = ( props ) => {
    const editModalRef = useRef();

    const [ isReady, setReady ] = useState( false );

    const [ dimentions, setDimentions ] = useState( { width:0, height: 0 } );
    const [ data, setData ] = useState( props.data ? props.data : testData );

    const [ taskModalData, setTaskModalData ] = useState( {} );

    const containerRef = useRef();

    useEffect( () => {
        const debouncedResizeHandler = debounce( () => {
            setDimentions( calculateDimentions( containerRef.current ) );    
        }, 100, {
            'leading': false,
            'trailing': true
        } );
    
        const adjustUI = () => {
            const dimentions = calculateDimentions( containerRef.current )
            const goldenRatio = ( dimentions.width/1440 );
    
            containerRef.current.style.backgroundSize = ( goldenRatio * 60 ) +"px";
        };

        adjustUI();
        window.addEventListener( 'resize', debouncedResizeHandler );

        if( !isReady ){
            debouncedResizeHandler();

            setReady( true );
        }

        return () => {
            window.removeEventListener( 'resize', debouncedResizeHandler );
        }
    }, [isReady, data, dimentions]);

    const dragOverHandler = ( ev ) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    const dropHandler = ( ev ) => {
        const task = JSON.parse( ev.dataTransfer.getData("text") );

        setTaskModalData( task );
        editModalRef.current.openModal();

        ev.preventDefault();
        ev.stopPropagation();
    }

    const addNewTaskHandler = ( newTask ) => {
        setData( [ ...data, newTask ] );

        editModalRef.current.closeModal();
    }

    const removeItemHandler = ( task ) => {
        const filteredData = data.filter( ( item ) => { 
            return item.id !== task.id;
        } );

        setData( filteredData );
    }

    return (
        <React.Fragment>
             <ModalDialog ref={ editModalRef } title="Setup time slot">
                <TimelineTaskSettings task={ taskModalData } onAddNewTask={ addNewTaskHandler }/>
            </ModalDialog>
            { 
                (() => {
                    if( props.hideClock !== "true" ) {
                        return <TimelineClock/>
                    } 
                })()
            }

            <div className="c-timeline-container--wrapper" ref={ containerRef } onDragOver={ dragOverHandler } onDrop={ dropHandler }>
                <TimelineHandle  containerWidth={ dimentions.width }/>
                {
                    data.map( (item) => {
                        return (
                            <TaskItem key={ item.id } task={ item } containerWidth={ dimentions.width } onRemoveItem={ removeItemHandler }/>
                        );
                    } )
                }
            </div>
        </React.Fragment>
    );
}

export default TimelineContainer;