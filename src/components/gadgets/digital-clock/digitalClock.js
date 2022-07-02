import React, { useEffect, useState } from 'react';
import './digitalClock.css';

function addZero(i) {
    if (i < 10) {i = "0" + i}
        return i;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const getCurrentTime = () => {
    const today = new Date();

    let hrs = today.getHours();
    let ampm = 'AM';
    
    if(hrs >= 12){
        ampm ='PM';
        hrs = hrs-12;
    }

    const timeStr = days[today.getDay()] + ' ' +addZero(hrs)+':'+ addZero(today.getMinutes())+' '+ampm;
    return timeStr;
}

const DigitalClock = ( props ) => {
    const [ time, setTime ] = useState( getCurrentTime() );

    useEffect(() => {
        const interval = setInterval( () => {
            setTime(getCurrentTime());
        }, 1000) ;

        return () => {
            clearInterval( interval );
        }
    }, []);

    return <div className="digitalClock">
        { time }
    </div>
}

export default DigitalClock;