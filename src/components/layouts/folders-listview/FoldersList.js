import React from 'react';
import FoldersListItem from './FoldersListItem';

import "./FoldersList.css";
import CreateFolder from './CreateFolder';

function FoldersList(props) {
    return (
        <ul className="Folders-list">
            <CreateFolder/>

            {props.list.map((item, index) => {
                return <FoldersListItem key={item.id} item={item}/>
            })}
        </ul>
    );
}

export default FoldersList;