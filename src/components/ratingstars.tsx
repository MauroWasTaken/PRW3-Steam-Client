import '/src/assets/style/ratingstars.css';
export default function Rating({rating,minimum = 0,maximum = 5}: { rating: number; minimum?:number;maximum?:number}) {
    
    const getRatingStarts = () => {
        let output:string = "";
        if(minimum<=rating && rating<=maximum){
            for(let i = minimum; i<maximum; i++){
                let classname:string = "";
                if(i+0.5 == rating){
                    classname = "halfStar";
                }else if(i<rating){
                    classname = "fullStar";
                }else{
                    classname = "emptyStar";
                }
                output += "<span class="+classname+">★</span>";
            }
        }
        return output;

    }
    return (
        <>
            <div className={"rating"} dangerouslySetInnerHTML={{__html: getRatingStarts()}}/>
        </>
    )
}
