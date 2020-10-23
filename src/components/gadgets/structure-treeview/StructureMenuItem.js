import React from 'react';
import StructureMenu from './StructureMenu';

import "./StructureMenu.css";

function StructureMenuItem(props, state) {
    const hasNested = props.item && props.item.children && props.item.children.length > 0;

    if(hasNested) {
        return (
            <li>
                <span className="menu-caret menu-caret-down"> {props.item.name} </span>
                { hasNested && <StructureMenu items={props.item.children} isNested={true} />}
            </li>
        );
    }

    return (
        <li>
            {props.item.name}
        </li>
    );
}

export default StructureMenuItem;