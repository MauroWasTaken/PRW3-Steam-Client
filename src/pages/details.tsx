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
                console.log(data)
                setReviews(data.length !== 0 ? data : [null])
            });
    }, []);

    useEffect(() => {
        let oldScroll = window.scrollY;
        let screenRatio = window.innerWidth / window.innerHeight;
        const handleScroll = (event:Event) => {
            const medias = document.getElementById('medias');
            const review = document.getElementById('review');
            if (medias !== null && review !== null && screenRatio > 1) {
                let scrollTo:HTMLElement;
                if (window.scrollY < oldScroll) {
                    scrollTo = medias;
                } else {
                    scrollTo = review;
                }
                oldScroll = window.scrollY;
                //scrollTo.scrollIntoView(
                //    { block: "start", inline: "nearest"}
                //);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);


    return (<>
        <div className={"title"}>
            <h1>{game === null ?
                "Loading..." :
                game.title}
            </h1>
        </div>            
        <div className={"details"}>
            {game !== null && <>
                <img className={"medias"} src={game.splash} alt="" id="medias" />
                <div className={"description"}>
                    <p>{game.description}</p>
                </div>
                <div className={"reviews"}>
                    <h1 id="review">Reviews</h1>
                        {reviews.length === 0 && <h2>Loading...</h2>}
                        {reviews[0] === null && <h2>No Reviews</h2>}
                        { (reviews[0] !== null && reviews.length > 0) && reviews.map((review: any) => (
                            <ReviewCard key={review} review={review}/>
                        ))}
                </div>
                </> 
            }
        </div>
        </>
    )
}