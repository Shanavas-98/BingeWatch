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
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function verify(jwt) {
      try {
        const { data } = await verifyEmail(jwt);
        setSuccess(data?.success);
        setMessage(data?.message);
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
      m={2}
    >
      <Heading>Email Verification</Heading>
      {success
        ? (
          <>
            <Text>
              {message}
            </Text>
            <Button onClick={() => navigate('/login')}>Login</Button>
          </>
        )
        : (
          <Text>
            {message}
          </Text>
        )}
    </Box>
  );
}

export default EmailVerify;
