import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  Box, Button, Flex, FormControl, FormLabel, HStack, Input, Text,
} from '@chakra-ui/react';

import useCountdown from '../../hooks/useCountdown';
import { newOtp, setNewPassword } from '../../services/userApi';

function Forgot() {
  const navigate = useNavigate();
  const initialValues = {
    mobile: '',
    otp: '',
    newPass: '',
    confirmPass: '',
  };
  const validationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[5-9]{1}[0-9]{9}$/, 'Invalid mobile number')
      .required('Mobile is required'),
    otp: Yup.string()
      .matches(/^\d{6}$/, 'Enter 6-digit OTP')
      .required('OTP is required'),
    newPass: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,20}$/,
        'Password must contain uppercase,lowercase,special characters,numbers',
      )
      .required('Password is Required'),
    confirmPass: Yup.string()
      .oneOf([Yup.ref('newPass'), null], 'Passwords must match')
      .required('Confirm Password is Required '),
  });
  const onSubmit = async (values) => {
    try {
      const { data } = await setNewPassword(values);
      if (data?.success) {
        toast.success(data.message, {
          position: 'top-center',
        });
        navigate('/login');
      } else {
        throw Error(data?.message);
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
  const { secLeft, setTimer } = useCountdown();
  const resendOtp = async (phone) => {
    setTimer(30);
    const { data } = await newOtp(phone);
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <Flex align="center">
      <Box maxW="sm" borderWidth={2} rounded="lg" overflow="hidden" m={10} px={10}>
        <Text fontSize="3xl" my={5}>Forgot Password</Text>
        <FormControl>
          <FormLabel>Mobile Number</FormLabel>
          {formik.touched.mobile && formik.errors.mobile ? <p className="text-red-500">{formik.errors.mobile}</p> : null}
          <Input
            id="mobile"
            type="tel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          <FormLabel>OTP</FormLabel>
          {formik.touched.otp && formik.errors.otp ? <p className="text-red-500">{formik.errors.otp}</p> : null}
          <HStack spacing={2}>
            <Input
              id="otp"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
            />
            <Button
              isDisabled={secLeft > 0}
              onClick={() => resendOtp(formik.values.mobile)}
            >
              Send
              {secLeft > 0 && (secLeft < 10 ? ` (0${secLeft}s)` : ` (${secLeft}s)`)}
            </Button>
          </HStack>
          <FormLabel>New Password</FormLabel>
          {formik.touched.newPass && formik.errors.newPass
            ? <p className="text-red-500">{formik.errors.newPass}</p> : null}
          <Input
            id="newPass"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPass}
          />
          <FormLabel>Confirm Password</FormLabel>
          {formik.touched.confirmPass && formik.errors.confirmPass
            ? <p className="text-red-500">{formik.errors.confirmPass}</p> : null}
          <Input
            id="confirmPass"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPass}
          />
          <Button
            outline
            onClick={formik.handleSubmit}
            my={3}
          >
            Change Password
          </Button>
        </FormControl>
      </Box>
    </Flex>
  );
}

export default Forgot;
