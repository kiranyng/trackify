import React from 'react';

import { connect } from 'react-redux';

import "./NotesList.css";
import CreateNote from './CreateNote';
import NotesListItem from './NotesListItem';


const mapStateToProps = (state, ownProps) => {
    const notesObj = state.content[ownProps.folder] && state.content[ownProps.folder].notes;
    const list = [];

    if(notesObj) {
        for (const [key, value] of Object.entries(notesObj)) {
            list.push(value);
        }
    }

    return {
        ...ownProps,
        list
    };
};


function NotesList(props) {
    return (
        <ul className="Notes-list">
            <CreateNote folder={props.folder} />

            { props.list.length === 0 ? <li>No Notes!</li> : '' }
            
            {props.list.map((item, index) => {
                return <NotesListItem key={item.id} folder={props.folder} item={item}/>
            })}
        </ul>
    );
}

export default connect(mapStateToProps)(NotesList);
