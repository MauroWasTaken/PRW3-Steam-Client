import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import Game from "../models/game";

export default function SearchComponent({filter, applyFilter} : {filter: any, applyFilter: any}) {

    const formik = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: values => {
            if (values.search === '') {
                filter.search = '';
                applyFilter(filter);
                return;
            }
            filter.search = values.search;
            applyFilter(filter);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-inputgroup">
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

