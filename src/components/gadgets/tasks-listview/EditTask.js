import React from "react";
import { connect } from "react-redux";
import { editTask, newTask } from "../../../statemanagement/Project/ProjectActionCreator";

import SimpleList from "../../layouts/simple-listview/SimpleList";

import "./EditTask.css";

const mapStateToProps = (state, props) => {
    if( props.item_id ) {
        const item = state.content[props.folder].tasks[props.item_id];

        return {
            ...props,
            item
        }
    }

    return {
        ...props
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        createTask: (folder, payload) => dispatch( newTask(folder, payload) ),
        editTask: (folder, payload) => dispatch( editTask( folder, payload ) )
    }
}

function EditTask(props) {
    const submitHandler = (ev) => {
        ev.preventDefault();

        if( props.preview == true ){
            return false;
        }

        const formData = new FormData(ev.target);

        const payload = {};
        for (var [key, value] of formData.entries()) { 
            console.log(key, value);

            payload[key] = value;
        }

        if( props.item ){
            props.editTask( props.folder, payload );
        } else {
            payload.progress = 0;
            payload.status = 'open';
    
            props.createTask( props.folder, payload );
        }

        if( props.onFinish ){
            try {
                props.onFinish();
            } catch(e) {
                console.error(e.message);
            }
        }
    }

    return (
        <div className="Edit-task">
            <form onSubmit={ submitHandler } aria-label="Task details">
                { 
                    props.item ? <input type="hidden" name="id" value={ props.item.id }/> : ''
                }
                {
                    props.item ? <input type="hidden" name="folder" value={ props.item.folder }/> : ''
                }

                <SimpleList>
                    <label htmlFor="title">Title</label>
                    <input readOnly={ props.preview } type="text" name="title" defaultValue={props.item ? props.item.title : ''}/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="description">Description</label>
                    <textarea readOnly={ props.preview } name="description" defaultValue={props.item ? props.item.description : ''}/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="tasknotes">Task notes</label>
                    <textarea readOnly={ props.preview } name="tasknotes" defaultValue={props.item ? props.item.tasknotes : ''}/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="priority">Priority</label>
                    <select disabled={ props.preview } name="priority" defaultValue={props.item ? props.item.priority : '45'}>
                        <option value="100">Critical</option>
                        <option value="85">Very High</option>
                        <option value="65">High</option>
                        <option value="45">Medium</option>
                        <option value="15">Low</option>
                    </select>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="estimate">Estimate (in mins)</label>
                    <input readOnly={ props.preview } type="number" name="estimate" defaultValue={props.item ? props.item.estimate : '60'}/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="datetime-local">Deadline</label>
                    <input readOnly={ props.preview } type="date" name="deadline" defaultValue={props.item ? props.item.deadline : ''}/>
                </SimpleList>

                {
                    !props.preview ? (
                        (<div className="Modal-buttons">
                            <input type="submit" value="Save"/>
                        </div>) 
                    ): ''
                }
            </form>
        </div>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( EditTask );