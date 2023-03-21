import DropdownComponent from "./dropdown";
import {useEffect, useState} from "react";

export default function DropdownCategory({updateCategoryFilter}: {updateCategoryFilter: any}) {
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
        updateCategoryFilter(e.value)
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