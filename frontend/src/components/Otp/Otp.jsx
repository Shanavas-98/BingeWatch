import React from 'react';
import { Button, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyOtp } from '../../services/userApi';

function Otp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.otp) {
        errors.otp = 'otp required';
      }
      const pattern = /^\d{6}$/;
      if (!pattern.test(values.otp)) {
        errors.otp = 'Enter a 6-digit number';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const otp = parseInt(values.otp, 10);
        const { data } = await verifyOtp(otp);
        if (!data.status) {
          throw Error(data.message);
        } else {
          localStorage.setItem('userJwt', data.token);
          navigate('/');
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    },
  });
  return (
    <div className="grid h-screen place-items-center">
      <div className=" border-2 border-white m-2 p-5 rounded-lg">

        <h3 className="text-xl font-medium text-white">
          Verify OTP
        </h3>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="w-60 gap-4"
        >
          <div>
            <div className="mb-2 block">
              <FormLabel>Enter OTP</FormLabel>
            </div>
            {formik.touched.otp && formik.errors.otp ? <p className="text-red-500">{formik.errors.otp}</p> : null}
            <Input
              name="otp"
              type="tel"
              className="dark"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
          </div>
          <Button type="submit" outline className="my-2">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default Otp;
