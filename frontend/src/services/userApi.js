import { userInstance } from '../axios/axiosInstance';

export const userLogin = (values) => userInstance.post('/login', { ...values });

export const userSignup = (values) => userInstance.post('/register', { ...values });

export const verifyOtp = (otp) => userInstance.post('/verifyOtp', { otp });

export const userAuth = () => userInstance.get('/auth-user');
