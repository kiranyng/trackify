import React from "react";
import Icon from "../icon/Icon";

const ActionIcon = (props) => {
    return (
        <button className="Action-Icon" onClick={props.onClick}>
            <Icon type={props.type} text={props.text}/>
        </button>
    );
}

export default ActionIcon;