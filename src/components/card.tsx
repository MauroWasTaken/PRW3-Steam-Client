import '/src/assets/style/card.css'
import Game from "../models/game";
import WishlistButton from "./wishlistButton";

export default function Card({game}: { game: Game }) {
    return (
        <div className={"game"}>
            <a className={"overlay"} href={"/game/" + game.id}> </a>
            <img src={game.splash} alt={game.title} className={"image"}/>
            <div className={"title"}>
                <h2>{game.title}</h2>
            </div>
            <WishlistButton game={game} small/>
        </div>
    )
}