import React from 'react';
import { connect } from 'react-redux';

import ContentEditable from 'react-contenteditable';
import sanitizeHtml from "sanitize-html";

import { editNote, newNote } from '../../../statemanagement/Project/ProjectActionCreator';

const mapStateToProps = (state, props) => {
    if( props.item_id ){
        const item = state.content[props.folder].notes[props.item_id];

        return {
            item
        }
    } 
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNote: ( folder, data ) => dispatch( newNote( folder, data ) ),
        editNote: ( folder, data ) => dispatch( editNote( folder, data ) )
    }
}

class RichNote extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        html: this.props.item.text,
        editable: true
      };
    }
    handleChange = evt => {
      const div = document.createElement('div');
      div.innerHTML =  sanitizeHtml( this.props.item.text );

      const title = div.textContent.substring(0, 30);

      this.props.editNote( this.props.folder, {
        ...this.props.item,
        title,
        text: evt.target.value
      } );

      this.setState({ html: evt.target.value });
    };
  
    sanitizeConf = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1"],
      allowedAttributes: { a: ["href"] }
    };
  
    sanitize = () => {
      this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
    };
  
    toggleEditable = () => {
      this.setState({ editable: !this.state.editable });
    };
  
    render = () => {
      return (
        <div className="Note-view">
          <ContentEditable
            className="editable"
            tagName="pre"
            html={this.state.html} // innerHTML of the editable div
            disabled={!this.state.editable} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
          />
          <div>
            <EditButton cmd="italic" />
            <EditButton cmd="bold" />
            <EditButton cmd="formatBlock" arg="h1" name="heading" />
            <EditButton
              cmd="createLink"
              arg="https://github.com/lovasoa/react-contenteditable"
              name="hyperlink"
            />
          </div>
        </div>
      );
    };
  }
  
  function EditButton(props) {
    return (
      <button
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }}
      >
        {props.name || props.cmd}
      </button>
    );
  }

  export default connect( mapStateToProps, mapDispatchToProps )( RichNote );