import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import ResumesPage from '../resumes/ResumesPage';
import { useAuth } from '../../components/context/AuthContext';
import { useResume } from '../../components/context/ResumeContext';
import { Box, Grid, Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useMediaQuery from '@mui/material/useMediaQuery';

function Home() {
	const { checkUser } = useAuth();
	const { getAllResumes } = useResume();
	const [anchorEl, setAnchorEl] = useState(null);

	const dorpMenu = useMediaQuery('(max-width:900px)');

	const isMdScreen = useMediaQuery('(min-width:700px)');
	const isSmScreen = useMediaQuery('(min-width:590px)');
	const isXsScreen = useMediaQuery('(min-width:430px)');

	const getWidth = () => {
		if (isMdScreen) return '40vw';
		if (isSmScreen) return '50vw';
		if (isXsScreen) return '80vw';
		return '90vw'; // Default width (adjust as needed)
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
				{!dorpMenu ? (
					<Grid item md={4} lg={3}>
						<Profile />
					</Grid>
				) : (
					<Grid item md={4} lg={2.5}>
						<IconButton onClick={handleClick}>
							<MoreVertIcon
								sx={{
									color: '#6499E9',
									fontSize: 50,
									cursor: 'pointer',
								}}
							/>
						</IconButton>
						<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
							<MenuItem
								sx={{
									padding: 0,
									width: getWidth(),
									position: 'fixed',
								}}
							>
								<Profile />
							</MenuItem>
						</Menu>
					</Grid>
				)}
				<Grid item md={dorpMenu ? 12 : 8} lg={dorpMenu ? 12 : 9}>
					<ResumesPage />
				</Grid>
			</Grid>
		</Box>
	);
}

export default Home;
