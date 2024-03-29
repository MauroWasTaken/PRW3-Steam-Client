import {Dropdown} from "primereact/dropdown";
import '/src/assets/style/dropdown.css'
import {Checkbox} from "primereact/checkbox";
import {useEffect, useState} from "react";

export default function WishlistFilter({content, updateWishlistFilter}: { content: boolean, updateWishlistFilter: any }) {
    const [checked, setChecked] = useState(false);

    function onChange(e: any) {
        const user = sessionStorage.getItem('user');
        if (user === null) {
            window.location.href = '/login';
        } else {
            setChecked(e.checked);
            updateWishlistFilter(e.checked);
        }
    }

    useEffect(() => {
        if (!content) {
            setChecked(false)
        }
    }, [content]);

    return (
        <div className={"filter"}>
            <Checkbox inputId="wishlist" name="wishlist" value="wishlist" onChange={onChange} checked={checked}/>
            <label htmlFor="wishlist" className="ml-2" style={{color: "white", margin: "10px", fontStyle: "bold"}}>Wishlist</label>
        </div>
    )
}