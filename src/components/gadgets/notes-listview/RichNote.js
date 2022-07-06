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
        editable: this.props.mode !== "preview"
      };
    }
    handleChange = evt => {
      const div = document.createElement('div');
      div.innerHTML =  sanitizeHtml( evt.target.value );

      const title = div.textContent.substring(0, 30);

      this.props.editNote( this.props.folder, {
        ...this.props.item,
        title,
        text: evt.target.value
      } );

      this.setState({ html: evt.target.value });
    };
  
    sanitizeConf = {
      allowedTags: ["b", "i", "em", "strong", "a", "p", "h1", "h3", "h5"],
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
        <div className={ `Note-view ${ this.props.mode !== "preview" ? '' : 'Note-view-preview-mode' }` }>
          <div className="Note-view-controls">
            <div className="Note-view-controls-commands">
              <EditButton cmd="formatBlock" arg="h1" name="H1" />
              <EditButton cmd="formatBlock" arg="h2" name="H2" />
              <EditButton cmd="formatBlock" arg="h3" name="H3" />
              <EditButton cmd="formatBlock" arg="h4" name="H4" />
              <EditButton cmd="formatBlock" arg="h5" name="H5" />
              <EditButton cmd="formatBlock" arg="h6" name="H6" />
              <button className="empty-slot" onMouseDown={ (ev) => { ev.preventDefault() } }></button>

              <EditButton cmd="fontsize" arg="10px" name="10" />
              <EditButton cmd="fontsize" arg="12px" name="12" />
              <EditButton cmd="fontsize" arg="14px" name="14" />
              <EditButton cmd="fontsize" arg="16px" name="16" />
              <EditButton cmd="fontsize" arg="18px" name="18" />

              <ColorButton cmd="BackColor" color="white"/>
              <ColorButton cmd="BackColor" color="black"/>
              <ColorButton className="transparent-bg" cmd="BackColor" color="initial"/>
              <ColorButton cmd="BackColor" color="yellow"/>
              <ColorButton cmd="BackColor" color="lawngreen"/>
              <ColorButton cmd="BackColor" color="cyan"/>
              <ColorButton cmd="BackColor" color="pink"/>
              <ColorButton cmd="BackColor" color="blue"/>
              <ColorButton cmd="BackColor" color="red"/>
              <ColorButton cmd="BackColor" color="darkblue"/>
              <ColorButton cmd="BackColor" color="teal"/>
              <ColorButton cmd="BackColor" color="green"/>
              <ColorButton cmd="BackColor" color="violet"/>
              <ColorButton cmd="BackColor" color="darkred"/>
              <ColorButton cmd="BackColor" color="lightgray"/>
              <ColorButton cmd="BackColor" color="darkgray"/>
            </div>
            <div className="Note-view-controls-colors">
              <EditButton cmd="bold" name="B" />
              <EditButton cmd="italic" name="i" />
                <EditButton
                  cmd="createLink"
                  arg="https://github.com/lovasoa/react-contenteditable"
                  name="L"
                />
                <EditButton cmd="insertOrderedList" name="OL" />
                <EditButton cmd="insertUnorderedList" name="UL" />
                <EditButton cmd="indent" name=">" />
                <EditButton cmd="outdent" name="<" />
                
                <EditButton cmd="fontsize" arg="20px" name="20" />
                <EditButton cmd="fontsize" arg="22px" name="22" />
                <EditButton cmd="fontsize" arg="24px" name="24" />
                <EditButton cmd="fontsize" arg="26px" name="26" />
                <EditButton cmd="fontsize" arg="28px" name="28" />

                <ColorButton cmd="ForeColor" color="white"/>
                <ColorButton cmd="ForeColor" color="black"/>
                <ColorButton className="transparent-bg" cmd="ForeColor" color="initial"/>
                <ColorButton cmd="ForeColor" color="darkred"/>
                <ColorButton cmd="ForeColor" color="orange"/>
                <ColorButton cmd="ForeColor" color="yellow"/>
                <ColorButton cmd="ForeColor" color="lightgreen"/>
                <ColorButton cmd="ForeColor" color="green"/>
                <ColorButton cmd="ForeColor" color="lightblue"/>
                <ColorButton cmd="ForeColor" color="blue"/>
                <ColorButton cmd="ForeColor" color="darkblue"/>
                <ColorButton cmd="ForeColor" color="purple"/>
                <ColorButton cmd="ForeColor" color="orange"/>
                <ColorButton cmd="ForeColor" color="lightgray"/>
                <ColorButton cmd="ForeColor" color="gray"/>
                <ColorButton cmd="ForeColor" color="darkgray"/>
            </div>
          </div>
          <ContentEditable
            className="editable"
            tagName="pre"
            html={this.state.html} // innerHTML of the editable div
            disabled={!this.state.editable} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
          />
        </div>
      );
    };
  }
  
  function EditButton(props) {
    const handler = (evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        
        if(props.cmd === 'createLink'){
          const linkURL = prompt("Enter URL", "https://");
          
          var sText = document.getSelection();
          document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
        } else if(props.cmd === 'fontsize'){
          document.execCommand("styleWithCSS", 0, true);
          document.execCommand('fontSize', 0, props.arg);
          setTimeout(() => {
            document.querySelectorAll('pre[contenteditable=true] [style*="font-size: xxx-large"]')
              .forEach((el) => {
                el.style.fontSize = props.arg;
              });
            }, 0);
        } else {
          document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
        }

    }

    return (
      <button className='command-button'
        key={props.cmd}
        onMouseDown={ handler }
      >
        {props.name || props.cmd}
      </button>
    );
  }
  
  function ColorButton(props) {
    const style = { backgroundColor: (props.color === 'initial' ? 'transparent' : props.color) };
    const className = 'color-button'+(props.color === 'initial' ? ' transparent-bg' : '')

    return (
      <button className={ className } style={ style }
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area

          document.execCommand("styleWithCSS", 0, true);
          document.execCommand(props.cmd, false, props.color); // Send the command to the browser
        }}
      >
        &nbsp;
      </button>
    );
  }

  export default connect( mapStateToProps, mapDispatchToProps )( RichNote );