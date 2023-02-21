import { Outlet } from "react-router-dom";


export default function Layout () {
    return (
        <>
            <div>
                <a><h1>Outlet</h1></a>
            </div>
            <Outlet />
        </>
    )
};