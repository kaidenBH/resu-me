import React, { useState } from 'react'
import SignUp, { SignUpFormData } from "./pages/sign-Up-In/SignUp";
import SignIn, { SignInFormData } from "./pages/sign-Up-In/SignIn";
import './App.css'

const App: React.FC = () => {

  const handleSignUp = (formData: SignUpFormData) => {
    // Handle form submission logic here
    console.log(formData);
  };
  const SignInFormData = (formData: SignInFormData) => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <h1>Sign In</h1>
      <SignIn onSubmit={SignInFormData} />
    </>
  )
}

export default App
