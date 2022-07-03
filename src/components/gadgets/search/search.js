import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useStore } from 'react-redux';
import { setSearchData } from '../../../statemanagement/Project/ProjectActionCreator';

import './search.css';

const search = (folder, state, term) => {
    const searchTerm = term.toLowerCase();

    // TODO iterate keys of state.content[folder]['fldr'] for child folder ids
    // - we need to filter folder 'name' match

    // iterate values of state.content[folder]['notes'] for all containing notes
    // - we need to filter based on the property 'text' match
    const notes = {};
    Object.values(state.content[folder]['notes']).filter(note => {
        const noteText = (note.text instanceof String) ? note.text.toLowerCase() : '';

        return noteText.includes(searchTerm);
    }).forEach((note) => {
        notes[note.id] = 1;
    });

    // iterate values of state.content[folder]['tasks'] for all containing notes
    // - we need to filter based on the properties 'title', 'description' and 'tasknotes' match
    const tasks = {};
    Object.values(state.content[folder]['tasks']).filter(task => {
        const taskTitle = task.title instanceof String ? task.title.toLowerCase() : '';
        const taskDesc = task.description instanceof String ? task.description.toLowerCase() : '';
        const taskNotes = task.tasknotes instanceof String ? task.tasknotes.toLowerCase() : '';

        return (taskTitle.indexOf(searchTerm) > -1 || taskDesc.indexOf(searchTerm) > -1 || taskNotes.indexOf(searchTerm) > -1);
    }).forEach((task) => {
        tasks[task.id] = 1;
    });

    const result = { 
        term: searchTerm,
        folder, 
        results: {
            notes,
            tasks
        } 
    }
    
    return result;
    // GOOD TO HAVE - Drilldown search, by searching freshly on top of prev search results :D
}

const mapStateToProps = (state, ownProps) => {
    return {
        term: ((state.search && state.search.term) ? (state.search.term) : '')
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
        // dispatching plain actions
        setSearchData: ( payload ) => dispatch( setSearchData( payload ) )
    }
}

const Search = ( props ) => {
    const folder = props.folder;
    let newValue = props.term;
    let cssClassName = 'search'+((props.term !== '') ? ' active': '');

    const store = useStore();

    useEffect(() => {
        return () => {
            // clean up
        }
    }, []);

    const changeHandler = (ev) => {
        // setTerm(ev.target.value);
        newValue = ev.target.value;
    }

    const submitHandler = (ev) => {
        ev.preventDefault();
        
        const result = search(folder, store.getState(), newValue);
        props.setSearchData(result);
    }

    const resetHandler = () => {
        props.setSearchData({
            term: ''
        });
    }

    return <div className={cssClassName}>
        <form onSubmit={ submitHandler } onReset={ resetHandler }>
            <input type="text" defaultValue={props.term} placeholder="Filter this folder" onChange={ changeHandler }/>
            <input type="submit" value="Filter"/>
            <input type="reset" value="reset"/>
        </form>
    </div>
}

export default connect( mapStateToProps, mapDispatchToProps )(Search);