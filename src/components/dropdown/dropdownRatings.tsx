import {useEffect, useState} from "react";
import DropdownComponent from "./dropdown";

export default function DropdownRatings({content, updateRatingsFilter}: { content: number | null, updateRatingsFilter: any }) {
    const [selectedRating, setSelectedRating] = useState(null)
    const ratings = [
        {id: 0, name: "★☆☆☆☆"},
        {id: 1, name: "★★☆☆☆"},
        {id: 2, name: "★★★☆☆"},
        {id: 3, name: "★★★★☆"},
        {id: 4, name: "★★★★★"}
    ];

    function onChange(e: any) {
        setSelectedRating(e.value);
        updateRatingsFilter(e.value.id);
    }

    useEffect(() => {
        if (content === null) {
            setSelectedRating(null)
        }
    }, [content]);

    return (
        <>
            <DropdownComponent
                options={ratings}
                selectedValue={selectedRating}
                setSelectedValue={setSelectedRating}
                placeholder={"Select the rating..."}
                onChange={onChange}/>
        </>
    )
}