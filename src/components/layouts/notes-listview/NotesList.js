import React from 'react';
import NotesListItem from './NotesListItem';

import "./NotesList.css";

function NotesList(props) {
    return (
        <ul className="Notes-list">
            {props.list.map((item, index) => {
                return <NotesListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default NotesList;