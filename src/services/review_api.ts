export default class ReviewApi {
    public async getReviews() {
        return fetch(import.meta.env.VITE_BACKEND_URL + "reviews")
    }
}