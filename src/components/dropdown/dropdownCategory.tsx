import DropdownComponent from "./dropdown";
import {useEffect, useState} from "react";
import GenreApi from "../../services/genre_api";

const genreApi = new GenreApi();
export default function DropdownCategory({updateCategoryFilter}: { updateCategoryFilter: any }) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        genreApi.getGenres().then(response => response.json()).then(data => {
            setCategories(data)
        });
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