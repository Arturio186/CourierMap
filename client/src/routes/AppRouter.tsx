import React from 'react';

import AuthRouter from './AuthRouter';
import GuestRouter from './GuestRouter';

const AppRouter : React.FC = () => {
    const isAuth : boolean = false;

    return (
        isAuth ? <AuthRouter/> : <GuestRouter/>
    )
}

export default AppRouter;
