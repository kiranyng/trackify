import React from 'react';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import PageContent from '../../gadgets/page-content/PageContent';
import FoldersList from '../folders-listview/FoldersList';
import NotesList from '../notes-listview/NotesList';
import GridView from '../responsive-gridview/GridView';
import StructureMenu from '../structure-treeview/StructureMenu';
import TasksList from '../tasks-listview/TasksList';

function Portal(props, state) {
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
            <PageContent title="Dashboard">
                <GridView cols="3">
                    <FoldersList list={[{id:111, name:"folder-1"},{id: 222, name:"folder-2"},{id: 333, name:"folder-3"}]}/>
                    <TasksList list={[{id:111, title:"task-1", description: "descr 1"},{id: 222, title:"task-2", description: "descr 2"},{id: 333, title:"task-3", description: "descr 3"}]}/>
                    <NotesList list={[{id:111, text:"note-1"},{id: 222, text:"note-2"},{id: 333, text:"note-3"}]}/>
                </GridView>
            </PageContent>
        </main>
    </div>
  );
}

export default Portal;
