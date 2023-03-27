export default class GameApi {
    public async getGames() {
        return fetch(import.meta.env.VITE_BACKEND_URL + "games")
    }

    public async getGame(id: string) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "games/" + id)
    }
    public async getGameReviews(id: string) {
        return fetch(import.meta.env.VITE_BACKEND_URL + "reviews/?gameId=" + id)
    }
}