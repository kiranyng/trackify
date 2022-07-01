import React from 'react';
// import logo from './logo.svg';
import logo from './logo.png';
import './App.css';

import Portal from './components/layouts/portal-view/Portal';

function App() {
  return (
    <Portal appIcon={logo} appTitle="Tracker" projectName="Tracker" pageTitle="Tracker"/>
  );
}

export default App;