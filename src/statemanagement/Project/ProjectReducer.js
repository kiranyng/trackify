/**
 * Store Structure of Project object
 */
/*
const projectStructure = {
    name: 'My Pet Project',
    id: 'prjt-23423423423-23432',
    content: {
        '$': {
            id: 'fldr-root',
            folder: '$',
            name: 'root',
            fldr: {
                'fldr-0-1': 1
            },
            task: {},
            // ...
        },
        'fldr-0-1': {
            id: 'flrd-0-1',
            folder: 'root',
            name: 'My First Folder',
            fldr: {
                'fldr-0-11': 1, 
                'fldr-0-12': 1
            },
            task: {
                'tsk-0-1': {
                    id: 'tsk-0-1',
                    folder: 'fldr-0-1',
                    title: 'zzz',
                    // ...
                }
            }
            // ...
        },
        'fldr-0-11': {
            // ...
        },
        'fldr-0-12': {
            // ...
        }
    }
}
*/

import { CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER, INIT, LOAD, CREATE_NOTE, EDIT_NOTE, DELETE_NOTE, CREATE_TASK, EDIT_TASK, DELETE_TASK } from "./ProjectActionTypes";

const initialState = { 
    name: 'Default project', 
    id: 'default',
    content: {
        '$': {
            id: '$',
            folder: '$',
            name: 'root',
            fldr: {
                'fldr-0-1': 1
            },
            tasks: {
                'tsk-0-1': {
                    id: 'tsk-0-1',
                    folder: '$',
                    title: 'first task',
                    // ...
                }
            },
            notes: {
                'note-0-1': {
                    id: 'note-0-1',
                    folder: '$',
                    text: '<b>Kiran 1</b>'
                },
                'note-0-2': {
                    id: 'note-0-2',
                    folder: '$',
                    text: '<b>Kiran 2</b>'
                }
            },
            // ...
        },
        'fldr-0-1': {
            id: 'fldr-0-1',
            folder: 'root',
            name: 'My First Folder',
            fldr: {
                'fldr-0-11': 1, 
                'fldr-0-12': 1
            },
            tasks: {
                'tsk-0-11': {
                    id: 'tsk-0-11',
                    folder: 'fldr-0-1',
                    title: 'zzz',
                    // ...
                }
            },
            notes: {
                'note-0-1': {
                    id: 'note-0-1',
                    folder: 'fldr-0-1',
                    text: '<b>Kiran 1</b>'
                },
                'note-0-2': {
                    id: 'note-0-2',
                    folder: 'fldr-0-1',
                    text: '<b>Kiran 2</b>'
                }
            }
            // ...
        },
        'fldr-0-11': {
            id: 'fldr-0-11',
            folder: 'fldr-0-1',
            name: 'My First-Sub Folder',
            fldr: {
            },
            tasks: {
                'tsk-0-12': {
                    id: 'tsk-0-1',
                    folder: 'fldr-0-1',
                    title: 'zzz',
                    // ...
                }
            }
            // ...
        },
        'fldr-0-12': {
            id: 'fldr-0-12',
            folder: 'Second-0-1',
            name: 'My Second-Sub Folder',
            fldr: {
            },
            tasks: {}
            // ...
        }
    }
}

function projectStateReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  switch (action.type) {
    case INIT: {
        const id = 'prjt-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        return {
            ...state,
            id,
            name: action.payload.name
        }
    } case LOAD: 
        return action.payload
    case CREATE_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'fldr-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // add record to the content object
        newState.content[newId] = action.payload;
        // update parent folder
        newState.content[action.payload.folder].fldr[newId] = 1;

        return newState
    } case EDIT_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.id] = {
            ...[newState.content[action.payload.id]],
            ...action.payload.data
        };

        return newState
    } case DELETE_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = newState[action.payload.id].folder;
        
        // delete actual record from the content
        delete newState.content[action.payload.id];
        // delete parent reference
        delete newState.content[parentFolderId].folder[action.payload.id];

        return newState
    } case CREATE_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'note-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // update parent folder :: assuming that folder(id) also comes as part of the payload
        newState.content[action.payload.folder].notes[newId] = action.payload;

        return newState
    } case EDIT_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.folder].notes[action.payload.id] = {
            ...newState.content[action.payload.folder].notes[action.payload.id],
            ...action.payload
        };

        return newState
    } case DELETE_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        // delete parent reference
        delete newState.content[parentFolderId].notes[action.payload.id];

        return newState
    } case CREATE_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'note-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // update parent folder :: assuming that folder(id) also comes as part of the payload
        newState.content[action.payload.folder].tasks[newId] = action.payload;

        return newState
    } case EDIT_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.folder].tasks[action.payload.id] = {
            ...newState.content[action.payload.folder].tasks[action.payload.id],
            ...action.payload
        };

        return newState
    } case DELETE_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        // delete parent reference
        delete newState.content[parentFolderId].tasks[action.payload.id];

        return newState
    } default: 
        return state
  }
}

export default projectStateReducer;