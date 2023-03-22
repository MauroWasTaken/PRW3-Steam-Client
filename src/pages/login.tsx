import React, {useRef} from 'react';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {Toast, ToastMessage} from 'primereact/toast';
import {InputMask} from "primereact/inputmask";
import {useNavigate} from "react-router";


export default function Login() {
    const toast = useRef<Toast>(null);
    const navigate = useNavigate();

    const showMultipleErrors = (errors: any) => {
        // List of toast messages
        const listOfToasts: ToastMessage[] = [];
        // Iterate over the errors
        Object.keys(errors).forEach((key) => {
            // Add the error to the list of toast messages
            listOfToasts.push({severity: 'error', summary: 'Error', detail: errors[key]});
        });

        // Show all the errors
        toast.current?.show(listOfToasts);
    }

    const formik = useFormik({
                initialValues: {
                    email: '',
                    password: ''
                },
                validateOnBlur: false,
                validateOnChange: false,
                validate: values => {
                    const errors: any = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Password is required';
                    } else if (values.password.length > 20) {
                        errors.password = 'Must be 20 characters or less';
                    }
                    if (Object.keys(errors).length > 0) {
                        showMultipleErrors(errors);
                    }
                    return errors;
                },
                onSubmit: values => {

                    fetch('http://localhost:8493/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                        },
                        body: `email=${values.email}&password=${values.password}`
                    }).then(response => {
                        if (response?.status === 200) {
                            toast.current?.show({severity: 'success', summary: 'Success', detail: 'Login successful'});
                            navigate('/');
                        } else {
                            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Login failed'});
                            formik.setFieldValue('email', '');
                            formik.setFieldValue('password', '');
                        }
                    });
                }

            }
        )
    ;

    return (
        <>
            <Toast ref={toast}/>
            <form onSubmit={formik.handleSubmit}>
                <InputText id="email" name="email" type="email" placeholder="Email"
                           value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)}/>
                <Password id={'password'} name={'password'} placeholder={'Password'} value={formik.values.password}
                          onChange={(e) => formik.setFieldValue('password', e.target.value)} feedback={false}/>
                <Button label="Submit" type="submit"/>
            </form>
        </>
    )
}