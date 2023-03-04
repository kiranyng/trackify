import React from 'react';
import { connect } from 'react-redux';

import "./FoldersList.css";
import CreateFolderItem from './CreateFolderItem';
import FoldersListItem from './FoldersListItem';

const mapStateToProps = (state, ownProps) => {
    const folderContent = state.content[ownProps.folder] && state.content[ownProps.folder].fldr;
    
    const list = [];
    const folder = ownProps.folder;

    const isFolderHaveSearchResults = (folderId) => {
        if( state.search.folderMap[folderId]){
            return true;
        }

        const fldrContent = state.content[folderId] && state.content[folderId].fldr;
        for (const [key] of Object.entries(fldrContent)) {
            return isFolderHaveSearchResults(key);
        }

        return false;
    };

    if(folderContent) {
        const isSearchActive = (state.search && state.search.term && state.search.term.length > 0);
        for (const [key] of Object.entries(folderContent)) {
            if(isSearchActive) {
                if( isFolderHaveSearchResults(key) ) {
                    list.push(state.content[key]);
                }
            } else {
                list.push(state.content[key]);
            }
        }
    }

    return {
        list,
        folder
    };
};


function FoldersList(props) {
    return ( 
        <div className="Folder-grid-view" role="region" aria-label="Folders list">
            <ul className = "Folders-list" >
                <CreateFolderItem folder={props.folder}/>
                { props.list.length === 0 ? <li><div className="Folder-no-subfolders">No subfolders!</div></li> : '' }
                {
                    props.list.map((item, index) => {
                        return <FoldersListItem key = { item.id } item = { item } />
                    })
                }
            </ul>
        </div>
    );
}

export default connect(mapStateToProps)(FoldersList);