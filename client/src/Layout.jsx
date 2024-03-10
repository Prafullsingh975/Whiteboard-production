import HomeNav from "./components/HomeNav";
import {Outlet} from "react-router-dom"

export default function Layout() {
    return <>
        <HomeNav/>
        <Outlet />
        {/* footer */}
    </>
}