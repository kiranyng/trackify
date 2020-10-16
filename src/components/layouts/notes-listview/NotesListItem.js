import React from 'react';

function NotesListItem(props) {
    return <li> {props.item.text.substring(0, 15)} </li>
}

export default NotesListItem;