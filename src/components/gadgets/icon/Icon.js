import React from 'react';

import './Icon.css';

const Icon = (props) => {
    return (
        <span className={`icon icon-${props.type}`}> {props.text} </span>
    );
}

export default Icon;