import { Outlet } from "react-router-dom";

import Navbar from "../components/UI/Navbar/Navbar";

const MainLayout = () => {
    return <>
        <Navbar />
		<Outlet />
    </>
}

export default MainLayout;