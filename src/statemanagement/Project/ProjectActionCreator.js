const initProject = (name) => {
    return {
        type: 'project/init',
        payload: {
            name
        }
    }
}

const loadProject = (data) => {
    return {
        type: 'project/load',
        payload: data
    }
}

const newFolder = (name, parentFolderId) => {
    return {
        type: 'project/create-folder',
        payload: {
            name,
            folder: parentFolderId
        }
    }
}

const editFolder = (id, data) => {
    data[id] = id; // just for confirmation

    return {
        type: 'project/edit-folder',
        payload: {
            id,
            data
        }
    }
}


const deleteFolder = (id) => {
    return {
        type: 'project/delete-folder',
        payload: {
            id
        }
    }
}

export {
    initProject,
    loadProject,
    newFolder,
    editFolder,
    deleteFolder
}