import React, { useEffect } from 'react';
import Profile from './Profile';
import { useAuth } from '../../components/context/AuthContext';

function Home() {
  const { checkUser } = useAuth();
  useEffect(() => {
    checkUser();
  }, []);
  return (
      <Profile />
  )
}

export default Home;
