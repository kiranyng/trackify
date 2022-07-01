import React from 'react';
import { Route,  BrowserRouter as Router } from 'react-router-dom';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import StructureMenu from '../../gadgets/structure-treeview/StructureMenu';
import Explorer from '../../gadgets/explorer/Explorer';
import Dashboard from '../../gadgets/dashboard/Dashboard';
import Quotes from '../../gadgets/quotes-block/Quotes';
import ExportData from '../../gadgets/export-data/ExportData';
import Recents from '../../gadgets/recents/Recents';
// import TimerTaskbar from '../../gadgets/timer-taskbar/TimerTaskbar';
import TimelineContianer from '../../gadgets/timeline/timeline-container/TimelineContianer';

function Portal(props) {
    return (
        <div className="c-portal">
            <Router>
                <div className="left-sidebar">
                    <header>
                        <AppBranding appTitle={props.appTitle} appIcon={props.appIcon}/>
                    </header>
                    <section className="portal-structure">
                        <header>Structure</header>
                        <StructureMenu/>
                    </section>
                    <section className="portal-recents">
                        <header>Recents</header>
                        <Recents/>
                    </section>
                    <section className="portal-export">
                        <ExportData/>
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
                    { /* <TimerTaskbar/> */ }
                    <TimelineContianer/>
                    <TimelineContianer hideClock="true"/>
                </div>
            </Router>
        </div>
    );
}

export default Portal;
