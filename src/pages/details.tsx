import { useParams, useNavigate } from 'react-router';
import {useEffect, useState} from "react";
import '/src/assets/style/details.css';
import ReviewCard from "../components/reviewcard";


export default function Details() {
    const { id } = useParams();
    const [game, setGame] = useState<any>(null)
    const [reviews, setReviews] = useState<Array<any>>([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8493/games/' + id)
            .then(response => response.json())
            .then(data => {
                if (data === undefined) {        	
                    navigate("404");
                }
                setGame(data !== undefined  ? data : null)
            });
        fetch('http://localhost:8493/reviews/?gameId=' + id)
            .then(response => response.json())
            .then(data => {
                setReviews(data.length !== 0 ? data : [null])
            });
    }, []);

    return (<>
                  
        <div className={"details"}>
            {game !== null && <>
                <div className={"medias"} id="medias" style={{ backgroundImage: `url(${game.splash})` }}>
                    <div className={"title"}>
                        <h1>{game === null ?
                            "Loading..." :
                            game.title}
                        </h1>
                    </div>  
                </div>
                <div className={"description"}>
                    <h1 id="description">Description</h1>
                    <div className={"scroolable"}>
                        <p>{game.description}</p>
                    </div>
                </div>
                <div className={"reviews"}>
                    <h1 id="review">Reviews</h1>
                        <div className={"scroolable"}>
                            {reviews.length === 0 && <h2>Loading...</h2>}
                            {reviews[0] === null && <h2>No Reviews</h2>}
                            { (reviews[0] !== null && reviews.length > 0) && reviews.map((review: any) => (
                                <ReviewCard key={review} review={review}/>
                            ))}
                        </div>
                </div>
                </> 
            }
        </div>
        </>
    )
}