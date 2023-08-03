import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, Label, TextInput } from 'flowbite-react';
import { toast } from 'react-toastify';

import { adminAuth, adminLogin } from '../../services/adminApi';
import { userAuth, userLogin } from '../../services/userApi';
import { setUserDetails } from '../../redux/features/userSlice';
import { setAdminDetails } from '../../redux/features/adminSlice';

function Login({ userType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userType === 'admin') {
      adminAuth().then((res) => {
        if (res.data.success) {
          navigate('/admin/dashboard');
        }
      });
    } else if (userType === 'user') {
      userAuth().then((res) => {
        if (res.data.success) {
          navigate('/');
        }
      });
    }
  }, []);

  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (values) => {
    try {
      if (userType === 'user') {
        const { data } = await userLogin(values);
        const { token, user } = data;
        if (token) {
          localStorage.setItem('userJwt', token);
          dispatch(setUserDetails({ ...user }));
          navigate('/');
        } else {
          throw Error(data.error);
        }
      } else if (userType === 'admin') {
        const { data } = await adminLogin(values);
        const { token, admin } = data;
        if (token) {
          localStorage.setItem('adminJwt', token);
          dispatch(setAdminDetails({ ...admin }));
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
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      navigate('/register');
    }
  };
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
          <div
            role="button"
            tabIndex={0}
            className=" hover:underline cursor-pointer text-cyan-500 "
            onClick={() => navigate('/register')}
            onKeyDown={handleKeyPress}
          >
            Register now
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  userType: PropTypes.string.isRequired,
};

export default Login;
