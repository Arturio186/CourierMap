import React from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { REGISTER_ROUTE } from '../../utils/consts';
import classes from './LoginForm.module.scss';

import AuthInput from '../UI/AuthInput/AuthInput';
import AuthButton from '../UI/AuthButton/AuthButton';
import { authorization } from '../../http/CreditionalsAPI';

interface ILoginField {
    email: string
    password: string
}

const LoginForm : React.FC = () => {
    const {register, handleSubmit, formState: { errors }} = useForm<ILoginField>({mode: "onChange"})

    const onSubmit: SubmitHandler<ILoginField> = async (data) => {
        const response = await authorization(data.email, data.password);
        
        console.log(response) 
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={classes.title}>Авторизация</h1>
            <div className={classes.inputContainer}>
                <label 
                    htmlFor="email" 
                    className={`${errors.email ? `${classes.errorLabel}` : ''}`}>
                        Email
                </label>
                <AuthInput
                    id="email"  
                    placeholder="email@email.ru"
                    type="text"
                    register={register('email', {
                        required: 'Введите email адрес',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Некорректный email адрес'
                        }
                    })}
                    error={errors.email}
                />
            </div>
            <div className={classes.inputContainer}>
                <label 
                    htmlFor="password" 
                    className={`${errors.password ? `${classes.errorLabel}` : ''}`}>
                        Пароль
                </label>
                <AuthInput
                    id="password"  
                    placeholder="Введите свой пароль"
                    type="password"
                    register={register('password', {
                        required: 'Введите пароль'
                    })}
                    error={errors.password}
                />
            </div>
            <AuthButton>Войти</AuthButton>
            <a href="#">Забыли пароль?</a>
            <NavLink to={REGISTER_ROUTE}>Зарегистрироваться</NavLink>
        </form>
    )
}

export default LoginForm;