import React, { useEffect, useState } from 'react';
import { Grow, Paper, Typography, Button, Grid, Box, IconButton, TextField } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckIcon from '@mui/icons-material/Check';

const ResumesPage: React.FC = () => {
	const { allResumes, getAllResumes, navigateResume, createResume } = useResume();
	const [newTextField, setNewTextiField] = useState(false);
	const [resumeTitle, setResumeTile] = useState('');
	const [loadingNewResume, setLoadingNewResume] = useState(false);
	const [resumeLoading, setResumeLoading] = useState(false);

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setResumeTile(value);
	};
	const handleAddResume = async () => {
		setLoadingNewResume(true);
		await createResume(resumeTitle);
		setNewTextiField(false);
		setLoadingNewResume(false);
	};
	useEffect(() => {
		const ApiCall = async () => {
			await getAllResumes();
		};
		ApiCall();
	}, []);

	const handleViewResume = (resumeId: string) => {
		navigateResume(resumeId);
	};

	return (
		<Grow in={true}>
			<Box>
				<Typography
					variant="h2"
					sx={{ color: 'white', position: 'absolute', top: 10, left: 400 }}
				>
					My Resumes
				</Typography>
				<Grid container spacing={2} sx={{ marginLeft: '320px', marginTop: '16px' }}>
					{allResumes &&
						allResumes.map((resume) => (
							<Grid item key={resume._id} sm={8} md={6}>
								<Paper style={{ padding: '16px', marginBottom: '16px' }}>
									<Typography variant="h5">{resume.title}</Typography>
									<Button
										variant="contained"
										color="primary"
										onClick={() => handleViewResume(resume._id)}
									>
										View Resume
									</Button>
								</Paper>
							</Grid>
						))}
					<Grid item sm={8} md={6}>
						<Paper style={{ padding: '16px', marginBottom: '16px' }}>
							{newTextField ? (
								<>
									<TextField
										fullWidth
										label="Resume Title"
										variant="filled"
										value={resumeTitle}
										onChange={handleChangeTitle}
									/>
									{loadingNewResume ? (
										<img
											src={'/loading.svg'}
											alt="My SVG"
											style={{ height: '3rem' }}
										/>
									) : (
										<IconButton
											onClick={handleAddResume}
											sx={{ '&:focus': { outline: 'none' } }}
										>
											<CheckIcon
												sx={{
													color: '#6499E9',
													fontSize: 30,
													cursor: 'pointer',
												}}
											/>
										</IconButton>
									)}
								</>
							) : (
								<IconButton
									onClick={() => setNewTextiField(true)}
									sx={{ '&:focus': { outline: 'none' } }}
								>
									<AddBoxIcon
										sx={{
											color: '#6499E9',
											fontSize: 50,
											cursor: 'pointer',
										}}
									/>
								</IconButton>
							)}
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Grow>
	);
};

export default ResumesPage;
