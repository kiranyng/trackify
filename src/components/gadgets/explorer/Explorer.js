import React from 'react';
import { connect } from 'react-redux';

import PageContent from '../../layouts/page-content/PageContent';
import GridView from '../../layouts/responsive-gridview/GridView';
import FoldersList from '../folders-listview/FoldersList';
import TasksList from '../tasks-listview/TasksList';
import NotesList from '../notes-listview/NotesList';
import FolderBreadcrumbs from '../folder-breadcrumbs/FolderBreadcrumbs';

const mapStateToProps = ( state, props ) => {
    const folder = props.folder ? props.folder : (props.match.params.folder ? props.match.params.folder : '$');
    const title = (folder === '$') ? 'Explorer' : state.content[folder].name;

    return {
        folder,
        title
    }
}

const Explorer = (props) => {
    return (
        <PageContent title={ props.title }>
            <div>
                <FolderBreadcrumbs folder={ props.folder }/>
            </div>
            <GridView cols="3">
                <FoldersList folder={ props.folder}/> 
                <TasksList folder={ props.folder }/>
                <NotesList folder={ props.folder }/>
            </GridView>
        </PageContent>
    );
}

export default connect( mapStateToProps )( Explorer );