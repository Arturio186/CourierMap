import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import AuthRouter from './AuthRouter';
import GuestRouter from './GuestRouter';

import { Context } from '..';
import { Authentication } from '../http/CreditionalsAPI';

const AppRouter : React.FC = observer(() => {
    
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
  
    useEffect(()=> {
        (async () => {
            if (localStorage.getItem('token')) {
                const response = await Authentication();

                if (response.status == 200) {
                    user.setUser(response.message);
                    user.setIsAuth(true);
                }
                else {
                    console.log(response.message)
                }
            }
            setLoading(false);
        })();
      }, []);

    return (
        loading ? <div>Загрузка...</div> : user.isAuth ? 
        <AuthRouter/>
        : 
        <GuestRouter/>
    )
})

export default AppRouter;
