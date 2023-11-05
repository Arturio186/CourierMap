import React from 'react';

import classes from './AuthButton.module.scss';

interface IAuthButtonProps {
    children: React.ReactNode;
}
const AuthButton : React.FC<IAuthButtonProps> = ({children}) => {
    return (
        <button className={classes.authButton}>{children}</button>
    )
}

export default AuthButton;
