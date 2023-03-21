import React from 'react';
import {useFormik} from 'formik';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";

export default function Login({setToken}: { setToken: any}) {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: values => {
            fetch("http://localhost:8493/users/?password="+ values.password +"&username=" + values.username)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        }

    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputText value={formik.values.username}
                       onChange={(e) => formik.setFieldValue('username', e.target.value)}/>
            <Password value={formik.values.password}
                      onChange={(e) => formik.setFieldValue('password', e.target.value)} feedback={false}/>
            <Button label="Submit" type="submit"/>
        </form>
    )
}