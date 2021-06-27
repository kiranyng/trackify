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
import TimerTaskbar from '../../gadgets/timer-taskbar/TimerTaskbar';
import TimelineContianer from '../../gadgets/timeline/timeline-container/TimelineContianer';

const testData = [];
/*
const testData = [
    { 
        id: 'test1',
        subject: "task 1",
        start: {
            timestamp: (new Date()).setHours(20,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(21,30,0,0)
        }
    }, { 
        id: 'test2',
        subject: "task 2",
        start: {
            timestamp: (new Date()).setHours(15,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(18,30,0,0)
        }
    }, { 
        id: 'test5',
        subject: "task 5",
        start: {
            timestamp: (new Date()).setHours(5,15,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(6,45,0,0)
        }
    }, { 
        id: 'test3',
        subject: "task 3",
        start: {
            timestamp: (new Date()).setHours(8,0,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(9,30,0,0)
        }
    }, { 
        id: 'test4',
        subject: "task 4",
        start: {
            timestamp: (new Date()).setHours(11,30,0,0)
        },
        end: {
            timestamp: (new Date()).setHours(12,0,0,0)
        }
    }
];
*/

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
                    { /* <TimerTaskbar/> */ }
                    <TimelineContianer data={ testData }/>
                    <TimelineContianer hideClock="true"/>
                </div>
            </Router>
        </div>
    );
}

export default Portal;
