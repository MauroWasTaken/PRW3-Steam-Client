import User from "../models/user";

export default class UserApi {
    public async registerUser(user: { password: any; library: any[]; wishlist: any[]; email: any; username: any }) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }

    public async loginUser(email: string, password: string) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        })
    }

    public async updateUserWishlist(user: any) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "users/" + user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }

    public async updateUserLibrary(user: any) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "users/" + user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }
}