import React from 'react';
import { Link } from 'react-router-dom';

import './side-nav.css';

const SideNav = () => {
    return (
        <ul className="main-side-nav">
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/explore'>Explorer</Link></li>
        </ul>
    );
}

export default SideNav;