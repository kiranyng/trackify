import React from 'react';

import PageContent from '../../layouts/page-content/PageContent';
import GridView from '../../layouts/responsive-gridview/GridView';
import FoldersList from '../folders-listview/FoldersList';
import TasksList from '../tasks-listview/TasksList';
import NotesList from '../notes-listview/NotesList';


const Explorer = (props) => {
    const folder = props.folder ? props.folder : (props.match.params.folder ? props.match.params.folder : '$');

    return (
        <PageContent title="Explore">
            <GridView cols="3">
                <FoldersList folder={ folder}/> 
                <TasksList folder={ folder }/>
                <NotesList folder={ folder }/>
            </GridView>
        </PageContent>
    );
}

export default Explorer;