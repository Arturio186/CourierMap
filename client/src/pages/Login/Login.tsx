import React from 'react';

import './Login.scss';

import AuthCollage from 'components/AuthCollage/AuthCollage';
import LoginForm from 'components/LoginForm/LoginForm';

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
