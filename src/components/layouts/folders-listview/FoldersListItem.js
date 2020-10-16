import React from 'react';

function FoldersListItem(props) {
    return <li> {props.item.name.substring(0, 15)} </li>
}

export default FoldersListItem;