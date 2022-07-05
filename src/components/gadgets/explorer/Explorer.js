import React, { createRef, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import PageContent from '../../layouts/page-content/PageContent';
import GridView from '../../layouts/responsive-gridview/GridView';
import FoldersList from '../folders-listview/FoldersList';
import TasksList from '../tasks-listview/TasksList';
import NotesList from '../notes-listview/NotesList';
import FolderBreadcrumbs from '../folder-breadcrumbs/FolderBreadcrumbs';
import Search from '../search/search';
import { setToastMsg } from '../../../statemanagement/Project/ProjectActionCreator';

const mapStateToProps = ( state, props ) => {
    const folder = props.folder ? props.folder : (props.match.params.folder ? props.match.params.folder : '$');
    const title = (folder === '$') ? 'Explorer' : state.content[folder].name;
    
    return {
        folder,
        title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showToastMsg: (msg) => {
            dispatch( setToastMsg(msg) );
        }
    }
}

const Explorer = (props) => {
    const ref = useRef();

    const tasksListRef = createRef();
    const notesListRef = createRef();

    const pasteHandler = (ev) => {
        try{
            const item = JSON.parse(ev.clipboardData.getData('text'));

            props.showToastMsg(`Pasted ${item.type}: ${item.data.title}`);

            switch(item.type){
                case 'task':
                    tasksListRef.current.pasteTask(item.data);
                    break;
                case 'note':
                    notesListRef.current.pasteNote(item.data);
                    break;
                default:
                    console.warn('Explorer> Clipboard does not have neither Task nor Note, to paste.', item);
            }
        }catch(err){
            console.warn('Explorer> Clipboard read error', ev.clipboardData.getData('text'), err);
        }
    }

    useEffect(() => {
        ref.current.addEventListener('paste', pasteHandler);

        const refForCleanup = ref.current;
        return () => {
            refForCleanup.current.removeEventListener('paste', pasteHandler);
        }
    });

    return (
        <PageContent title={ props.title } tools={ <Search folder={props.folder} /> } onContextMenu={ pasteHandler }>
            <div>
                <FolderBreadcrumbs folder={ props.folder }/>
            </div>
            <div ref={ref}>
                <GridView cols="3" innerRef={ref}>
                    <FoldersList folder={ props.folder}/> 
                    <TasksList folder={ props.folder } ref={tasksListRef}/>
                    <NotesList folder={ props.folder } ref={notesListRef}/>
                </GridView>
            </div>
        </PageContent>
    );
}

export default connect( mapStateToProps, mapDispatchToProps, null, { forwardRef: true } )( Explorer );