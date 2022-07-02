import React, { forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";

import "./ModalDialog.css";

// TODO do this in a better way
const dimRoot = () => { 
    document.getElementById('root').classList.add('dimmed'); 
    document.getElementById('modal-root').classList.add('showed'); 
};
const resetRoot = () => { 
    document.getElementById('root').classList.remove('dimmed'); 
    document.getElementById('modal-root').classList.remove('showed'); 
}

const ModalDialog = forwardRef((props, ref) => {
    const [display, setDisplay] = React.useState(false);

    const open = () => {
        dimRoot();

        setDisplay(true);
    }

    const close = (ev) => {
        resetRoot();

        setDisplay(false);
    }

    useImperativeHandle(ref, () => {
        return {
            openModal: () => open(),
            closeModal: () => close()
        };
    });

    if (display) {
        // TODO handle multiple JSX props to use as slots
        return ReactDOM.createPortal(
            <div className="Modal-dialog" role="dialog">
                <div onClick={ref.current.closeModal} className="Modal-overlay"></div>
                <div className="Modal-box">
                    {props.title ? (<div className="Modal-title"> {props.title} </div>) : ''}

                    <div className="Modal-content">
                        {props.children}
                    </div>
                </div>
            </div>
            , document.getElementById('modal-root'));
    }

    return null
});

export default ModalDialog;