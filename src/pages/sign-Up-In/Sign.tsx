import React from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import SignUp, { SignUpFormData } from "./SignUp";
import SignIn, { SignInFormData } from "./SignIn";

const Sign = () => {
  const { signIn, signUp } = useAuth();

  const SignUpFormData = async (formData: SignUpFormData) => {
    await signUp(formData);
  };
  const SignInFormData = async (formData: SignInFormData) => {
    // Handle form submission logic here
    await signIn(formData);
  };

  return (
    <Box sx={{ display: 'flex', padding: 0 }} >
      <SignIn onSubmit={SignInFormData} />
      <SignUp onSubmit={SignUpFormData} />
    </Box>
  );
};

export default Sign;
