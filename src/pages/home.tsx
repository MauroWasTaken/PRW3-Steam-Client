import '/src/assets/style/home.css'
import Card from "../components/card";
import {useEffect, useState} from "react";
import Game from "../models/game";

export default function Home() {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('http://localhost:8493/games')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setGames(data)
            })


    }, []);


    return (
        <div className={"container"}>
            <div className={"title"}>
                <h1>List of games</h1>
            </div>
            <div className={"games"}>
                {games.length === 0 && <h2>Loading...</h2>}
                {games.length > 0 && games.map((game: Game) => (
                    <Card key={game.id} game={game}/>
                ))}
            </div>
        </div>
    )
}