import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import PageContent from '../../layouts/page-content/PageContent'
import TodaysTasks from '../TodaysTaskList/TodaysTasks';

function Dashboard() {
    return (
        <PageContent title="Dashboard">
            <TodaysTasks/>
        </PageContent>
    );
}

export default Dashboard;
