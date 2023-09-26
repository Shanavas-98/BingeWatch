import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { toast } from 'react-toastify';

import useAuth from '../../hooks/useAuth';
import { adminLogin } from '../../services/adminApi';
import { userLogin } from '../../services/userApi';
import { setUserDetails } from '../../redux/features/userSlice';
import { setAdminDetails } from '../../redux/features/adminSlice';

function Login({ userType }) {
  Login.propTypes = {
    userType: PropTypes.string.isRequired,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    user, setUser, admin, setAdmin,
  } = useAuth();
  const from = location.state?.from?.pathname;
  // if (user || admin) {
  //   if (from) {
  //     navigate(from);
  //   } else if (userType === 'user') {
  //     navigate('/');
  //   } else if (userType === 'admin') {
  //     navigate('/admin/dashboard');
  //   }
  // }
  useEffect(() => {
    if (userType === 'user' && user) {
      navigate(from || '/');
    } else if (userType === 'admin' && admin) {
      navigate(from || '/admin/dashboard');
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
        console.log('user data', data);
        if (data.error) {
          throw Error(data.error);
        } else {
          localStorage.setItem('userJwt', data.token);
          localStorage.setItem('userInfo', JSON.stringify(data));
          setUser(data);
          dispatch(setUserDetails(data));
          if (from) {
            navigate(from, { replace: true });
          } else {
            navigate('/');
          }
        }
      } else if (userType === 'admin') {
        const { data } = await adminLogin(values);
        console.log('admin data', data);
        // const { id, email, token } = data;
        if (data.error) {
          throw Error(data.error);
        } else {
          localStorage.setItem('adminJwt', data.token);
          localStorage.setItem('adminInfo', JSON.stringify(data));
          setAdmin(data);
          dispatch(setAdminDetails(data));
          if (from) {
            navigate(from, { replace: true });
          } else {
            navigate('/admin/dashboard');
          }
        }
      }
    } catch (err) {
      toast.error(err.message, {
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

          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            name="email"
            className="dark"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <FormLabel>Password</FormLabel>
          <Input
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
          Not registered?
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

export default Login;
