import { adminInstance } from '../axios/axiosInstance';

export const adminLogin = (values) => adminInstance.post('/login', { ...values });

export const adminSignup = (values) => adminInstance.post('/register', { ...values });

export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });

export const authAdmin = () => adminInstance.get('/auth-admin');
