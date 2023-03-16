import {useState} from "react";
import DropdownComponent from "./dropdown";

export default function DropdownRatings({filter, applyFilter}: { filter: any, applyFilter: any}) {
    const [selectedRating, setSelectedRating] = useState(null)
    const ratings = [
        {name: "★☆☆☆☆"},
        {name: "★★☆☆☆"},
        {name: "★★★☆☆"},
        {name: "★★★★☆"},
        {name: "★★★★★"}
    ];

    function onChange(e: any) {
        setSelectedRating(e.value)
        filter.rating = e.value;
        applyFilter(filter);
    }

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