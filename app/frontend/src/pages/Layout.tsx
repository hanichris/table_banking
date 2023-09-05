import { Outlet } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";

export default function Layout() {
    return (
        <>
            <NavBar/>
            <Outlet/>
        </>
    );
}