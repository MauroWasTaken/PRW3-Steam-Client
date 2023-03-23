export default class GenreApi {
    public async getGenres() {
        return fetch(import.meta.env.VITE_BACKEND_URL + "genres")
    }
}