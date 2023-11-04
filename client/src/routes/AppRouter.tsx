import React from 'react';

import GuestRouter from './GuestRouter';

const AppRouter : React.FC = () => {
    const isAuth : boolean = false;

    return (
        isAuth ?
        <div>
            Auth
        </div>
        :
        <GuestRouter/>
    )
}

export default AppRouter;
