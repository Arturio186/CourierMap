import React from 'react';

import './Register.scss';

import RegisterForm from 'components/Forms/RegisterForm/RegisterForm';
import AuthCollage from 'components/AuthCollage/AuthCollage';

const Register : React.FC = () => {
    document.title = "Регистрация";
    return (
        <div className="page">
            <RegisterForm/>
            <AuthCollage/>
        </div>
    )
}

export default Register;
