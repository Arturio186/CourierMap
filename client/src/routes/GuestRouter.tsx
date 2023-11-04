import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTER_ROUTE } from '../utils/consts';

import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const guestBrowserRouter = createBrowserRouter([
    {
		path: LOGIN_ROUTE,
		element: <Login/>,
	},
    {
        path: REGISTER_ROUTE,
		element: <Register/>,
    },
	{
		path: '*',
		element: <Navigate to={LOGIN_ROUTE} />,
	},
]);

const GuestRouter = () => <RouterProvider router={guestBrowserRouter}/>;

export default GuestRouter;