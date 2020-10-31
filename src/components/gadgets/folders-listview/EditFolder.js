import React from "react";
import { connect } from "react-redux";

import { editFolder as editFolderAction, newFolder as createFolderAction } from "../../../statemanagement/Project/ProjectActionCreator"

import SimpleList from "../../layouts/simple-listview/SimpleList";

import "./EditFolder.css";

const mapStateToProps = (state, props) => {
    let item = {};
    let folder = '';

    if( props.mode === 'create' || !props.item_id){
        if( !props.folder || !state.content[props.folder] ){
            throw Error(`folder attribute must be a valid one for 'create' mode`);
        }

        folder = props.folder
    } else {
        if( !state.content[props.item_id] ) {
            throw Error(`Folder with id ${props.item_id} not found!`);
        }

        item = state.content[props.item_id];
        folder = item.folder
    }

    return {
        ...props,
        item,
        folder
    }
}

const mapDispatchToProps = ( dispatch ) => {
    return {
      // dispatching plain actions
      updateFolder: ( payload ) => dispatch( editFolderAction( payload.id, payload ) ),
      createFolder: ( name, folder ) => dispatch( createFolderAction( name, folder ) )
    }
  }

function EditFolder(props) {
    const submitHandler = (ev) => {
        ev.preventDefault();

        const formData = new FormData(ev.target);
        let payload = {};

        for (var [key, value] of formData.entries()) { 
            payload[key] = value;
        }
        
        console.log("Form data:", ...formData);

        if( props.mode === 'create' ) {
            props.createFolder( payload.name, props.folder );
        } else {
            props.updateFolder( payload );
        }

        if(props.onFinish) {
            try {
                props.onFinish();
            } catch(e ) {
                console.error( e.message );
            }
        }
    }

    return (
        <div className="Edit-folder">
            <form onSubmit={submitHandler} aria-label="Folder details">
                <SimpleList>
                    <label htmlFor="name">Folder name</label>
                    {
                        props.item.id ? <input type="hidden" name="id" value={ props.item.id }/> : ''
                    }
                    <input type="text" name="name" defaultValue={props.item.name}/>
                </SimpleList>
                
                <div className="Modal-buttons">
                    <input type="submit" value="Save"/>
                </div>
            </form>
        </div>
    );
}

export default connect( mapStateToProps, mapDispatchToProps )(EditFolder);