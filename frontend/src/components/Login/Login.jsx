/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { adminLogin, authAdmin } from '../../services/adminApi';
import { authUser, userLogin } from '../../services/userApi';
import { setUserDetails } from '../../redux/features/userSlice';
import { setAdminDetails } from '../../redux/features/adminSlice';

function Login({ userType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userType === 'admin') {
      authAdmin().then((response) => {
        if (response.data.status) navigate('/admin/dashboard');
      });
    } else if (userType === 'user') {
      authUser().then((response) => {
        if (response.data.status) navigate('/');
      });
    }
  });

  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (values) => {
    try {
      if (userType === 'user') {
        const { data } = await userLogin(values);
        if (data.token) {
          localStorage.setItem('userJwt', data.token);
          dispatch(setUserDetails({ ...data.user }));
          navigate('/');
        } else {
          throw Error(data.error);
        }
      } else if (userType === 'admin') {
        const { data } = await adminLogin(values);
        if (data.token) {
          localStorage.setItem('adminJwt', data.token);
          dispatch(setAdminDetails({ ...data.admin }));
          navigate('/admin/dashboard');
        } else {
          throw Error(data.error);
        }
      }
    } catch (err) {
      toast.error(err, {
        position: 'top-center',
      });
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <div className="grid h-screen place-items-center">
      <div className=" border-2 border-white m-2 p-5 rounded-lg">
        <h2 className="text-2xl font-medium text-white">
          Login
        </h2>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-60 gap-4"
        >

          <Label htmlFor="email" value="Email" className="text-white" />
          <TextInput
            type="text"
            name="email"
            className="dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <Label htmlFor="password" value="Password" className="text-white" />
          <TextInput
            type="password"
            name="password"
            className="dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="w-full my-2">
            <Button type="submit" gradientDuoTone="purpleToBlue" outline>Login</Button>
          </div>
        </form>
        <div className="flex justify-between text-sm font-medium text-gray-300">
          Not registered?&nbsp;
          <p
            className=" hover:underline cursor-pointer text-cyan-500 "
            onClick={() => navigate('/register')}
          >
            Register now
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
