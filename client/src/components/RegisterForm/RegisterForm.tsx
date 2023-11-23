import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler} from 'react-hook-form';

import { observer } from 'mobx-react-lite';

import { LOGIN_ROUTE } from '../../utils/consts';

import AuthInput from '../UI/AuthInput/AuthInput';
import AuthButton from '../UI/AuthButton/AuthButton';

import { registration } from '../../http/CreditionalsAPI';
import { Context } from '../..';

import classes from './RegisterForm.module.scss';

interface IRegisterField {
    email: string
    password: string
}

const RegisterForm : React.FC = observer(() => {
    const {register, handleSubmit, formState: { errors }} = useForm<IRegisterField>({mode: "onChange"})

    const {user} = useContext(Context);

    const onSubmit: SubmitHandler<IRegisterField> = async (data) => {
        const response = await registration(data.email, data.password);
        
        if (response.status == 200) {
            user.setUser(response.message);
            user.setIsAuth(true);
        }
        else {
            alert(response.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className={classes.title}>Регистрация</h1>
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
                        required: 'Введите пароль',
                        minLength: {
                            value: 6,
                            message: 'Минимум 6 символов!'
                        }
                    })}
                    error={errors.password}
                />
            </div>
            <AuthButton>Заргеистрироваться</AuthButton>
            <NavLink to={LOGIN_ROUTE} className={classes.link}>Авторизироваться</NavLink>
        </form>
    )
})

export default RegisterForm;