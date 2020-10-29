import React from "react";
import Icon from "../icon/Icon";

import "./ActionIcon.css";

const ActionIcon = (props) => {
    return (
        <button className="Action-icon" onClick={props.onClick}>
            <Icon type={props.type} text={props.text}/>
        </button>
    );
}

export default ActionIcon;