import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { userSignup } from '../../services/userApi';
import {toast} from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues={
    fullName:"",
    email:"",
    mobile:"",
    password:"",
    confirmPass:""
  }

  // Yup form validation
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('First Name Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is Required'),
    mobile: Yup.string()
      .matches(/^[5-9]{1}[0-9]{9}$/, 'Invalid mobile number')
      .required("This field required"),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/,
        'Password must contain uppercase,lowercase,special characters,numbers')
      .required('Password is Required'),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is Required ')
  });

  const onSubmit = async (values) => {
    try {
      //seting the loading state
      setLoading(!loading);
      const { data } = await userSignup(values);
      if (data.status) {
        navigate("/verify");
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
  }

  const formik=useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  //console.log("Form values",formik.values);

  return (
    <>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <form action="" onSubmit={formik.handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fullName" value="Your full name" />
                </div>
                {formik.touched.fullName && formik.errors.fullName ? <p>{formik.errors.fullName}</p> : null}
                <TextInput
                  name="fullName"
                  type='text'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                <TextInput
                  name="email"
                  type='email'
                  placeholder="mail@sample.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                   />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mobile" value="Your mobile" />
                </div>
                {formik.touched.mobile && formik.errors.mobile ? <p>{formik.errors.mobile}</p> : null}
                <TextInput
                  name="mobile"
                  type='tel'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                   />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
                <TextInput
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                   />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Confirm password" />
                </div>
                {formik.touched.confirmPass && formik.errors.confirmPass ? <p>{formik.errors.confirmPass}</p> : null}
                <TextInput
                  name="confirmPass"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPass}
                   />
              </div>
              <div className="w-full">
              {loading ? <Button isProcessing type='submit'>Signup</Button>
               : <Button type='submit'>Signup</Button>}
              </div>
              </form>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?&nbsp;
              <p
                className="text-cyan-700 hover:underline cursor-pointer dark:text-cyan-500 "
              >
                Login to account
              </p>
            </div>
          </div>
    </>
  )
}

export default Signup
