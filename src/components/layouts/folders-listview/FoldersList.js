import React from 'react';
import FoldersListItem from './FoldersListItem';

import "./FoldersList.css";

function FoldersList(props) {
    return (
        <ul className="Folders-list">
            {props.list.map((item, index) => {
                return <FoldersListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default FoldersList;