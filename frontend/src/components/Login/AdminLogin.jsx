import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import useAuth from '../../hooks/useAuth';
import { adminLogin } from '../../services/adminApi';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, setAdmin } = useAuth();
  const from = location.state?.from?.pathname;
  useEffect(() => {
    if (admin) {
      navigate(from || '/admin/dashboard');
    }
  }, []);
  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = async (values) => {
    try {
      const { data } = await adminLogin(values);
      if (data.error) {
        throw Error(data.error);
      } else {
        localStorage.setItem('adminInfo', JSON.stringify(data));
        setAdmin(data);
        if (from) {
          navigate(from, { replace: true });
        } else {
          navigate('/admin/dashboard');
        }
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
            <Button type="submit" outline>Login</Button>
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

export default AdminLogin;
