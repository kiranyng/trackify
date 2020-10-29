import React from 'react';

const TaskProgress = (props) => {
    return (
        <progress value={ props.data.progress } max="100"> { props.data.progress } </progress>
    );
}

export default TaskProgress;