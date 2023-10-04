import React, { useState } from 'react'
import SignUp, { SignUpFormData } from "./pages/sign-Up-In/SignUp";
import './App.css'

const App: React.FC = () => {

  const handleSignUp = (formData: SignUpFormData) => {
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <SignUp onSubmit={handleSignUp} />
    </>
  )
}

export default App
