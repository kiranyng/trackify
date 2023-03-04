import React from 'react';
import { Route,  BrowserRouter as Router } from 'react-router-dom';

import "./Portal.css";

import AppBranding from '../../gadgets/app-branding/AppBranding';
import StructureMenu from '../../gadgets/structure-treeview/StructureMenu';
import Explorer from '../../pages/explorer/Explorer';
import Dashboard from '../../pages/dashboard/Dashboard';
import Quotes from '../../gadgets/quotes-block/Quotes';
import ExportData from '../../gadgets/export-data/ExportData';
import Recents from '../../gadgets/recents/Recents';
// import TimerTaskbar from '../../gadgets/timer-taskbar/TimerTaskbar';
import TimelineContianer from '../../gadgets/timeline/timeline-container/TimelineContianer';
import DigitalClock from '../../gadgets/digital-clock/digitalClock';

function Portal(props) {
    return (
        <div className="c-portal">
            <Router>
                <div className="left-sidebar">
                    <header>
                        <AppBranding appTitle={props.appTitle} appIcon={props.appIcon}/>
                    </header>
                    <section>
                        <DigitalClock/>
                    </section>
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
                    <main className="main-content-area">
                        <Route path="/" exact component={ Dashboard }/>
                        <Route path="/explore" exact>
                            <Explorer folder="$"/>
                        </Route>
                        <Route path="/explore/:folder" component={ Explorer }/>
                    </main>
                    <div className='header'>
                        <Quotes/>
                    </div>
                    { /* <TimerTaskbar/> */ }
                    <TimelineContianer/>
                    <TimelineContianer hideClock="true"/>
                </div>
                <div>
                    { /* <!-- LIA chat bot - https://lia27.ai/home THANKYOU LIA -- pardon me if this is not allowed - this is just for my personal use --> */ }
                    <iframe id="iframe-04" title="lia-chat-bot" frameBorder="0" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation" src="javascript: window.frameElement.getAttribute(&quot;srcdoc&quot;);" srcDoc="<script>window.onmessage = function(event) {event.source.postMessage({iframeId: event.data, scrollHeight: document.body.getBoundingClientRect().height || document.body.scrollHeight}, event.origin);};</script><body style='margin: 0'><script>
                    window.watsonAssistantChatOptions = {
                        integrationID: &quot;772f6695-2e1f-4c5a-8c01-aa7c8d073c1e&quot;,
                        region: &quot;us-south&quot;,
                        serviceInstanceID: &quot;522f2b0f-6c97-4b80-8799-a4f1df953126&quot;,
                        onLoad: function(instance) { instance.render(); }
                        };
                    setTimeout(function(){
                        const t=document.createElement('script');
                        t.src=&quot;https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js&quot;;
                        document.head.appendChild(t);
                    });
                    </script></body>" style={{height: '100%',overflow: 'auto', transition: 'height 1.5s ease 0s'}}></iframe>    
                </div>
            </Router>
        </div>
    );
}

export default Portal;
