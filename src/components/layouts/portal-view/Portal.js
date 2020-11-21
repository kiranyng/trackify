import React from 'react';
import { Route,  BrowserRouter as Router } from 'react-router-dom';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import StructureMenu from '../../gadgets/structure-treeview/StructureMenu';
import Explorer from '../../gadgets/explorer/Explorer';
import Dashboard from '../../gadgets/dashboard/Dashboard';
import TimerTaskbar from '../../gadgets/timer-taskbar/TimerTaskbar';
import Quotes from '../../gadgets/quotes-block/Quotes';
import ExportData from '../../gadgets/export-data/ExportData';
import Recents from '../../gadgets/recents/Recents';

function Portal(props) {
    return (
        <div className="c-portal">
            <Router>
                <div className="left-sidebar">
                    <header>
                        <AppBranding appTitle={props.appTitle} appIcon={props.appIcon}/>
                    </header>
                    <section>
                        <ExportData/>
                    </section>
                    <section>
                        <header>Structure</header>
                        <StructureMenu/>
                    </section>
                    <section>
                        <header>Recents</header>
                        <Recents/>
                    </section>
                </div>
                <div className="main-content">
                    <header>
                        <Quotes/>
                    </header>
                    <main className="main-content-area">
                        <Route path="/" exact component={ Dashboard }/>
                        <Route path="/explore" exact>
                            <Explorer folder="$"/>
                        </Route>
                        <Route path="/explore/:folder" component={ Explorer }/>
                    </main>
                    <TimerTaskbar/>
                </div>
            </Router>
        </div>
    );
}

export default Portal;
