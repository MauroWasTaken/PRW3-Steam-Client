export default class GameApi {
    public async getGames() {
        return fetch(import.meta.env.VITE_BACKEND_URL + "games")
    }
}