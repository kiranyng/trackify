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
        for (const [key] of Object.entries(subFolderContent)) {
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
    const [hideNestedMenu, doHideNestedMenu] = React.useState(true);

    const toggleNestedMenu = () => {
        doHideNestedMenu( !hideNestedMenu );
    }

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
            <nav className="Project-structure-nav" aria-label="folder structure"> 
                <span className="menu-caret"> <Link to={ `/explore` }> Home </Link> </span>
                <ul className={`tree-menu ${isNestedClassName}`}>
                    {items}
                </ul>
            </nav>
        );
    }

    return (
        <li>
            <span className={ `menu-caret ${ hideNestedMenu?'':'menu-caret-down' }` } onClick={ toggleNestedMenu }> </span> <Link to={ `/explore/${ props.id }` }>{props.name} </Link> 
            {
                !hideNestedMenu ?
                    <ul className={`tree-menu ${isNestedClassName}`}>
                        {items}
                    </ul>
                : ''
            }
        </li>
    );
}

const StructureMenu = connect(mapStateToProps)( _StructureMenu );

export default StructureMenu;