import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Box } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import SignUp, { SignUpFormData } from "./SignUp";
import SignIn, { SignInFormData } from "./SignIn";
import Slider from "./Slider";
import './sliderEffect.css';

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
    <Box sx={{ display: 'flex', padding: 0 }}>
      <TransitionGroup>
        {haveAccount ? (
          <CSSTransition
            key="slider-signin"
            timeout={500}
            classNames="slide"
          >
            <Slider onSubmit={() => SlideEffect()} haveAccount={haveAccount} />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="sign-up"
            timeout={500}
            classNames="slide"
          >
            <SignUp onSubmit={SignUpFormData} />
          </CSSTransition>
        )}
      </TransitionGroup>
      <Slider onSubmit={() => SlideEffect()} haveAccount={haveAccount} />
    </Box>
  );
};

export default Sign;
