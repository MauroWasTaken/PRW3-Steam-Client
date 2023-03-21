import '/src/assets/style/card.css'
import Game from "../models/game";

export default function Card({game}: { game: Game }) {
    return (
        <a href={"/game/"+game.id}>
            <div className={"game"} >
                <img src={game.splash} alt={game.title} className={"image"}/>
                <div className={"title"}>
                    <h2>{game.title}</h2>
                </div>
            </div>
        </a>
    )
}