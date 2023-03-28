import '/src/assets/style/shared.css';
import '/src/assets/style/navbar.css';
import {useEffect, useState} from "react";
import User from "../models/user";
import {Button} from "primereact/button";

export default function Navbar() {
    const [user, setUser] = useState<User | null>();

    // Check if the sessionStorage has been changed
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user !== null) {
            setUser(JSON.parse(user).user);
        } else {
            setUser(null);
        }

    }, [sessionStorage.getItem('user')]);

    return (
        <div className={"nav_container"}>
            <a className={"nav_title"} href='/'>
            <i className={"pi pi-power-off"}
                        style={{fontSize: 30}}/>
                <h1>GameShelf</h1>
            </a>
            <div className={"nav_buttons"}>
                {user === null &&
                    <>
                        <Button className={"nav_button"} severity={'warning'} label={"Login"} icon={"pi pi-sign-in"}
                                iconPos={"right"} onClick={() => {
                            window.location.href = '/login'
                        }}/>
                        <Button className={"nav_button"} severity={'warning'} label={"Register"}
                                icon={"pi pi-user-plus"}
                                iconPos={"right"} onClick={() => {
                            window.location.href = '/register'
                        }
                        }/>
                    </>
                }
                {user !== null &&
                    <>
                        <div className={"welcome-title"} style={{color: "white"}}>Welcome {user?.username}</div>
                        <Button icon="pi pi-user" className={"nav_button"} severity="warning" rounded
                                aria-label="User" onClick={() => {
                                    window.location.href = '/profile'
                                }}/>
                        <Button className={"nav_button"} severity={'warning'} label={"Logout"} icon={"pi pi-sign-out"}
                                iconPos={"right"} onClick={() => {
                            sessionStorage.removeItem('user');
                            window.location.href = '/'
                        }}/>
                    </>
                }
            </div>
        </div>
    )
}