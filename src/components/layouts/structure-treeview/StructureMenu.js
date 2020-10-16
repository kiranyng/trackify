import React from 'react';
import StructureMenuItem from './StructureMenuItem';

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

export default StructureMenu;