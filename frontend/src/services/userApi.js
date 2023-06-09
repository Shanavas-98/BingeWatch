import { userInstance } from "../axios/axiosInstance"

export const userLogin=(values)=>{
    return userInstance.post('/login',{...values})
}

export const userSignup = (values)=>{
    return userInstance.post('/register',{...values})
}

export const verifyOtp=(otp)=>{
    return userInstance.post('/verify',{otp: otp})
}