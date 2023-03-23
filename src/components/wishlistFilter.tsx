import {Dropdown} from "primereact/dropdown";
import '/src/assets/style/dropdown.css'
import {Checkbox} from "primereact/checkbox";
import {useState} from "react";

export default function WishlistFilter({updateWishlistFilter}: { updateWishlistFilter: any }) {
    const [checked, setChecked] = useState(false);

    function onChange(e: any) {
        setChecked(e.checked);
        updateWishlistFilter(e.checked);
    }

    return (
        <div className={"filter"}>
            <Checkbox inputId="wishlist" name="wishlist" value="wishlist" onChange={onChange} checked={checked}/>
            <label htmlFor="wishlist" className="ml-2" style={{color: "white", margin: "10px", fontStyle: "bold"}}>Wishlist</label>
        </div>
    )
}