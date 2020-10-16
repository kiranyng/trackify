import React from 'react';
import TasksListItem from './TasksListItem';

import "./TasksList.css";

function TasksList(props) {
    return (
        <ul className="Tasks-list">
            {props.list.map((item, index) => {
                return <TasksListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default TasksList;