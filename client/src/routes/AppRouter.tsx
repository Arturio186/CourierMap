import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import AuthRouter from './AuthRouter';
import GuestRouter from './GuestRouter';
import { Context } from '..';

const AppRouter : React.FC = observer(() => {
    const {user} = useContext(Context);

    return (
        user.isAuth ? <AuthRouter/> : <GuestRouter/>
    )
})

export default AppRouter;
