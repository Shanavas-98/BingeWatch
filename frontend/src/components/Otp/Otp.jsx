import React, { useEffect } from 'react';
import {
  Button, FormLabel, HStack, Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOtp, verifyOtp } from '../../services/userApi';
import useCountdown from '../../hooks/useCountdown';

function Otp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.otp) {
        errors.otp = 'OTP required';
      }
      const pattern = /^\d{6}$/;
      if (!pattern.test(values.otp)) {
        errors.otp = 'Enter 6-digit OTP';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        const otp = parseInt(values.otp, 10);
        const { data } = await verifyOtp(otp);
        if (!data?.status) {
          throw Error(data?.message);
        } else {
          localStorage.setItem('userInfo', JSON.stringify(data?.userData));
          navigate('/');
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    },
  });
  const { secLeft, setTimer } = useCountdown();
  useEffect(() => {
    setTimer(30);
  }, []);
  const resendOtp = async () => {
    setTimer(30);
    const { data } = await sendOtp();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
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
          <HStack spacing={6}>
            <Button
              isDisabled={secLeft > 0}
              onClick={resendOtp}
            >
              Resend
              {secLeft > 0 && (secLeft < 10 ? ` (0${secLeft}s)` : ` (${secLeft}s)`)}
            </Button>
            <Button type="submit" outline className="my-2">Submit</Button>
          </HStack>
        </form>
      </div>
    </div>
  );
}

export default Otp;
