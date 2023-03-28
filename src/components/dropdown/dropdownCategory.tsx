import DropdownComponent from "./dropdown";
import {useEffect, useState} from "react";
import GenreApi from "../../services/genre_api";
import Genre from "../../models/genre";

const genreApi = new GenreApi();
export default function DropdownCategory({content, updateCategoryFilter}: { content: Genre | null, updateCategoryFilter: any }) {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        genreApi.getGenres().then(response => response.json()).then(data => {
            setCategories(data)
        });
    }, []);

    useEffect(() => {
        if (content === null) {
            setSelectedCategory(null)
        }
    }, [content])

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