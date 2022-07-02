import React from 'react';

import { connect } from 'react-redux';

import "./NotesList.css";
import CreateNote from './CreateNote';
import NotesListItem from './NotesListItem';


const mapStateToProps = (state, ownProps) => {
    const notesObj = state.content[ownProps.folder] && state.content[ownProps.folder].notes;
    const list = [];

    if(notesObj) {
        for (const item of Object.entries(notesObj)) {
            if(state.search && state.search.term && state.search.term.length > 0){ 
                if(state.search.results.notes[item[0]]){
                    list.push( item[1] );// item[0] is key and item[1] is val
                }
            } else {
                list.push( item[1] );// item[0] is key and item[1] is val
            }
        }
    }

    return {
        ...ownProps,
        list
    };
};


function NotesList(props) {
    return (
        <div className="Notes-list-region" role="region" aria-label="Notes list">
            <ul className="Notes-list">
                <CreateNote folder={props.folder} />

                { props.list.length === 0 ? <li>No Notes!</li> : '' }
                
                {props.list.map((item, index) => {
                    return <NotesListItem key={item.id} folder={props.folder} item={item}/>
                })}
            </ul>
        </div>
    );
}

export default connect(mapStateToProps)(NotesList);
