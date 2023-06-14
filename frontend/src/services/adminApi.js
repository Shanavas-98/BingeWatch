import { adminInstance } from "../axios/axiosInstance"

export const adminLogin=(values)=>{
    return adminInstance("adminJwt").post('/login',{...values})
}

export const adminSignup = (values)=>{
    return adminInstance("adminJwt").post('/register',{...values})
}

export const verifyOtp=(otp)=>{
    return adminInstance("adminJwt").post('/verify',{otp: otp})
}