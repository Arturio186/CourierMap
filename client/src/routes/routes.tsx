import { Navigate } from "react-router-dom";

import { LOGIN_ROUTE, REGISTER_ROUTE } from "utils/consts"
import { MAP_ROUTE } from "utils/consts"

import IRoute from "interfaces/IRoute";

import MainLayout from "layouts/MainLayout";

import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';

import CourierMap from 'pages/CourierMap/CourierMap';
import Products from "pages/Products/Products";
import Categories from "pages/Categories/Categories";

export const publicRoutes : Array<IRoute> = [
    {path: LOGIN_ROUTE, element: <Login/>, title: "Авторизация"},
    {path: REGISTER_ROUTE, element: <Register/>, title: "Регистрация"},
    {path: '*', element: <Navigate to={LOGIN_ROUTE}/>, title: "Переадресация"}
]

export const privateRoutes : Array<IRoute> = [
    {path: '/', element: <MainLayout />, title: 'Шаблон', children: [
        {path: MAP_ROUTE, element: <CourierMap/>, title: "Карта курьеров"},
        {path: '/products', element: <Products/>, title: "Товары"},
        {path: '/categories', element: <Categories/>, title: "Категории"},
    ]},
    {path: '*', element: <Navigate to={MAP_ROUTE}/>, title: "Переадресация"}
]