import React from 'react';
import {UseFormRegisterReturn, FieldError} from 'react-hook-form';

import classes from './Input.module.scss';

interface IFormInputProps {
    id: string;
    type: string;
    register: UseFormRegisterReturn<any>;
    error: FieldError | undefined;
    placeholder: string;
}

const Input : React.FC<IFormInputProps> = ({placeholder, type, register, error}) => {
    return (
        <>
            <input
                {...register}
                type={type}
                className={`${error ? `${classes.errorField}` : ''} ${classes.Input}`}
                placeholder={placeholder}
            />
            {error && <p className={classes.error}>{error.message}</p>}
        </>
    )
}

export default Input;
