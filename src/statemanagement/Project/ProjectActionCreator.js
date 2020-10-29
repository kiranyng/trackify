import * as Action from './ProjectActionTypes';

const initProject = (name) => {
    return {
        type: Action.INIT,
        payload: {
            name
        }
    }
}

const loadProject = (data) => {
    return {
        type: Action.LOAD,
        payload: data
    }
}

const newFolder = (name, parentFolderId) => {
    return {
        type: Action.CREATE_FOLDER,
        payload: {
            name,
            folder: parentFolderId
        }
    }
}

const editFolder = (id, data) => {
    return {
        type: Action.EDIT_FOLDER,
        payload: {
            id,
            data
        }
    }
}


const deleteFolder = (id) => {
    return {
        type: Action.DELETE_FOLDER,
        payload: {
            id
        }
    }
}

const newNote = (folder, data) => {
    return {
        type: Action.CREATE_NOTE,
        payload: {
            folder,
            ...data
        }
    }
}

const editNote = (folder, data) => {
    return {
        type: Action.EDIT_NOTE,
        payload: {
            folder,
            ...data
        }
    }
}


const deleteNote = (folder, id) => {
    return {
        type: Action.DELETE_NOTE,
        payload: {
            folder,
            id
        }
    }
}

const newTask = (folder, data) => {
    return {
        type: Action.CREATE_TASK,
        payload: {
            folder,
            ...data
        }
    }
}

const editTask = (folder, data) => {
    return {
        type: Action.EDIT_TASK,
        payload: {
            folder,
            ...data
        }
    }
}


const deleteTask = (folder, id) => {
    return {
        type: Action.DELETE_TASK,
        payload: {
            folder,
            id
        }
    }
}

const resolveTask = (folder, id) => {
    return {
        type: Action.RESOLVE_TASK,
        payload: {
            folder,
            id
        }
    }
}

const rejectTask = (folder, id) => {
    return {
        type: Action.REJECT_TASK,
        payload: {
            folder,
            id
        }
    }
}

const reopenTask = (folder, id) => {
    return {
        type: Action.REOPEN_TASK,
        payload: {
            folder,
            id
        }
    }
}

const timerTrackTask = (folder, id) => {
    return {
        type: Action.TIMER_TRACK_TASK,
        payload: {
            folder,
            id
        }
    }
}

const timerStartNextTask = (startTimeStamp) => {
    return {
        type: Action.TIMER_STARTNEXT_TASK,
        payload: {
            startTimeStamp
        }
    }
}

const timerStopTask = (folder, id) => {
    return {
        type: Action.TIMER_STOP_TASK,
        payload: {
            folder,
            id
        }
    }
}

const timerClearTask = (folder, id) => {
    return {
        type: Action.TIMER_CLEAR_TASK,
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
    deleteTask,
    resolveTask,
    rejectTask,
    reopenTask,

    timerTrackTask,
    timerStartNextTask,
    timerStopTask,
    timerClearTask
}