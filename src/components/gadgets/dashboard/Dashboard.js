import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import TodaysTasks from '../TodaysTaskList/TodaysTasks';

function Dashboard() {
    return (
        <TodaysTasks/>
    );
}

export default Dashboard;
