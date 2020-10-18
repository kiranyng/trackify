/**
 * Store Structure of Project object
 */
/*
const projectStructure = {
    name: 'My Pet Project',
    id: 'fldr-23423423423-23432',
    root: {
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

const initialState = { 
    name: '', 
    id: '',
    root: {}
}

function projectStateReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  switch (action.type) {
    case 'project/init': 
        const id = 'prjt-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        return {
            ...state,
            id,
            name: action.payload.name
        }
    case 'project/load': 
        return action.payload
    case 'project/create-folder': 
        const newId = 'fldr-' + (new Date()).getTime() + '-' + Math.floor((Math.random() * 100000)); //TODO get uniq-id from some library

        action.payload.id = newId;

        // add record to the root object
        state.root[newId] = action.payload;
        // update parent folder
        state.root[action.payload.folder][newId] = 1;

        return {
            ...state
        }
    case 'project/edit-folder': 
        // update actual record from the root
        state.root[action.payload.id] = {
            ...[state.root[action.payload.id]],
            ...action.payload.data
        };

        return {
            ...state
        }
    case 'project/delete-folder': 
        const parentFolderId = state[action.payload.id].folder;
        
        // delete actual record from the root
        delete state.root[action.payload.id];
        // delete parent reference
        delete state.root[parentFolderId].folder[action.payload.id];

        return {
            ...state
        }
    default: 
        return state
  }
}

export default projectStateReducer;