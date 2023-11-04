import React from "react";

import { LOGIN_ROUTE, REGISTER_ROUTE } from "./utils/consts";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

interface IRoute {
    path: string;
    component: React.FC;
    title: string;
}

interface IRoutes extends Array<IRoute> {}

export const publicRoutes : IRoutes = [
    {path: LOGIN_ROUTE, component: Login, title: "Авторизация"},
    {path: REGISTER_ROUTE, component: Register, title: "Регистрация"},
];
