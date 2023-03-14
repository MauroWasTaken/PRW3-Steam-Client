import Rating from './ratingstars';
import '/src/assets/style/reviewcard.css'
import '/src/components/ratingstars'
import {useEffect, useState} from "react";

export default function ReviewCard({review}: { review: any}) {
    const [user, setUser] = useState<any>(null);
    
    useEffect(() => {
        fetch('http://localhost:8493/users/' + review.userId)
        .then(response => response.json())
        .then(data => {
            setUser(data !== undefined  ? data : null)
        });
    }, []);

    return (
        <>
            {user !== null && 
            <div className={"review"}>
                <h2 className={"reviewer"}>{user.username}</h2>
                <div className={"content"}>
                    <div className={"comment"}>
                        <p>{review.comment}</p>
                    </div>
                    <Rating rating={review.rating}/>
                </div>
            </div>
            }
        </>
    )
}