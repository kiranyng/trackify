import React from 'react';
import { useSelector } from 'react-redux';

import RecentsItem from './RecentsItem';
import './Recents.css';

const Recents = () => {
    const list = useSelector( (state) => {
        return state.recents.items;
    } );

    return (
        <ul className="recents-list">
            { 
                list.map( ( item ) => {
                    return ( <RecentsItem key={ item.id } item={ item }/> );
                } ) 
            }
        </ul>
    );
}

export default Recents;