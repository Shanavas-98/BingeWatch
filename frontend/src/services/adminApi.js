import { adminInstance } from '../axios/axiosInstance';

export const adminLogin = (values) => adminInstance.post('/login', { ...values });

export const adminSignup = (values) => adminInstance.post('/register', { ...values });

export const verifyOtp = (otp) => adminInstance.post('/verify', { otp });

export const adminAuth = () => adminInstance.get('/auth-admin');

export const addMovie = (id) => adminInstance.get(`/add-movie/${id}`);
