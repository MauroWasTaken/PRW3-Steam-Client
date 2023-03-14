import '/src/assets/style/home.css'
import Card from "../components/card";
import {useEffect, useState} from "react";
import Game from "../models/game";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

import {useFormik} from 'formik';
import {Dropdown} from "primereact/dropdown";
import DropdownCategory from "../components/dropdown/dropdownCategory";
import DropdownRatings from "../components/dropdown/dropdownRatings";
import SearchComponent from "../components/search";

export default function Home() {
    const [games, setGames] = useState([])
    const [gamesCopy, setGamesCopy] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let filter = {
        search: '',
        category: null,
        rating: null,
        wishlist: false
    }

    useEffect(() => {
        fetch('http://localhost:8493/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
                setGamesCopy(data)
                setIsLoading(false)
            })


    }, []);

    function applyFilter(newFilter: any) {
        filter = newFilter;
        let gamesFiltered = gamesCopy;
        if (filter.search !== '') {
            gamesFiltered = gamesFiltered.filter((game: Game) => game.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
        if (filter.category !== null) {
            gamesFiltered = gamesFiltered.filter((game: Game) => game.genresIds.includes(filter.category.id));
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
                    <form onSubmit={formik.handleSubmit}>
                        <div className="p-inputgroup">
                            <InputText
                                id={"search"}
                                name={"search"}
                                value={formik.values.search}
                                placeholder="Search..."

                                onChange={(e) => formik.setFieldValue('search', e.target.value)}
                            />
                            <Button icon="pi pi-search" className="p-button-warning"/>
                        </div>
                    </form>
                </div>
                {games.length === 0 && !isLoading && <h2>No game to display.</h2>}
                <div className={"games"}>
                    {isLoading && <h2>Loading...</h2>}
                    {games.length > 0 && games.map((game: Game) => (
                        <Card key={game.id} game={game}/>
                    ))}
                </div>
            </div>
        </div>
    )
}