import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { userSignup } from '../../services/userApi';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPass: '',
  };

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
      .required('This field required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/,
        'Password must contain uppercase,lowercase,special characters,numbers',
      )
      .required('Password is Required'),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is Required '),
  });

  const onSubmit = async (values) => {
    try {
      // seting the loading state
      setLoading(!loading);
      const { data } = await userSignup(values);
      if (data.status) {
        navigate('/verify');
      } else {
        setLoading(false);
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const goToLogin = () => navigate('/login');
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      goToLogin();
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <div className=" border-2 border-white m-2 p-5 rounded-lg">
        <h3 className="text-xl font-medium m-2 text-white">
          Register
        </h3>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-60 gap-4"
        >
          <div>
            <div className="mb-1 block">
              <Label htmlFor="fullName" value="Your full name" className="text-white" />
            </div>
            {formik.touched.fullName && formik.errors.fullName
              ? <p>{formik.errors.fullName}</p> : null}
            <TextInput
              name="fullName"
              type="text"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="email" value="Your email" className="text-white" />
            </div>
            {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
            <TextInput
              name="email"
              type="email"
              className="dark"
              placeholder="mail@sample.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="mobile" value="Your mobile" className="text-white" />
            </div>
            {formik.touched.mobile && formik.errors.mobile ? <p>{formik.errors.mobile}</p> : null}
            <TextInput
              name="mobile"
              type="tel"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="password" value="Your password" className="text-white" />
            </div>
            {formik.touched.password && formik.errors.password
              ? <p>{formik.errors.password}</p> : null}
            <TextInput
              name="password"
              type="password"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="confirmPassword" value="Confirm password" className="text-white" />
            </div>
            {formik.touched.confirmPass && formik.errors.confirmPass
              ? <p>{formik.errors.confirmPass}</p> : null}
            <TextInput
              name="confirmPass"
              type="password"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPass}
            />
          </div>
          <div className="w-full my-2">
            {loading ? <Button isProcessing type="submit" gradientDuoTone="purpleToBlue" outline>Signup</Button>
              : <Button type="submit" gradientDuoTone="purpleToBlue" outline>Signup</Button>}
          </div>
        </form>
        <div className="flex justify-between text-sm font-medium text-gray-200">
          Already registered?&nbsp;
          <div
            role="button"
            tabIndex={0}
            className=" hover:underline cursor-pointer text-cyan-400 "
            onClick={goToLogin}
            onKeyDown={handleKeyPress}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
