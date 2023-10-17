import React, { useEffect, useState } from 'react';
import { Grow, Paper, Typography, Button, Grid, Box } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';

const ResumesPage: React.FC = () => {
	const { allResumes, getAllResumes, navigateResume } = useResume();
	const [resumeLoading, setResumeLoading] = useState(false);

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
				</Grid>
			</Box>
		</Grow>
	);
};

export default ResumesPage;
