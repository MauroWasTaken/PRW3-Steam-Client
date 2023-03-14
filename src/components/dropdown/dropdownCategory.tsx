import DropdownComponent from "./dropdown";
import {useEffect, useState} from "react";

export default function DropdownCategory({filter, applyFilter}: { filter: any, applyFilter: any}) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8493/genres')
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, []);

    function onChange(e: any) {
        setSelectedCategory(e.value)
        filter.category = e.value;
        applyFilter(filter);
    }

    return (
        <>
            {categories.length > 0 &&
                <DropdownComponent
                    onChange={onChange}
                    options={categories}
                    selectedValue={selectedCategory}
                    setSelectedValue={setSelectedCategory}
                    placeholder={"Select the category..."}/>
            }
        </>
    )
}