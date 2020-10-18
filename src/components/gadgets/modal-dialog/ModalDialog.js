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
            <div className="Modal-dialog">
                <div onClick={close} className="Modal-overlay"></div>
                <div className="Modal-box">
                    {props.children}
                    {props.showCancel ? <button onClick={close}>Cancel (as implicit)</button> : ''}
                </div>
            </div>
        , document.getElementById('modal-root'));
    }
 
    return null
} );

export default ModalDialog;