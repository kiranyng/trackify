import React from 'react';

function TasksListItem(props) {
    return <li> {props.item.title.substring(0, 15)} </li>
}

export default TasksListItem;