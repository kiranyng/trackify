import { configureStore } from '@reduxjs/toolkit'
import throttle from 'lodash.throttle';

import { initialState, projectStateReducer } from './Project/ProjectReducer'

const persistedState = localStorage.getItem('ProjectData') 
                       ? JSON.parse(localStorage.getItem('ProjectData'))
                       : initialState

const store = configureStore({ reducer: projectStateReducer , preloadedState: persistedState });

store.subscribe( throttle( () => {
    localStorage.setItem('ProjectData', JSON.stringify(store.getState()));
}, 1000) );

console.log(store.getState())

export default store;