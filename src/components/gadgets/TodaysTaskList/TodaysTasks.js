import React from 'react';
import { connect } from 'react-redux';

import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import PageContent from '../page-content/PageContent';

const mapStateToProps = ( state, props ) => {
    let gridData = [];
//*
    gridData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]
//*/    

    return {
        gridData
    }
}

const mapDispatchToProps = ( dispatch, props ) => {
    return {

    }
}

const TodaysTasks = ( props ) => {
    const [rowData, setRowData] = React.useState( props.gridData );
  
    return (
      <PageContent title="Dashboard">
          <div className="ag-theme-alpine">
              <AgGridReact  domLayout='autoHeight'
                  rowData={rowData}>
                  <AgGridColumn field="make" filter={true}></AgGridColumn>
                  <AgGridColumn field="model" filter={true}></AgGridColumn>
                  <AgGridColumn field="price" sortable={true}></AgGridColumn>
              </AgGridReact>
          </div>
      </PageContent>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )( TodaysTasks );