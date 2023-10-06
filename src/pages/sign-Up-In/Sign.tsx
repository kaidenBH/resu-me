import React from 'react';
import { Box } from '@mui/material';
import SignUp, { SignUpFormData } from "./SignUp";
import SignIn, { SignInFormData } from "./SignIn";

const Sign = () => {
  const SignUpFormData = (formData: SignUpFormData) => {
    // Handle form submission logic here
    console.log(formData);
  };
  const SignInFormData = (formData: SignInFormData) => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <Box sx={{ display: 'flex', padding: 0 }} >
      <SignIn onSubmit={SignInFormData} />
      <SignUp onSubmit={SignUpFormData} />
    </Box>
  );
};

export default Sign;
