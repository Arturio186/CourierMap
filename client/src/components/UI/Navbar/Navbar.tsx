import React, {useContext, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";

import classes from './Navbar.module.scss';
import { privateRoutes } from "../../../routes/routes";
import { Context } from "../../..";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
    const currentPath = useLocation().pathname;

    useEffect(() => {
        privateRoutes[0].children?.forEach((route) => {
            if (route.path === currentPath) {
                document.title = route.title;
            }
        })
    }, [currentPath])

    const {user} = useContext(Context);

    const logout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <img src="./images/logo.svg"/>
            </div>

            <div className={classes.navPanel}>
                {privateRoutes[0].children?.map(route => 
                    <Link
                        key={route.path}
                        to={route.path} 
                        className={route.path === currentPath ? classes.active : classes.item}>
                            {route.title}
                    </Link>
                )}
            </div>

            <button className={classes.logout} onClick={logout}>
                <img src="./images/logout.svg"/>
            </button>
        </header>
    )
})

export default Navbar;
