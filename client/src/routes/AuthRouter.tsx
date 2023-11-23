import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { privateRoutes } from './routes';
import Navbar from '../components/UI/Navbar/Navbar';

const authBrowserRouter = createBrowserRouter(privateRoutes);

const AuthRouter = () => <RouterProvider router={authBrowserRouter}/>;

export default AuthRouter;