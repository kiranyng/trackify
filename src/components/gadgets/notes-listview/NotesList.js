import React, { useImperativeHandle } from 'react';

import { connect } from 'react-redux';

import "./NotesList.css";
import CreateNote from './CreateNote';
import NotesListItem from './NotesListItem';
import { forwardRef } from 'react';
import { newNote } from '../../../statemanagement/Project/ProjectActionCreator';


const mapStateToProps = (state, ownProps) => {
    const notesObj = state.content[ownProps.folder] && state.content[ownProps.folder].notes;
    const list = [];

    if (notesObj) {
        const isSearchActive = (state.search && state.search.term && state.search.term.length > 0);
        for (const item of Object.entries(notesObj)) {
            if (isSearchActive) {
                if (state.search.folderMap[ownProps.folder] && state.search.folderMap[ownProps.folder].notes[item[0]]) {
                    list.push(item[1]);// item[0] is key and item[1] is val
                }
            } else {
                list.push(item[1]);// item[0] is key and item[1] is val
            }
        }
    }

    return {
        ...ownProps,
        list
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createCopyNote: ( folder, data ) => dispatch( newNote( folder, data ) )
    }
}

function NotesList(props, ref) {
    useImperativeHandle(ref, () => {
        return {
            pasteNote: (pastedNote) => {
                console.log('notesList-pastedNote:', pastedNote);

                delete pastedNote['id'];
                delete pastedNote['folder'];
                props.createCopyNote(props.folder, pastedNote);
            }
        }
    });

    return (
        <div className="Notes-list-region" role="region" aria-label="Notes list">
            <ul className="Notes-list">
                <CreateNote folder={props.folder} />

                {props.list.length === 0 ? <li>No Notes!</li> : ''}

                {props.list.map((item, index) => {
                    return <NotesListItem key={item.id} folder={props.folder} item={item} />
                })}
            </ul>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })( forwardRef(NotesList) );
