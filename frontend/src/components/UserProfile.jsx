import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { DoneAll, Edit } from '@mui/icons-material';
import { getUserDetails, updateUserAvatar, updateUserDetails } from '../services/userApi';

export default function UserProfile() {
  const [userData, setuserData] = useState(null);
  const [image, setImage] = useState();
  const initialValues = {};

  // fetching the user details
  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setuserData(res.data);
        initialValues.fullName = res.data?.fullName;
      })
      .catch((error) => {
        toast(error.message, { position: 'top-center' });
      });
  }, []);

  // validation
  const validate = Yup.object({
    fullName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('First Name Required'),
  });

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema: validate,
    onSubmit: async (values) => {
      updateUserDetails(values)
        .then((response) => {
          toast.success(response.data?.message, {
            position: 'top-center',
          });
          setuserData({ ...userData, fullName: values?.fullName });
        })
        .catch((error) => {
          toast.error(error.message, {
            position: 'top-center',
          });
        });
    },
  });
  const handleImage = async (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/;
    if (!allowedExtensions.exec(file?.name)) {
      toast.error('Format is not supported');
    } else {
      const formData = new FormData();
      formData.append('photo', file);
      // updating the state
      setImage(file);
      try {
        await updateUserAvatar(formData);
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    }
  };
  return (
    <div className="md:flex  no-wrap md:-mx-2 ">
      {/* Left Side */}
      <div className="w-full md:w-3/12 md:mx-2 rounded-md h-full">
        {/* Profile Card */}
        <div className="p-3 rounded-md border border-l-2 border-r-2 border-b-2 border-t-4 border-green-400">
          <div className="image overflow-hidden relative">
            <img
              alt="profile"
              className="h-48 w-48 object-cover mx-auto rounded-full"
              src={!image ? userData?.picture?.url : URL.createObjectURL(image)}
            />
            <div className="ab bg-green-500 text-xs absolute bottom-1 right-4 font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left hover:bg-gray-300 hover:text-gray-600  overflow-hidden cursor-pointer">
              <input type="file" name="photo" className="absolute inset-0  opacity-0 cursor-pointer" onChange={handleImage} />
              <Edit />
            </div>
          </div>
          <h1 className="text-gray-100 font-bold text-xl leading-8 my-1">{userData?.fullName}</h1>
          <ul className=" text-gray-100 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              {userData?.blocked
                ? <span className="ml-auto"><span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Blocked</span></span>
                : <span className="ml-auto"><span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>}
            </li>
          </ul>
          <ul className=" text-gray-100 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

            <li className="flex items-center py-3">
              <span>Member since</span>
              <span className="ml-auto">{new Date(userData?.createdAt).toString().slice(0, 16)}</span>
            </li>
          </ul>
        </div>
        <div className="my-4" />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-9/12  ">
        {/* Profile tab */}
        {/* About Section */}
        <div className=" p-3 shadow-sm rounded-md h-full ">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-green-500">
              <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="tracking-wide text-white">About</span>
          </div>
          <div className="text-gray-100 p-5">
            <div className="grid md:grid-cols-2 text-sm gap-2">
              <div className="grid ">
                <div className=" py-2  font-semibold">Full Name</div>
                <input
                  className="mt-2 border-2 border-gray-200 bg-slate-700 block w-full rounded-lg text-base text-gray-100 focus:outline-none focus:border-indigo-500"
                  type="text"
                  value={formik.values.fullName}
                  name="fullName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="text-red-500 mt-1">{formik.errors.fullName}</div>
                ) : null}
              </div>

              <div className="grid mt-4 ">
                <div className=" py-2  font-semibold">Email</div>
                <div className="flex justify-between ">
                  <div>
                    {userData?.email}
                  </div>
                  <div className="w-8 h-8 text-green-600 border-2 flex justify-center items-center rounded-full border-green-600">
                    <DoneAll />
                  </div>
                </div>
              </div>

              <div className="grid mt-4 ">
                <div className=" py-2  font-semibold">Mobile</div>
                <div className="flex justify-between ">
                  <div>
                    {userData?.mobile}
                  </div>
                  <div className="w-8 h-8 text-green-600 border-2 flex justify-center items-center rounded-full border-green-600">
                    <DoneAll />
                  </div>
                </div>
              </div>

            </div>
            <div className="flex justify-end mt-16">
              <button
                type="button"
                className="w-full md:w-32 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => formik.handleSubmit()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
