import React, {useRef} from 'react';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {Toast, ToastMessage} from 'primereact/toast';
import UserApi from "../services/user_api";

const userApi = new UserApi();

export default function Login() {
    const toast = useRef<Toast>(null);

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
                    userApi.loginUser(values.email, values.password).then((data) => {
                        if (data.status === 200) {
                            data.json().then((data) => {
                                sessionStorage.setItem('user', JSON.stringify(data));
                                window.location.href = '/'
                            })
                        } else {
                            toast.current?.show({severity: 'error', summary: 'Error', detail: 'Login failed'});
                            formik.setFieldValue('password', '');
                            formik.setFieldValue('email', '');
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