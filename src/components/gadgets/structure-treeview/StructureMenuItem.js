import React from 'react';
import { Link } from 'react-router-dom';

import "./StructureMenu.css";

function StructureMenuItem(props) {
    return (
        <li>
            <Link to={ `/explore/${ props.item.id }` }>{props.item.name} </Link>
        </li>
    );
}

export default StructureMenuItem;