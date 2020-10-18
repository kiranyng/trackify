import React from 'react';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import PageContent from '../../gadgets/page-content/PageContent';
import FoldersList from '../folders-listview/FoldersList';
import NotesList from '../notes-listview/NotesList';
import GridView from '../responsive-gridview/GridView';
import StructureMenu from '../structure-treeview/StructureMenu';
import TasksList from '../tasks-listview/TasksList';
import NoteView from '../notes-listview/NoteView';
import ModalDialog from '../../gadgets/modal-dialog/ModalDialog';
import ActionIcon from '../../gadgets/action-icon/ActionIcon';
import Icon from '../../gadgets/icon/Icon';
import EditTask from '../tasks-listview/EditTask';

function Portal(props, state) {
    const modalRef = React.useRef();
    const noteModelRef = React.useRef();

    const openNoteModel = () => {
        noteModelRef.current.openModal();
    }

    const openTaskModal = () => {
        modalRef.current.openModal();
    }

    const closeModal = () => {
        modalRef.current.closeModal();
    }

    return (
        <div className="c-portal">
            <aside className="left-sidebar">
                <header>
                    <AppBranding appTitle={props.appTitle} appIcon={props.appIcon}/>
                </header>
                <section>
                    <header>Structure</header>
                    <StructureMenu items={[{id:"111", name:"Folder 1", children:[{id:"aaa", name:"Folder A"}, {id:"bbb", name:"Folder B"}]}, {id:"222", name:"Folder 2"}, {id:"333", name:"Folder 3"}]}/>
                </section>
            </aside>
            <main className="main-content">
                <header>
                    {props.projectName}
                </header>

                <button onClick={openNoteModel}>Edit Note</button>
                <ActionIcon type="play" onClick={openTaskModal}/>
                
                <ModalDialog ref={noteModelRef}>
                    <NoteView item={{id:'123', text:'asdfasdf'}}/>
                </ModalDialog>

                <ModalDialog ref={modalRef}>
                    <EditTask/>
                </ModalDialog>

                <PageContent title="Dashboard">
                    <GridView cols="3">
                        <FoldersList list={[{id:111, name:"folder-1"},{id: 222, name:"folder-2"},{id: 333, name:"folder-3"}]}/>
                        <TasksList list={[{id:111, title:"task-1", description: "descr 1"},{id: 222, title:"task-2", description: "descr 2"},{id: 333, title:"task-3", description: "descr 3"}]}/>
                        <NotesList list={[{id:111, text:"note-1"},{id: 222, text:"note-2"},{id: 333, text:"note-3"}]}/>

                        <NoteView item={{id:'123', text:'asdfasdf'}}/>

                        <GridView cols="5">
                            <Icon type="play"/>
                            <Icon type="plus"/>
                            <Icon type="next"/>
                            <Icon type="prev"/>
                            <Icon type="star-outline"/>
                            <Icon type="star-filled"/>
                            <Icon type="hamburger"/>
                            <Icon type="warning"/>
                            <Icon type="accept"/>
                            <Icon type="reject"/>
                            <Icon type="edit"/>
                            <Icon type="bin"/>
                        </GridView>

                        <EditTask/>
                    </GridView>
                </PageContent>
            </main>
        </div>
    );
}

export default Portal;
