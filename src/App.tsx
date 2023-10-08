import React, { useState } from 'react';
import Sign from './pages/sign-Up-In/Sign';
import { UserProvider } from './components/context/AuthContext';
import './App.css'

const App: React.FC = () => {

  return (
    <UserProvider>
      <Sign />
    </UserProvider>
  )
}

export default App
