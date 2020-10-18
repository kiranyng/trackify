import React from 'react';

import "./SimpleList.css";

function SimpleList(props) {
    return (
        <div className="Simple-list">
            {props.children}
        </div>
    );
}

export default SimpleList;