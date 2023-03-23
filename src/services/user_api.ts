import User from "../models/user";

export default class UserApi {
    public async registerUser() {

    }

    public async loginUser() {

    }

    public async updateUserWishlist(user: any) {
        return fetch("http://localhost:8493/users/" + user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }
}