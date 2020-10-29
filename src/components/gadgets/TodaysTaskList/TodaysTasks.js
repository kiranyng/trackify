import React from 'react';
import { connect } from 'react-redux';

import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

import ActionGridCellRender from './ActionCellRenderer';
import TaskProgress from './TaskProgress';

const mapStateToProps = ( state, props ) => {
    const tasksObj =  state.content['$'] && state.content['$'].tasks;
    const todoList = [];

    if(tasksObj) {
        for (const [key, value] of Object.entries(tasksObj)) {
            console.log(`${key}: ${value}`);

            todoList.push(value);
        }
    }

    return {
        todoList
    }
}

const mapDispatchToProps = ( dispatch, props ) => {
    return {

    }
}

const TodaysTasks = ( props ) => {
    const [todoList, setRowData] = React.useState( props.todoList );
  
    const onRowClicked = (ev) => {
        console.log("ROW CLICKED!", ev.data);
    }

    return (
        <div className="ag-theme-alpine">
            <h3>Todays Tasks</h3>
            <AgGridReact  domLayout='autoHeight'
                rowData={todoList}
                frameworkComponents={
                    {
                        taskProgress: TaskProgress,
                        actionCellRenderer: ActionGridCellRender
                    }
                }
                onRowClicked= { onRowClicked }
                >
                <AgGridColumn field="priority" sortable={true}></AgGridColumn>
                <AgGridColumn field="title" filter={true}></AgGridColumn>
                <AgGridColumn field="estimate" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="deadline" sortable={true} filter={true}></AgGridColumn>
                <AgGridColumn field="status" filter={true}></AgGridColumn>
                <AgGridColumn field="progress" cellRenderer='taskProgress'></AgGridColumn>
                <AgGridColumn field="actions" cellRenderer='actionCellRenderer'></AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( TodaysTasks );