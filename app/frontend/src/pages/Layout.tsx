import { Outlet } from "react-router-dom";

import NavBar from "../components/SideBar";

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
}