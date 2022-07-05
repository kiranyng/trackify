import React, { forwardRef, useImperativeHandle } from 'react';
import { connect } from 'react-redux';

import "./TasksList.css";
import CreateTask from './CreateTask';
import TasksListItem from './TasksListItem';
import { newTask } from '../../../statemanagement/Project/ProjectActionCreator';

const mapStateToProps = (state, props) => {
    const tasksObj =  state.content[props.folder] && state.content[props.folder].tasks;
    const list = [];

    if(tasksObj) {
        for (const item of Object.entries(tasksObj)) {
            if(state.search && state.search.term && state.search.term.length > 0){ 
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

const mapDispatchToProps = (dispatch, props) => {
    return {
        createTask: (folder, payload) => dispatch( newTask(folder, payload) )
    }
}

function TasksList(props, ref) {
    useImperativeHandle(ref, () => {
        return {
            pasteTask: (pastedTask) => {
                console.log('tasksList-pastedTask:', pastedTask);

                delete pastedTask['id'];
                delete pastedTask['folder'];
                props.createTask(props.folder, pastedTask);
            }
        }
    });

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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })( forwardRef(TasksList) );