import React from 'react';
import { Link } from 'react-router-dom';
import StructureMenu from './StructureMenu';

import "./StructureMenu.css";

function StructureMenuItem(props, state) {
    const hasNested = props.item && props.item.children && props.item.children.length > 0;

    if(hasNested) {
        return (
            <li>
                <span className="menu-caret menu-caret-down"> <Link to={ `/explore/${ props.item.id }` }>{props.item.name} </Link></span>
                { hasNested && <StructureMenu items={props.item.children} isNested={true} />}
            </li>
        );
    }

    return (
        <li>
            <Link to={ `/explore/${ props.item.id }` }>{props.item.name} </Link>
        </li>
    );
}

export default StructureMenuItem;