import React from 'react';
import logo from './logo.svg';
import './App.css';

import Portal from './components/layouts/portal-view/Portal';
import Dashboard from './components/gadgets/dashboard/Dashboard';

function App() {
  return (
    <Portal appIcon={logo} appTitle="Tracker" projectName="My Pet Project" pageTitle="Demo Page title">
      <Dashboard/>
    </Portal>
  );
}

export default App;
