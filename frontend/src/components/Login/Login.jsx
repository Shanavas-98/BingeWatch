import React, { useState } from "react";
import { userLogin } from "../../services/userApi";
import { setUserDetails } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import {toast} from "react-toastify";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const initialValues = {
        email: "",
        password: ""
    }
    const onSubmit = async (values) => {
        try {
            const { data } = await userLogin(values);
            if (data.created) {
                navigate("/");
            } else {
                throw Error(data.error)
            }
        } catch (err) {
            console.log("Error:", err);
            toast.error(err,{
                position:"top-center"
            })
        }
    }
    const formik = useFormik({
        initialValues,
        onSubmit
    })
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Login
            </h3>
        <form action="" onSubmit={formik.handleSubmit}>
            <Label htmlFor="email" value="Email" />
            <TextInput type='text'
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email} />
            <Label htmlFor="password" value="Password" />
            <TextInput type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            <Button type="submit">Login</Button>
        </form>
        </div>
    );
}

export default Login;
