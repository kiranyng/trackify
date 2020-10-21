import React from 'react';
import FoldersList from '../../layouts/folders-listview/FoldersList';
import NotesList from '../../layouts/notes-listview/NotesList';
import GridView from '../../layouts/responsive-gridview/GridView';
import TasksList from '../../layouts/tasks-listview/TasksList';
import PageContent from '../page-content/PageContent';

const Explorer = (props) => {
    const folder = props.folder ? props.folder : (props.match.params.folder ? props.match.params.folder : '$');

    return (
        <PageContent title="Dashboard">
            <GridView cols="3">
                <FoldersList folder={ folder}/> 
                <TasksList folder={ folder }/>
                <NotesList folder={ folder }/>
            </GridView>
        </PageContent>
    );
}

export default Explorer;