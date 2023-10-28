import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Check, DoneAll, Edit } from '@mui/icons-material';
import { Button, IconButton } from '@chakra-ui/button';
import {
  HStack, Input, Text,
} from '@chakra-ui/react';
import {
  getUserDetails, sendOtp, sendVerifyEmail, updateEmail, updateMobile, updateName, updatePicture,
} from '../services/userApi';
import { AVATAR } from '../axios/apiUrls';

export default function UserProfile() {
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editMobile, setEditMobile] = useState(false);
  const [emailOk, setEmailOk] = useState(false);
  const [mobileOk, setMobileOk] = useState(false);
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState();

  // fetching the user details
  useEffect(() => {
    async function getUserData() {
      try {
        const { data } = await getUserDetails();
        const {
          picture, fullName, email, mobile, emailVerified, mobileVerified,
        } = data;
        setImageUrl(picture?.url);
        setEmailOk(emailVerified);
        setMobileOk(mobileVerified);
        setName(fullName);
        setEmailId(email);
        setPhone(mobile);
      } catch (error) {
        toast(error.message, { position: 'top-center' });
      }
    }
    getUserData();
  }, []);

  const nameValidation = Yup.object({
    name: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(30, 'Must be 30 characters or less')
      .required('Name Required'),
  });

  const emailValidation = Yup.object({
    emailId: Yup.string()
      .trim('no trailing spaces')
      .strict(true)
      .email('Invalid email address')
      .required('Email Required'),
  });

  const phoneValidation = Yup.object({
    phone: Yup.string()
      .matches(/^[5-9]{1}[0-9]{9}$/, 'Invalid mobile number')
      .required('Mobile is required'),
  });

  const validateField = async (value, validationSchema, fieldName) => {
    try {
      await validationSchema.validate({ [fieldName]: value }, { abortEarly: false });
      return null; // Validation successful
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      return validationErrors;
    }
  };

  const handleImage = async (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/;
    if (!allowedExtensions.exec(file?.name)) {
      toast.error('Format is not supported');
    } else {
      try {
        const formData = new FormData();
        formData.append('photo', file);
        // updating the state
        setImage(file);
        await updatePicture(formData);
      } catch (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      }
    }
  };

  const handleName = async () => {
    const validationErrors = await validateField(name, nameValidation, 'name');
    if (validationErrors) {
      setErr(validationErrors);
    } else {
      const { data } = await updateName(name);
      if (data.success) {
        setEditName(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleEmail = async () => {
    const validationErrors = await validateField(emailId, emailValidation, 'emailId');
    if (validationErrors) {
      setErr(validationErrors);
    } else {
      const { data } = await updateEmail(emailId);
      if (data?.link) {
        toast.success('verify link send to your email');
      }
      if (data.success) {
        setEditEmail(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    }
  };
  const handleMobile = async () => {
    const validationErrors = await validateField(phone, phoneValidation, 'phone');
    if (validationErrors) {
      setErr(validationErrors);
    } else {
      const { data } = await updateMobile(phone);
      if (data.success) {
        setEditMobile(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      if (data?.otp) {
        navigate(`/verify-otp/${phone}`);
        toast.success('otp send to your mobile');
      }
    }
  };
  const sendLink = async () => {
    try {
      const { data } = await sendVerifyEmail(emailId);
      if (data.success) {
        toast.success('click on the link send to your email');
      } else {
        throw Error('something went wrong');
      }
    } catch (error) {
      toast.error(error.messsage);
    }
  };
  const resendOtp = async () => {
    try {
      const { data } = await sendOtp(phone);
      if (data.success) {
        navigate(`/verify-otp/${phone}`);
        toast.success(data.message);
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-3 rounded-md border border-l-2 border-r-2 border-b-2 border-t-4 border-green-400">
      <div className="image overflow-hidden relative">
        <img
          alt="profile"
          className="h-48 w-48 object-cover mx-auto rounded-full"
          src={!image ? (imageUrl || AVATAR) : URL.createObjectURL(image)}
        />
        <div className="ab bg-green-500 text-xs absolute bottom-1 right-4 font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left hover:bg-gray-300 hover:text-gray-600  overflow-hidden cursor-pointer">
          <input type="file" name="photo" className="absolute inset-0  opacity-0 cursor-pointer" onChange={handleImage} />
          <Edit />
        </div>
      </div>

      {!editName
        ? (
          <HStack justifyContent="space-between" m={2}>
            <Text>{name}</Text>
            <IconButton aria-label="Edit Name" isRound onClick={() => setEditName(true)} icon={<Edit />} />
          </HStack>
        )
        : (
          <>
            <HStack m={2}>
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <IconButton aria-label="Save Name" onClick={handleName} isRound icon={<Check />} />
            </HStack>
            {err && err.name && <p className="text-red-500">{err.name}</p>}
          </>
        )}
      {!editEmail
        ? (
          <HStack justifyContent="space-between" m={2}>
            <Text>{emailId}</Text>
            <HStack>
              {emailOk ? <DoneAll /> : <Button onClick={sendLink}>Verify</Button>}
              <IconButton aria-label="Edit Email" isRound onClick={() => setEditEmail(true)} icon={<Edit />} />
            </HStack>
          </HStack>
        )
        : (
          <>
            <HStack m={2}>
              <Input
                name="emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <IconButton aria-label="Save Name" onClick={handleEmail} isRound icon={<Check />} />
            </HStack>
            {err && err.emailId && <p className="text-red-500">{err.emailId}</p>}
          </>
        )}
      {!editMobile
        ? (
          <HStack justifyContent="space-between" m={2}>
            <Text>{phone}</Text>
            <HStack>
              {mobileOk ? <DoneAll /> : <Button onClick={resendOtp}>Verify</Button>}
              <IconButton aria-label="Edit Mobile" isRound onClick={() => setEditMobile(true)} icon={<Edit />} />
            </HStack>
          </HStack>
        )
        : (
          <>
            <HStack m={2}>
              <Input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <IconButton aria-label="Save Name" onClick={handleMobile} isRound icon={<Check />} />
            </HStack>
            {err && err.phone && <p className="text-red-500">{err.phone}</p>}
          </>
        )}
    </div>
  );
}
