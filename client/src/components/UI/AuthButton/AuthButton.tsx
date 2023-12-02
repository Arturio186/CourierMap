import React from 'react';

import classes from './AuthButton.module.scss';
import IAuthButtonProps from 'interfaces/props/IAuthButtonProps';

const AuthButton : React.FC<IAuthButtonProps> = ({children}) => {
    return (
        <button className={classes.authButton}>{children}</button>
    )
}

export default AuthButton;
