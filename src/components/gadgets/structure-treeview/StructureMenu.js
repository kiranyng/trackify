import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './StructureMenu.css';

import StructureMenuItem from './StructureMenuItem';

const mapStateToProps = ( state, props ) => {
    // return props;

    // TODO WIP

    const folder_id = props.folder_id ? props.folder_id : '$';
    const folder_meta = state.content[folder_id];

    const name = folder_meta.name;
    // const hasChildren = Object.keys(folder_meta.fldr).length > 0;

    const subFolderContent = folder_meta.fldr;
    const subfolders = [];

    if(subFolderContent) {
        for (const [key, value] of Object.entries(subFolderContent)) {
            console.log(`${key}: ${value}`);

            subfolders.push( state.content[key] );
        }
    }

    return {
        ...props,
        id: folder_id,
        name,
        subfolders
    };
}

function _StructureMenu( props ) {
    let items = [];
    let isNestedClassName = props.subfolders.length ? 'menu-nested' : '';

    items = props.subfolders.map((item) => {
        const subChildren = Object.keys( item.fldr );
        const hasChildren = subChildren && subChildren.length > 0;

        if( hasChildren ){
            return <StructureMenu key={ item.id } folder_id={ item.id }/>
        }

        return <StructureMenuItem key={item.id} item={item}/>
    });

    if( props.id === '$' ){
        return (
            <div className="Project-structure-menu"> 
                <span className="menu-caret"> <Link to={ `/explore` }> Home </Link> </span>
                <ul className={`tree-menu ${isNestedClassName}`}>
                    {items}
                </ul>
            </div>
        );
    }

    return (
        <li>
            <span className="menu-caret"> <Link to={ `/explore/${ props.id }` }>{props.name} </Link> </span>
            <ul className={`tree-menu ${isNestedClassName}`}>
                {items}
            </ul>
        </li>
    );
}

const StructureMenu = connect(mapStateToProps)( _StructureMenu );

export default StructureMenu;