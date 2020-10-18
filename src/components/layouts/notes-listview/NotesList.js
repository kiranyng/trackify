import React from 'react';
import NotesListItem from './NotesListItem';

import "./NotesList.css";
import CreateNote from './CreateNote';

function NotesList(props) {
    return (
        <ul className="Notes-list">
            <CreateNote/>
            
            {props.list.map((item, index) => {
                return <NotesListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default NotesList;