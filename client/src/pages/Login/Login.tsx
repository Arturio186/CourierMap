import React from 'react';

import AuthCollage from '../../components/AuthCollage/AuthCollage';
import LoginForm from '../../components/LoginForm/LoginForm';

import './Login.scss';

const Login : React.FC = () => {
    document.title = "Авторизация";
    return (
        <div className="page">
            <LoginForm/>
            <AuthCollage/>
        </div>
    )
}

export default Login;
