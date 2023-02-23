import '/src/assets/style/card.css'

export default function Card({game}: { game: any}) {

    return (
        <>
            <div className={"game"}>
                <img src={game.splash} alt={game.name} className={"game_image"}/>
                <div className={"game_title"}>
                    <h2>{game.title}</h2>
                </div>
            </div>
        </>
    )
}