import React from "react";
import Icon from "../icon/Icon";

import "./ActionIcon.css";

const ActionIcon = (props) => {
    return (
        <button className="Action-icon" aria-label={ props.arialabel ? props.arialabel : props.type } onClick={props.onClick}>
            <Icon type={props.type} text={props.text}/>
        </button>
    );
}

export default ActionIcon;