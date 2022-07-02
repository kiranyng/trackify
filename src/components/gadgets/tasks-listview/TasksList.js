import React from 'react';
import { connect } from 'react-redux';

import "./TasksList.css";
import CreateTask from './CreateTask';
import TasksListItem from './TasksListItem';

const mapStateToProps = (state, props) => {
    const tasksObj =  state.content[props.folder] && state.content[props.folder].tasks;
    const list = [];

    if(tasksObj) {
        for (const item of Object.entries(tasksObj)) {
            if(state.search.term && state.search.term.length > 0){ 
                if(state.search.results.tasks[item[0]]){
                    list.push( item[1] );// item[0] is key and item[1] is val
                }
            } else {
                list.push( item[1] );// item[0] is key and item[1] is val
            }
        }
    }

    return {
        list
    }
}

function TasksList(props) {
    return (
        <div className="Task-list-region" role="region" aria-label="Tasks list">
            <ul className="Tasks-list">
                <CreateTask folder={ props.folder }/>
                { props.list.length === 0 ? <li>No tasks!!</li> : '' }
                {props.list.map((item, index) => {
                    return <TasksListItem folder={ props.folder } key={item.id} item={item}/>
                })}
            </ul>
        </div>
    );
}

export default connect(mapStateToProps)(TasksList);