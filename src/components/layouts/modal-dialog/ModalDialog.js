import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

import "./ModalDialog.css";

const ModalDialog = forwardRef( (props, ref) => {
    const [display, setDisplay] = React.useState(false);

    const open = () => {
        setDisplay(true);
    }

    const close = (ev) => {
        setDisplay(false);
    }

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        };
    });

    if(display){
        // TODO handle multiple JSX props to use as slots
        return ReactDOM.createPortal (
            <div className="Modal-dialog" role="dialog">
                <div onClick={ ref.current.closeModal } className="Modal-overlay"></div>
                <div className="Modal-box">
                    { props.title ? (<div className="Modal-title"> {props.title} </div>) : '' }

                    <div className="Modal-content">
                        {props.children}
                    </div>
                </div>
            </div>
        , document.getElementById('modal-root'));
    }
 
    return null
} );

export default ModalDialog;