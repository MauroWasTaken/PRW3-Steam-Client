import {Dropdown} from "primereact/dropdown";
import '/src/assets/style/dropdown.css'

export default function DropdownComponent({onChange, options, selectedValue, setSelectedValue, placeholder}: {onChange: any, options: {}[] , selectedValue: any, setSelectedValue: any, placeholder: string }) {
    return (
        <div className={"filter"}>
            <Dropdown
                value={selectedValue}
                onChange={(e) => {
                    onChange(e)
                }}
                options={options}
                optionLabel={"name"}
                placeholder={placeholder}
                className={"w-full md:w-14rem"}/>
        </div>
    )
}