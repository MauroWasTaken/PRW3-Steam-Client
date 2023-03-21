import Genre from "./genre";

export type Filter = {
    search: string,
    category: Genre | null,
    rating: number | null,
    wishlist: boolean
}