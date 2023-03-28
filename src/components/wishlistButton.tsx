import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import Game from "../models/game";
import User from "../models/user";
import '/src/assets/style/wishlist.css'
import UserApi from "../services/user_api";
import { useNavigate } from "react-router-dom";

const userApi = new UserApi();
export default function WishlistButton({game, small, medium, applyFilter}: { game: Game, small?: boolean, medium?: boolean, applyFilter: any }) {
    const toast = useRef<Toast>(null);
    const [user, setUser] = useState<User | null>();
    const navigate = useNavigate();
    const size = {
        small: {
            fontSize: "2em",
            width: "50px",
            height: "50px"
        },
        medium: {
            fontSize: "3em",
            width: "75px",
            height: "75px"
        }
    }

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user !== null) {
            setUser(JSON.parse(user).user);
        } else {
            setUser(null);
        }
    }, []);

    function changeWishlistStat(id: number) {
        const user = sessionStorage.getItem('user');
        if (user !== null) {
            const userObj = JSON.parse(user);
            const wishlist = userObj.user.wishlist;
            if (wishlist.includes(id)) {
                const index = wishlist.indexOf(id);
                if (index > -1) {
                    wishlist.splice(index, 1);
                }
            } else {
                wishlist.push(id);
            }
            userObj.user.wishlist = wishlist;
            userApi.updateUserWishlist(userObj.user).then(() => {
                toast.current?.show({severity: 'success', summary: 'Success', detail: 'Wishlist updated', life: 3000});
                sessionStorage.setItem('user', JSON.stringify(userObj));
                setUser(userObj.user);
                applyFilter();
            }).catch(() => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Wishlist update failed',
                    life: 3000
                });
            });
        } else {
            navigate('/login');
        }
    }

    return (
        <>
            <Toast ref={toast}/>
            <a href={"#"} onClick={event => event.preventDefault()}>
                <div className={"wishlist"} onClick={() => changeWishlistStat(game.id)}
                     style={{
                         width: small ? size.small.width : medium ? size.medium.width : size.small.width,
                         height: small ? size.small.height : medium ? size.medium.height : size.small.height
                     }}>
                    {user !== null && user?.wishlist.includes(game.id) &&
                        <i className={"pi pi-heart-fill"}
                           style={{fontSize: small ? size.small.fontSize : medium ? size.medium.fontSize : size.small.fontSize}}/>
                    }
                    {!user?.wishlist.includes(game.id) &&
                        <i className={"pi pi-heart"}
                           style={{fontSize: small ? size.small.fontSize : medium ? size.medium.fontSize : size.small.fontSize}}/>}
                </div>
            </a>
        </>
    )
}