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

              <ColorButton cmd="ForeColor" color="white"/>
              <ColorButton cmd="ForeColor" color="black"/>
              <ColorButton cmd="ForeColor" color="#452977"/>
              <ColorButton cmd="ForeColor" color="#2ce82c"/>
              <ColorButton cmd="ForeColor" color="#427be6"/>
              <ColorButton cmd="ForeColor" color="#d24bd2"/>
              <ColorButton cmd="ForeColor" color="#1bca58"/>
              <ColorButton cmd="ForeColor" color="orange"/>
              <ColorButton cmd="ForeColor" color="red"/>
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

                <ColorButton cmd="BackColor" color="white"/>
                <ColorButton cmd="BackColor" color="black"/>
                <ColorButton cmd="BackColor" color="rgb(189 153 255)"/>
                <ColorButton cmd="BackColor" color="#2ce82c"/>
                <ColorButton cmd="BackColor" color="#427be6"/>
                <ColorButton cmd="BackColor" color="#d24bd2"/>
                <ColorButton cmd="BackColor" color="#1bca58"/>
                <ColorButton cmd="BackColor" color="orange"/>
                <ColorButton cmd="BackColor" color="red"/>
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
    return (
      <button className='color-button' style={ { backgroundColor: props.color } }
        key={props.cmd}
        onMouseDown={evt => {
          evt.preventDefault(); // Avoids loosing focus from the editable area
          document.execCommand(props.cmd, false, props.color); // Send the command to the browser

          // document.execCommand(‘ForeColor’, false, ‘red’);
        }}
      >
        &nbsp;
      </button>
    );
  }

  export default connect( mapStateToProps, mapDispatchToProps )( RichNote );