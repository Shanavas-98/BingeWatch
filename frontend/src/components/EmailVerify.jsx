import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Box, Button, Heading, Text,
} from '@chakra-ui/react';
import { verifyEmail } from '../services/userApi';

function EmailVerify() {
  const { token } = useParams();
  const [success, setSuccess] = useState(false);
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function verify(jwt) {
      try {
        const { data } = await verifyEmail(jwt);
        setSuccess(data?.success);
        setExpired(data?.expired);
        if (data?.success) {
          toast.success(data?.message);
        } else {
          throw Error(data?.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    verify(token);
  }, []);
  return (
    <Box
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Email Verification</Heading>
      {success
        ? (
          <>
            <Text>Email verified successfully</Text>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </>
        )
        : (
          <Text>Email verification failed</Text>
        )}
      {expired
      && <Text>Verification link Expired</Text>}
    </Box>
  );
}

export default EmailVerify;
