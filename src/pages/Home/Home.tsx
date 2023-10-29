import React, { useEffect } from 'react';
import Profile from './Profile';
import ResumesPage from '../resumes/ResumesPage';
import { useAuth } from '../../components/context/AuthContext';
import { useResume } from '../../components/context/ResumeContext';
import { Box, Grid } from '@mui/material';

function Home() {
	const { checkUser } = useAuth();
	const { getAllResumes } = useResume();
	
	useEffect(() => {
		checkUser();
		const ApiCall = async () => {
			await getAllResumes();
		};
		ApiCall();
	}, []);

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={2.5}>
					<Profile />
				</Grid>
				<Grid item xs={9.5}>
					<ResumesPage />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Home;
