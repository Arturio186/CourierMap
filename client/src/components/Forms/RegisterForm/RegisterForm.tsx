import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm, SubmitHandler} from 'react-hook-form';
import { observer } from 'mobx-react-lite';

import classes from './RegisterForm.module.scss';

import IRegisterField from 'interfaces/IRegisterField';

import { LOGIN_ROUTE } from 'utils/consts';
import { Registration } from 'http/CreditionalsAPI';
import { Context } from '../../..';

import AuthInput from '../../UI/AuthInput/AuthInput';
import AuthButton from '../../UI/AuthButton/AuthButton';

const RegisterForm : React.FC = observer(() => {
    const {register, handleSubmit, formState: { errors }} = useForm<IRegisterField>({mode: "onChange"})

    const {user} = useContext(Context);

    const onSubmit: SubmitHandler<IRegisterField> = async (data) => {
        const response = await Registration(data.name, data.surname, data.email, data.password);
        
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
                    htmlFor="name" 
                    className={`${errors.name ? `${classes.errorLabel}` : ''}`}>
                        Имя
                </label>
                <AuthInput
                    id="name"  
                    placeholder="Имя"
                    type="text"
                    register={register('name', {
                        required: 'Введите имя'
                    })}
                    error={errors.name}
                />
            </div>
            <div className={classes.inputContainer}>
                <label 
                    htmlFor="surname" 
                    className={`${errors.surname ? `${classes.errorLabel}` : ''}`}>
                        Фамилия
                </label>
                <AuthInput
                    id="surname"  
                    placeholder="Фамилия"
                    type="text"
                    register={register('surname', {
                        required: 'Введите фамилию'
                    })}
                    error={errors.surname}
                />
            </div>
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