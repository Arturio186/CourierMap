import React from 'react';

import classes from './Button.module.scss';

import IButtonProps from 'interfaces/props/IButtonProps';

const Button : React.FC<IButtonProps> = ({children, onClick, style}) => {
    return (
        <button style={style} onClick={onClick} className={classes.button}>{children}</button>
    )
}

export default Button;
