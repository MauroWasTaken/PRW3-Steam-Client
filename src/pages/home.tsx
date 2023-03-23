import '/src/assets/style/home.css'
import Card from "../components/card";
import {useEffect, useState} from "react";
import Game from "../models/game";
import {Filter} from "../models/filter"
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import DropdownCategory from "../components/dropdown/dropdownCategory";
import DropdownRatings from "../components/dropdown/dropdownRatings";
import SearchComponent from "../components/search";
import Genre from "../models/genre";
import WishlistFilter from "../components/wishlistFilter";
import GameApi from "../services/game_api";
import ReviewApi from "../services/review_api";

const gameApi = new GameApi();
const reviewApi = new ReviewApi();
export default function Home() {
    const [games, setGames] = useState([])
    const [gamesCopy, setGamesCopy] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [filter, setFilter] = useState<Filter>({
        search: '',
        category: null,
        rating: null,
        wishlist: false
    })

    useEffect(() => {
        gameApi.getGames().then(response => response.json()).then(data => {
            setGames(data)
            setGamesCopy(data)
            setIsLoading(false)
        })
    }, []);

    useEffect(() => {
        reviewApi.getReviews().then(response => response.json()).then(data => {
            setReviews(data)
        });
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter])

    function gameReviewsAverageRating(gameId: number) {
        const gameReviews = reviews.filter((review: any) => review.gameId === gameId) as [];
        let sum = 0;
        gameReviews.forEach((review: any) => {
            sum += review.rating;
        });
        return sum / gameReviews.length;
    }

    function updateSearchFilter(value: string) {
        setFilter({
            ...filter,
            search: value
        });
    }

    function updateCategoryFilter(value: Genre) {
        setFilter({
            ...filter,
            category: value
        });
    }

    function updateRatingsFilter(value: number) {
        setFilter({
            ...filter,
            rating: value
        });
    }

    function updateWishlistFilter(value: boolean) {
        setFilter({
            ...filter,
            wishlist: value
        });
    }

    function applyFilter() {
        let gamesFiltered = gamesCopy;
        if (filter.search !== '') {
            gamesFiltered = gamesFiltered.filter((game: Game) => game.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
        if (filter.category !== null) {
            gamesFiltered = gamesFiltered.filter((game: Game) => game.genresIds.includes(filter.category?.id as number));
        }
        if (filter.rating !== null) {
            gamesFiltered = gamesFiltered.filter((game: Game) => {
                let averageRating = gameReviewsAverageRating(game.id);
                return averageRating > (filter.rating as number) && averageRating <= (filter.rating as number + 1);
            });
        }
        if (filter.wishlist) {
            const user = JSON.parse(sessionStorage.getItem('user') as string).user;
            gamesFiltered = gamesFiltered.filter((game: Game) => user.wishlist.includes(game.id));
        }
        setGames(gamesFiltered);
    }

    return (
        <div className={"container"}>
            <div className={"title"}>
                <h1>List of games</h1>
            </div>
            <div className={"content_container"}>
                <div className={"filters"}>
                    <SearchComponent updateSearchFilter={updateSearchFilter}/>
                    <div className={"row"}>
                        <DropdownCategory updateCategoryFilter={updateCategoryFilter}/>
                        <DropdownRatings updateRatingsFilter={updateRatingsFilter}/>
                        <WishlistFilter updateWishlistFilter={updateWishlistFilter}/>
                    </div>
                </div>
                {games.length === 0 && !isLoading && <h2 style={{color: "white"}}>No game to display.</h2>}
                <div className={"games"}>
                    {isLoading && <h2>Loading...</h2>}
                    {games.length > 0 && games.map((game: Game) => (
                        <Card key={game.id} game={game} applyFilter={applyFilter}/>
                    ))}
                </div>
            </div>
        </div>
    )
}