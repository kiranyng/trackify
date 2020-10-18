import React from "react";

import "./NoteView.css";

function NoteView(props) {
    return (
        <div className="Note-view" contentEditable={true}>
            {props.item.text}
        </div>
    );
}

export default NoteView;