import React from 'react';
import { Route,  BrowserRouter as Router } from 'react-router-dom';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import StructureMenu from '../structure-treeview/StructureMenu';
import Explorer from '../../gadgets/explorer/Explorer';
import Dashboard from '../../gadgets/dashboard/Dashboard';

function Portal(props) {
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
                <Router>
                    <Route path="/" exact component={ Dashboard }/>
                    <Route path="/explore" exact>
                        <Explorer folder="$"/>
                    </Route>
                    <Route path="/explore/:folder" component={ Explorer }/>
                </Router>
            </main>
        </div>
    );
}

export default Portal;
