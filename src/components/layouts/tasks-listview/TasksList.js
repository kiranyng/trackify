import React from 'react';
import TasksListItem from './TasksListItem';

import "./TasksList.css";
import CreateTask from './CreateTask';

function TasksList(props) {
    return (
        <ul className="Tasks-list">
            <CreateTask/>

            {props.list.map((item, index) => {
                return <TasksListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default TasksList;