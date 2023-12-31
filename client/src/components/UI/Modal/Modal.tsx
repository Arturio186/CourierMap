import React from "react";

import classes from './Modal.module.scss';

import IModalProps from "interfaces/props/IModalProps";

const Modal : React.FC<IModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [classes.modal];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ') } onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={(event) => event.stopPropagation()}>
                <button className={classes.close} onClick={() => setVisible(false)}>X</button>
                {children}
            </div>
        </div>
    )
}

export default Modal;
