import { INIT, LOAD, CREATE_FOLDER, EDIT_FOLDER, DELETE_FOLDER, CREATE_NOTE, EDIT_NOTE, DELETE_NOTE, CREATE_TASK, EDIT_TASK, DELETE_TASK } from './ProjectActionTypes';

const initProject = (name) => {
    return {
        type: INIT,
        payload: {
            name
        }
    }
}

const loadProject = (data) => {
    return {
        type: LOAD,
        payload: data
    }
}

const newFolder = (name, parentFolderId) => {
    return {
        type: CREATE_FOLDER,
        payload: {
            name,
            folder: parentFolderId
        }
    }
}

const editFolder = (id, data) => {
    return {
        type: EDIT_FOLDER,
        payload: {
            id,
            data
        }
    }
}


const deleteFolder = (id) => {
    return {
        type: DELETE_FOLDER,
        payload: {
            id
        }
    }
}

const newNote = (folder, data) => {
    return {
        type: CREATE_NOTE,
        payload: {
            folder,
            ...data
        }
    }
}

const editNote = (folder, data) => {
    return {
        type: EDIT_NOTE,
        payload: {
            folder,
            ...data
        }
    }
}


const deleteNote = (folder, id) => {
    return {
        type: DELETE_NOTE,
        payload: {
            folder,
            id
        }
    }
}

const newTask = (folder, data) => {
    return {
        type: CREATE_TASK,
        payload: {
            folder,
            ...data
        }
    }
}

const editTask = (folder, data) => {
    return {
        type: EDIT_TASK,
        payload: {
            folder,
            ...data
        }
    }
}


const deleteTask = (folder, id) => {
    return {
        type: DELETE_TASK,
        payload: {
            folder,
            id
        }
    }
}

export {
    initProject,
    loadProject,
    newFolder,
    editFolder,
    deleteFolder,
    newNote,
    editNote,
    deleteNote,
    newTask,
    editTask,
    deleteTask
}