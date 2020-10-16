import React from 'react';

import './GridView.css';

function GridView(props) {
    return (
        <div className={`Grid-view Grid-view-${props.cols && props.cols <= 6 && props.cols > 0 ? props.cols : 3}-cols`}>
            {props.children}
        </div>
    );
}

export default GridView;