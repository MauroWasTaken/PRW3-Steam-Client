import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import Game from "../models/game";

export default function SearchComponent({updateSearchFilter}: {updateSearchFilter: any }) {

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: values => {
            if (values.search === '') {
                updateSearchFilter('');
                return;
            }
            updateSearchFilter(values.search);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{width: "100%", paddingRight: "var(--universal-padding)"}}>
            <div className="p-inputgroup" style={{width: "100%"}}>
                <InputText
                    id={"search"}
                    name={"search"}
                    value={formik.values.search}
                    placeholder="Search..."

                    onChange={(e) => formik.setFieldValue('search', e.target.value)}
                />
                <Button icon="pi pi-search" className="p-button-warning"/>
            </div>
        </form>
    )

}

