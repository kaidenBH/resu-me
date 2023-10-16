import React, { useEffect } from 'react';
import Profile from './Profile';
import ResumesPage from '../resumes/ResumesPage';
import { useAuth } from '../../components/context/AuthContext';
import { Box, Grid } from '@mui/material';

function Home() {
	const { checkUser } = useAuth();
	useEffect(() => {
		checkUser();
	}, []);
	return (
		<>
			<Profile />
			<ResumesPage />
		</>
	);
}

export default Home;
