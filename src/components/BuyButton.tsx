import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import Game from "../models/game";
import User from "../models/user";
import '/src/assets/style/buybutton.css'
import UserApi from "../services/user_api";

const userApi = new UserApi();
export default function PurchaseButton({game}: { game: Game }) {
    const toast = useRef<Toast>(null);
    const [user, setUser] = useState<User | null>();
    const size = {
            fontSize: "3em",
            width: "75px",
            height: "75px"

    }
    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user !== null) {
            setUser(JSON.parse(user).user);
        } else {
            setUser(null);
        }
    }, []);

    function purchaseGame(id: number) {
        const user = sessionStorage.getItem('user');
        if (user !== null) {
            const userObj = JSON.parse(user);
            const library = userObj.user.library;
            if (!library.includes(id)) {
                library.push(id);
                userObj.user.library = library;
                userApi.updateUserLibrary(userObj.user).then(() => {
                    toast.current?.show({severity: 'success', summary: 'Success', detail: 'Game purchased', life: 3000});
                    sessionStorage.setItem('user', JSON.stringify(userObj));
                    setUser(userObj.user);
                }).catch(() => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'purchase failed',
                        life: 3000
                    });
                });
            }
        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Please login to add to wishlist',
                life: 3000
            });
        }
    }

    return (
        <>
            <Toast ref={toast}/>
            <a href={"#"} onClick={event => event.preventDefault()}>
                <div className={"purchase"} onClick={() => purchaseGame(game.id)}
                     style={{
                         width: size.width ,
                         height: size.height 
                     }}>
                    {user !== null &&
                        <i className={"pi pi-shopping-cart"}
                           style={{fontSize: size.fontSize}}/>
                    }
                </div>
            </a>
        </>
    )
}