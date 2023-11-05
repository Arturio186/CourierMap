import React, {FC} from 'react';
import {UseFormRegisterReturn, FieldError} from 'react-hook-form';

import classes from './AuthInput.module.scss';

interface IAuthInputProps {
    id: string;
    type: string;
    register: UseFormRegisterReturn<any>;
    error: FieldError | undefined;
    placeholder: string;
}

const AuthInput : FC<IAuthInputProps> = ({placeholder, type, register, error}) => {
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
