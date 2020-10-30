/**
 * Store Structure of Project object
 *//*
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
    },
    calender: {
        'unscheduled': {
            'task-id': 'task-id',
            'task-id-2': 'task-id-2'
        }
        unplanned: {
            '12-10-2020': {
                'task-0-2-1': {
                    'task-id': 'task-0-2-1,
                    start: 'any',
                    end: 'any'
                }
            }
        },
        planned: {
            '12-9-2020': { // note: each task must contain atleast the date of the schudule
                'tsk-0-1-2': {
                    task_id: 'tsk-0-1-1',
                    from: '10:30',
                    to: '13:30'
                }
            }
        },
        'finished': { // we can delete this object entirely, we dont need to keep track of what time we finished the task
            '11-9-2020': {
                'tsk-0-1-1: {
                    task_id: 'tsk-0-1-1',
                    from: '11:30',
                    to: '14:15'
                }
            }
        }
    },
    task_timers: {
        active: {
            task_id: 'tsk-0-22-1',
            folder: 'fldr-33-2',
            title: 'fefsdf',
            estimate: 55,
            startTimeStamp: 33453422
        },
        queue: [
            {
                task_id: 'tsk-0-11-1', 
                folder: 'fldr-33-4',
                title: 'asdfad',
                estimate: 30
            }
        ]
    }
}
*/

// import { CREATE_FOLDER, DELETE_FOLDER, EDIT_FOLDER, INIT, LOAD, CREATE_NOTE, EDIT_NOTE, DELETE_NOTE, CREATE_TASK, EDIT_TASK, DELETE_TASK } from "./ProjectActionTypes";
import * as Actions from "./ProjectActionTypes";

const initialState = { 
    name: 'Default project', 
    id: 'default',
    content: {
        '$': {
            id: '$',
            folder: '$',
            name: 'root',
            fldr: {},
            tasks: {},
            notes: {}
        }
    },
    task_timers: {
        active: null,
        queue: []
    }
};

function projectStateReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  switch (action.type) {
    case Actions.INIT: {
        const id = 'prjt-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        return {
            ...state,
            id,
            name: action.payload.name
        }
    } case Actions.LOAD: 
        return action.payload
    case Actions.CREATE_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'fldr-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;
        action.payload.fldr = {};
        action.payload.notes = {};
        action.payload.tasks = {};

        // add record to the content object
        newState.content[newId] = action.payload;
        // update parent folder
        newState.content[action.payload.folder].fldr[newId] = 1;

        return newState
    } case Actions.EDIT_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.id].name = action.payload.data.name;

        return newState
    } case Actions.DELETE_FOLDER: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = newState.content[action.payload.id].folder;
        
        // delete actual record from the content
        delete newState.content[action.payload.id];
        // delete parent reference
        delete newState.content[parentFolderId].fldr[action.payload.id];

        return newState
    } case Actions.CREATE_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'note-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // update parent folder :: assuming that folder(id) also comes as part of the payload
        newState.content[action.payload.folder].notes[newId] = action.payload;

        return newState
    } case Actions.EDIT_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.folder].notes[action.payload.id] = {
            ...newState.content[action.payload.folder].notes[action.payload.id],
            ...action.payload
        };

        return newState
    } case Actions.DELETE_NOTE: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        // delete parent reference
        delete newState.content[parentFolderId].notes[action.payload.id];

        return newState
    } case Actions.CREATE_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const newId = 'task-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // update parent folder :: assuming that folder(id) also comes as part of the payload
        newState.content[action.payload.folder].tasks[newId] = action.payload;

        return newState
    } case Actions.EDIT_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        // update actual record from the content
        newState.content[action.payload.folder].tasks[action.payload.id] = {
            ...newState.content[action.payload.folder].tasks[action.payload.id],
            ...action.payload
        };

        return newState
    } case Actions.RESOLVE_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        newState.content[parentFolderId].tasks[action.payload.id].status = 'resolved';

        return newState
    } case Actions.REJECT_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        newState.content[parentFolderId].tasks[action.payload.id].status = 'rejected';

        return newState
    } case Actions.REOPEN_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        newState.content[parentFolderId].tasks[action.payload.id].status = 'reopen';

        return newState
    } case Actions.DELETE_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        // delete parent reference
        delete newState.content[parentFolderId].tasks[action.payload.id];

        return newState
    } case Actions.TIMER_TRACK_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        
        const id = newState.content[parentFolderId].tasks[action.payload.id].id;
        const title = newState.content[parentFolderId].tasks[action.payload.id].title;
        const estimate = newState.content[parentFolderId].tasks[action.payload.id].estimate;

        let skipEnqueue = false;

        if ( newState.task_timers.queue.length >= 4 ) {
            skipEnqueue = true;
        } else if ( newState.task_timers.active && newState.task_timers.active.id === id ) {
            skipEnqueue = true;
        } else {
            // TODO scope to optimize using map n array instead of iterating the array
            skipEnqueue = !! newState.task_timers.queue.find((item) => {
                return item.id === id;
            });
        }

        if( skipEnqueue ) {
            return state;
        }

        newState.task_timers.queue.push( {
            id,
            folder: parentFolderId,
            title,
            estimate
        } );

        return newState
    } case Actions.TIMER_STARTNEXT_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        newState.task_timers.active = newState.task_timers.queue.shift();
        newState.task_timers.active.startTimeStamp = action.payload.startTimeStamp;

        return newState
    } case Actions.TIMER_STOP_TASK: {
        const newState = JSON.parse( JSON.stringify( state ) );

        const parentFolderId = action.payload.folder;
        const id = newState.content[parentFolderId].tasks[action.payload.id].id;

        if( newState.task_timers.active.id === id ){
            newState.task_timers.active = null; // newState.task_timers.queue.shift();
        } else {
            newState.task_timers.queue = newState.task_timers.queue.filter((item) => {
                return item.id !== id;
            });
        }

        return newState
    } default: 
        return state
  }
}

export {
    initialState,
    projectStateReducer
}