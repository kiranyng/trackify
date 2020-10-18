import React from "react";
import ActionIcon from "../../gadgets/action-icon/ActionIcon";
import SimpleList from "../simple-listview/SimpleList";

import "./EditTask.css";

function EditTask(props) {
    const submitHandler = (ev) => {
        const formData = new FormData(ev.target);

        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
        }
        
        console.log("Form data:", ...formData);

        ev.preventDefault();
    }

    return (
        <div className="Edit-task">
            <form onSubmit={submitHandler}>
                <SimpleList>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title"/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="description">Description</label>
                    <textarea name="description"/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="start_datetime">Start time</label>
                    <input type="datetime-local" name="start_datetime"/>
                </SimpleList>
                
                <SimpleList>
                    <label htmlFor="datetime-local">End time</label>
                    <input type="datetime-local" name="end_datetime"/>
                </SimpleList>
                
                <input type="submit" text="create"/>
            </form>
        </div>
    );
}

export default EditTask;