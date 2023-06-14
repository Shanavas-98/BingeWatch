import { userInstance } from "../axios/axiosInstance"

export const userLogin=(values)=>{
    return userInstance("userJwt").post('/login',{...values})
}

export const userSignup = (values)=>{
    return userInstance("userJwt").post('/register',{...values})
}

export const verifyOtp=(otp)=>{
    return userInstance("userJwt").post('/verifyOtp',{otp})
}
