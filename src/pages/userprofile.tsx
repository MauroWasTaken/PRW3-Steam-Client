import { useParams, useNavigate } from 'react-router';
import {useEffect, useState} from "react";
import '/src/assets/style/userprofile.css';
import User from '../models/user';
import Game from '../models/game';
import Card from '../components/card';
import ReviewCard from '../components/reviewcard';


export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null)
    const [games, setGames] = useState<Game[]>([]);
    const [reviews, setReviews] = useState<Array<any>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading) return;
        const userjson = sessionStorage.getItem('user');
        let games: Game[] = [];
        if (userjson !== null) {
            let user = JSON.parse(userjson).user;
            setUser(user);
            user?.library.forEach((gameId: number) => {
                fetch(`http://localhost:8493/games/`+gameId)
                    .then(response => response.json())
                    .then((data: Game) => {
                        games.push(data);
                    });
            });
            setGames(games);
            fetch('http://localhost:8493/reviews/?userId=' + user.id)
                .then(response => response.json())
                .then(data => {
                    setReviews(data.length !== 0 ? data : [null])
                });
            setIsLoading(false);
        } else {
            navigate('/login');
        }
    }, [isLoading]);

    return (<>
            <div className='profile'>
                <h1 className='title'>{user?.username}'s profile</h1>
                <div className='userGames'>
                    <h2 className={"review title"}>Owned games</h2>
                    {games.length === 0 && !isLoading && <h3 style={{color: "white"}}>No game to display.</h3>}
                    <div className={"games"}>
                        {isLoading && <h3>Loading...</h3>}
                        {games.length > 0 && games.map((game: Game) => (
                            <Card key={game.id} game={game} applyFilter={()=>{}}/>
                        ))}
                    </div>
                </div>
                <div className={"reviews"}>
                    <h2 className={"review title"}>Reviews</h2>
                        <div className={"scrollable"}>
                            {reviews.length === 0 && <h2>Loading...</h2>}
                            {reviews[0] === null && <h2>No Reviews</h2>}
                            { (reviews[0] !== null && reviews.length > 0) && reviews.map((review: any) => (
                                <ReviewCard key={review} review={review}/>
                            ))}
                        </div>
                </div>
            </div>
        </>
    )
}