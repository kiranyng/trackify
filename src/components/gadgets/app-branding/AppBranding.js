import React from 'react';

import "./AppBranding.css";

function AppBranding(props) {
  return (
    <div className="App-branding">
        <img className="App-logo" src={props.appIcon} alt="logo"></img>
        <span className="App-title">{props.appTitle}</span>
    </div>
  );
}

export default AppBranding;
