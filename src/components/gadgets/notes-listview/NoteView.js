import React, { useRef } from "react";
import { connect } from 'react-redux';

import ContentEditable from 'react-contenteditable'

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
    const [ html, setHtml ] = React.useState( props.item && props.item.text ? props.item.text : '' )
    const ref = useRef();

    const submitHandler = (ev) => { 
        ev.preventDefault();

        const payload = {};

        const formData = new FormData(ev.target);
        for (var [key, value] of formData.entries()) { 
            payload[key] = value;
        }

        console.log("note update data:", payload);

        if( !props.item_id ){
            payload.title = payload['text'].substring(0, 30);

            //payload.text = '<p>' + payload.text + '</p>' // use this to make contenteditable insert <p> instead of <div> and <br>
            payload.text = payload.text
            props.createNote(props.folder, payload);
        } else {
            props.editNote(props.folder, payload);
        }

        // close modal only for Create form but not to edit form
        if( !props.item_id && props.onFinish ){
            try {
                props.onFinish() 
            } catch( e ) {
                console.error( e.message );
            }
        }
    }

    const updateNote = (ev) => {
        const prevValue = props.item.text;

        const payload = {
            text: ev.target.value
        };

        if( payload.text !== prevValue ) {
            if( !props.item_id ){
                props.createNote(props.folder, payload);
            } else {
                payload.id = props.item_id;

                props.editNote(props.folder, payload);

                setHtml( ev.target.value );
            }
        }
    }

    if( props.item_id ) {
        return (
            <div className="Note-view">
                <ContentEditable
                    innerRef={ ref }
                    html={ html } // innerHTML of the editable div
                    disabled={ false }       // use true to disable editing
                    onChange={ updateNote } // handle innerHTML change
                />
            </div>
        );
    }
    
    return (
        <form onSubmit={ submitHandler } aria-label="Take a note">
            <input type="hidden" name="folder" defaultValue={ props.folder }/>
            {
                props.item_id ? <input type="hidden" name="id" value={ props.item_id }/> : ''
            }

            <SimpleList>
                <label htmlFor="text">Note</label>
                <textarea className="Note-textarea" name="text" defaultValue={ props.item ? props.item.text : '' }/>
            </SimpleList>
            
            <div className="Modal-buttons">
                <input type="submit" value="Save"/>
            </div>
        </form>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( NoteView );