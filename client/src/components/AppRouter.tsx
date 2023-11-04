import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';

const AppRouter : React.FC = () => {
    const isAuth : boolean = false;

    return (
        isAuth ?
        <div>
            Auth
        </div>
        :
        <Routes>
            {publicRoutes.map((route) => 
                <Route
                    path={route.path}
                    Component={route.component}
                    key={route.path}
                />
            )}
            <Route path="/*" element={<Navigate to={LOGIN_ROUTE}/>}/>
        </Routes>
    )
}

export default AppRouter;
