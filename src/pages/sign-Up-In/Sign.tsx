import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import SignUp, { SignUpFormData } from "./SignUp";
import SignIn, { SignInFormData } from "./SignIn";
import Slider from "./Slider";

const Sign = () => {
  const { signIn, signUp } = useAuth();
  const [haveAccount, setHaveAccount] = useState(true);

  const SignUpFormData = async (formData: SignUpFormData) => {
    await signUp(formData);
  };
  const SignInFormData = async (formData: SignInFormData) => {
    // Handle form submission logic here
    await signIn(formData);
  };
  const SlideEffect = () => {
    setHaveAccount(!haveAccount);
    console.log("Button clicked", haveAccount);
  };
  return (
    <Box sx={{ display: 'flex', padding: 0 }} >
      <Slider onSubmit={() => SlideEffect()} haveAccount={haveAccount} />
      {haveAccount ? (
        <>
          <SignIn onSubmit={SignInFormData} />
        </>
      ) : (
        <>
          <SignUp onSubmit={SignUpFormData} />
        </>
      )}
    </Box>
  );
};

export default Sign;
