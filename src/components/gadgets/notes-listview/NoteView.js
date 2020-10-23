import React from "react";
import { connect } from 'react-redux';
import { editNote, newNote } from "../../../statemanagement/Project/ProjectActionCreator";

import SimpleList from "../../layouts/simple-listview/SimpleList";

import "./NoteView.css";

const mapStateToProps = (state, props) => {
    if( props.item_id ){
        const item = state.content[props.folder].notes[props.item_id];

        return {
            ...props,
            item
        }
    } else {
        return {
            ...props
        }
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        createNote: ( folder, data ) => dispatch( newNote( folder, data ) ),
        editNote: ( folder, data ) => dispatch( editNote( folder, data ) )
    }
}

function NoteView(props) {
/*
        <div className="Note-view" contentEditable={true}>
            {props.item ? props.item.text : ''}
        </div>
*/
    const submitHandler = (ev) => { 
        ev.preventDefault();

        const payload = {};

        const formData = new FormData(ev.target);
        for (var [key, value] of formData.entries()) { 
            payload[key] = value;
        }

        console.log("note update data:", payload);

        if( !props.item_id ){
            props.createNote(props.folder, payload);
        } else {
            props.editNote(props.folder, payload);
        }

        if( props.onFinish ){
            try {
                props.onFinish();
            } catch( e ) {
                console.error( e.message );
            }
        }
    }

    return (
        <form onSubmit={ submitHandler }>
            <input type="hidden" name="folder" defaultValue={ props.folder }/>
            {
                props.item_id ? <input type="hidden" name="id" value={ props.item_id }/> : ''
            }

            <SimpleList>
                <label htmlFor="text">Note</label>
                <textarea name="text" defaultValue={ props.item ? props.item.text : '' }/>
            </SimpleList>
            
            <div className="Modal-buttons">
                <input type="submit" value="Save"/>
            </div>
        </form>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( NoteView );