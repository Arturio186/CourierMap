import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';

import { MAP_ROUTE } from '../utils/consts';

import CourierMap from '../pages/CourierMap/CourierMap';

const authBrowserRouter = createBrowserRouter([
    {
		path: MAP_ROUTE,
		element: <CourierMap/>,
	},
    {
		path: '*',
		element: <Navigate to={MAP_ROUTE} />,
	},
]);

const AuthRouter = () => <RouterProvider router={authBrowserRouter}/>;

export default AuthRouter;