import React from 'react';

import classes from './AuthInput.module.scss';

import IAuthInputProps from 'interfaces/props/IAuthInputProps';

const AuthInput : React.FC<IAuthInputProps> = ({placeholder, type, register, error}) => {
    return (
        <>
            <input
                {...register}
                type={type}
                className={`${error ? `${classes.errorField}` : ''} ${classes.authInput}`}
                placeholder={placeholder}
            />
            {error && <p className={classes.error}>{error.message}</p>}
        </>
    )
}

export default AuthInput;
