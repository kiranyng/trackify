import React from 'react';
import { useDispatch } from 'react-redux'
import { loadProject } from '../../../statemanagement/Project/ProjectActionCreator';

import ActionIcon from '../../layouts/action-icon/ActionIcon';

import './ExportData.css';

const exportStateAsFile = () => {
    const stateContent = window.localStorage.getItem('ProjectData');
    
    //Save the file contents as a DataURI
    var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(stateContent);

    var link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", "state.trcr");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

const ExportData = () => {
    let dispatch = useDispatch();

    const handleDrop = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();

        let dt = ev.dataTransfer;
        let file = dt.files[0];

        console.log(file);

        let reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function() {
            console.log( 'file content:', reader.result );

            dispatch( loadProject( JSON.parse( reader.result ) ) );
        }
    }

    const handleDragover = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    }

    return (
        <div className="export-data-block" onDragOver={ handleDragover } onDrop={ handleDrop }>
            <span>Drop a save file here to restore.</span>
            <ActionIcon type='download' onClick={ exportStateAsFile }/>
        </div>
    );
}

export default ExportData;