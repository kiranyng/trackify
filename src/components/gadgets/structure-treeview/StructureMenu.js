import React from 'react';
import { connect } from 'react-redux';

import StructureMenuItem from './StructureMenuItem';

const mapStateToProps = ( state, props ) => {
    return props;

    // TODO WIP

    const folder_id = props.folder_id ? props.folder_id : '$';
    const folder_meta = state.conten[folder_id];

    const name = folder_meta.name;
    const hasChildren = Object.keys(folder_meta.fldr).length > 0;

    const subFolderContent = folder_meta.fldr;
    const subfolders = [];

    if(subFolderContent) {
        for (const [key, value] of Object.entries(subFolderContent)) {
            console.log(`${key}: ${value}`);

            subfolders.push(state.content[key]);
        }
    }

    return {
        id: folder_id,
        name,
        subfolders
    };
}

function StructureMenu(props, state) {
    let items = [];
    let isNestedClassName = props.isNested ? 'menu-nested' : '';

    if(Array.isArray( props.items )){
        items = props.items.map((item) => {
            return <StructureMenuItem key={item.id} item={item}/>
        });
    } else {
        return null;
    }

    return (
        <ul className={`tree-menu ${isNestedClassName}`}>
            {items}
        </ul>
    );
}

export default connect(mapStateToProps)(StructureMenu);