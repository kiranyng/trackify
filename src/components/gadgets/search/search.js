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
        const noteText = (typeof note.text === 'string') ? note.text.toLowerCase() : '';

        return noteText.includes(searchTerm);
    }).forEach((note) => {
        notes[note.id] = 1;
    });

    // iterate values of state.content[folder]['tasks'] for all containing notes
    // - we need to filter based on the properties 'title', 'description' and 'tasknotes' match
    const tasks = {};
    Object.values(state.content[folder]['tasks']).filter(task => {
        const taskTitle = typeof task.title === 'string' ? task.title.toLowerCase() : '';
        const taskDesc = typeof task.description === 'string' ? task.description.toLowerCase() : '';
        const taskNotes = typeof task.tasknotes === 'string' ? task.tasknotes.toLowerCase() : '';

        return (taskTitle.includes(searchTerm) || taskDesc.includes(searchTerm) || taskNotes.includes(searchTerm));
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
        debugger;
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
            <input type="text" defaultValue={props.term} placeholder="Find in this folder" onChange={ changeHandler }/>
            <input type="submit" value="Find"/>
            <input type="reset" value="Clear"/>
        </form>
    </div>
}

export default connect( mapStateToProps, mapDispatchToProps )(Search);