import React, { useRef, useState, useEffect } from 'react';

import './timeline-container.css';
import { debounce } from 'lodash';

const calculateDimentions = (el) => {
    const dimentions = { width: el.clientWidth, height: el.clientHeight }
    console.log("> new timeline dimentions:", dimentions);

    return dimentions;
}
/*
const testData = [
    { 
        id: 'test1',
        subject: "task 1",
        start: {
            timestamp: (new Date()).setHours(20,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(21,30,0,0)
        }
    }, { 
        id: 'test2',
        subject: "task 2",
        start: {
            timestamp: (new Date()).setHours(15,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(18,30,0,0)
        }
    }, { 
        id: 'test5',
        subject: "task 5",
        start: {
            timestamp: (new Date()).setHours(5,15,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(6,45,0,0)
        }
    }, { 
        id: 'test3',
        subject: "task 3",
        start: {
            timestamp: (new Date()).setHours(8,0,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(9,30,0,0)
        }
    }, { 
        id: 'test4',
        subject: "task 4",
        start: {
            timestamp: (new Date()).setHours(11,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(12,0,0,0)
        }
    }
];
*/
const testData= [];

const TaskItem = ( props ) => {
    const taskRef = useRef();

    useEffect( () => {
        const adjustUI = () => {
            const diff = Math.abs(new Date(props.start.timestamp) - new Date(props.end.timestamp));
            const minutes = Math.floor((diff/1000)/60);
    
            const goldenRatio = ( props.containerWidth/1440 );
            taskRef.current.style.width = ( goldenRatio * minutes ) +"px";
    
            const date = new Date(props.start.timestamp);
            taskRef.current.style.left =  (( (date.getHours() * 60) + date.getMinutes() ) * goldenRatio) +"px";
        };

        adjustUI();
    }, [props.containerWidth] );

    return (
        <div className="c-timeline-container--task" ref={ taskRef } title={ props.subject }>
            <span>
                { props.subject } { (new Date(props.start.timestamp)).getHours() }:{ (new Date(props.start.timestamp)).getMinutes() } - { (new Date(props.end.timestamp)).getHours() }:{ (new Date(props.end.timestamp)).getMinutes() }
            </span>
        </div>
    );
}

const TimelineClock = ( props ) => {
    return (
        <div className="c-timeline-container--clock">
            {
                ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map(( item ) => {
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

const TimelineContainer = ( props ) => {
    const [ isReady, setReady ] = useState( false );

    const [ dimentions, setDimentions ] = useState( { width:0, height: 0 } );
    const [ data, setData ] = useState( props.data ? props.data : testData );

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
        alert( "task dropped!!" );

        const task = JSON.parse( ev.dataTransfer.getData("text") );

        setData( [ ...data, task ] );

        ev.preventDefault();
        ev.stopPropagation();
    }

    return (
        <React.Fragment>
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
                            <TaskItem key={ item.id } { ...item } containerWidth={ dimentions.width }/>
                        );
                    } )
                }
            </div>
        </React.Fragment>
    );
}

export default TimelineContainer;