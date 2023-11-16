import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import AppRouter from './routes/AppRouter';
import { Context } from '.';
import { authentication } from './http/CreditionalsAPI';

import './App.scss';

const App : React.FC = observer(() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);
  
    useEffect(()=> {
        if (localStorage.getItem('token')) {
            authentication().then(data => {
                user.setUser(data.message);
                user.setIsAuth(true);
            })
            .catch((error) => console.log(error.response.data.message));
        }
        setLoading(false)  
      }, []);
    
    return (
        loading ? <div>Загрузка...</div> : <AppRouter/>
    )
})

export default App;