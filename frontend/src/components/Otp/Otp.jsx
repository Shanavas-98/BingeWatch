import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { verifyOtp } from '../../services/userApi';
import { toast } from "react-toastify"



function Otp() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            otp: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.otp) {
                errors.otp = "otp required";
            }
            return errors;
        },
        onSubmit: async (values) => {
            try {
                const otp = parseInt(values.otp);
                const { data } = await verifyOtp(otp)
                if (!data.status) {
                    throw Error(data.message);
                } else {
                    localStorage.setItem("userJwt", data.token);
                    navigate("/")
                }
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center"
                })
            }
        }
    })
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Verify OTP
            </h3>
            <form action='' onSubmit={formik.handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="otp" value="Enter OTP" />
                    </div>
                    {formik.touched.otp && formik.errors.otp ? <p>{formik.errors.otp}</p> : null}
                    <TextInput
                        name="otp"
                        type='tel'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.otp}
                    />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default Otp