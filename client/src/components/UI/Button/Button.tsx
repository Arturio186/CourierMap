import React from 'react';

import classes from './Button.module.scss';

interface IButtonProps {
    children: React.ReactNode;
    onClick?: (event : React.MouseEvent<HTMLElement>) => void;
}

const Button : React.FC<IButtonProps> = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={classes.button}>{children}</button>
    )
}

export default Button;
