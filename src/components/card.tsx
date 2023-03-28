import '/src/assets/style/card.css'
import Game from "../models/game";
import WishlistButton from "./wishlistButton";

export default function Card({game, applyFilter}: { game: Game, applyFilter: any }) {
    return (
        <div className={"game"}>
            <a className={"overlay"} href={"/game/" + game.id}> </a>
            <img src={game.splash} alt={game.title} className={"image"}/>
            <div className={"title"}>
                <h2>{game.title}</h2>
            </div>
            <WishlistButton game={game} applyFilter={applyFilter} small/>
        </div>
    )
}