import React from 'react';
import { connect } from 'react-redux';

import "./FoldersList.css";
import CreateFolderItem from './CreateFolderItem';
import FoldersListItem from './FoldersListItem';

const mapStateToProps = (state, ownProps) => {
    const folderContent = state.content[ownProps.folder] && state.content[ownProps.folder].fldr;
    
    const list = [];
    const folder = ownProps.folder;

    if(folderContent) {
        for (const [key, value] of Object.entries(folderContent)) {
            console.log(`${key}: ${value}`);

            list.push(state.content[key]);
        }
    }

    return {
        list,
        folder
    };
};


function FoldersList(props) {
    return ( 
        <ul className = "Folders-list Folder-grid-view" >
            <CreateFolderItem folder={props.folder}/>
            { props.list.length === 0 ? <li><div>No subfolders!</div></li> : '' }
            {
                props.list.map((item, index) => {
                    return <FoldersListItem key = { item.id } item = { item } />
                })
            }
        </ul>
    );
}

export default connect(mapStateToProps)(FoldersList);