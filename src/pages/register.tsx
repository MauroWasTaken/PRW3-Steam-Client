import React, {useRef} from 'react';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {useFormik} from "formik";
import {Toast, ToastMessage} from 'primereact/toast';


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
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                validateOnBlur: false,
                validateOnChange: false,
                validate: values => {
                    const errors: any = {};
                    if (!values.username) {
                        errors.username = 'Username is required';
                    } else if (values.username.length > 10) {
                        errors.username = 'Must be 10 characters or less';
                    }
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
                    if(!values.confirmPassword){
                        errors.confirmPassword = 'Confirm password is required';
                    } else if(values.confirmPassword !== values.password){
                        errors.confirmPassword = 'Passwords do not match';
                    }
                    if (Object.keys(errors).length > 0) {
                        showMultipleErrors(errors);
                    }
                    return errors;
                },
                onSubmit: values => {
                    const user = {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        wishlist: [],
                        library: []
                    }
                    fetch('http://localhost:8493/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(user)
                    }).then(data => {
                            if (data.status === 200 || data.status === 201) {
                                data.json().then((data) => {
                                    sessionStorage.setItem('user', JSON.stringify(data));
                                    window.location.href = '/'
                                })
                            } else {
                                toast.current?.show({severity: 'error', summary: 'Error', detail: 'Register failed'});
                                formik.setFieldValue('password', '');
                                formik.setFieldValue('email', '');
                                formik.setFieldValue('username', '');
                                formik.setFieldValue('confirmPassword', '');
                            }
                        }
                    )
                }

            }
        )
    ;

    return (
        <>
            <Toast ref={toast}/>
            <form onSubmit={formik.handleSubmit}>
                <InputText id="username" name="username" type="text" placeholder="Username"
                           value={formik.values.username}
                           onChange={(e) => formik.setFieldValue('username', e.target.value)}/>
                <InputText id="email" name="email" type="email" placeholder="Email"
                           value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)}/>
                <Password id={'password'} name={'password'} placeholder={'Password'} value={formik.values.password}
                          onChange={(e) => formik.setFieldValue('password', e.target.value)}/>
                <Password id={'confirmPassword'} name={'confirmPassword'} placeholder={'Confirm Password'}
                          value={formik.values.confirmPassword}
                          onChange={(e) => formik.setFieldValue('confirmPassword', e.target.value)} feedback={false}/>
                <Button label="Submit" type="submit"/>
            </form>
        </>
    )
}