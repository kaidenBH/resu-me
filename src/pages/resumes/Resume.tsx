import React, { useEffect, useState } from 'react';
import { Grow, Paper, Typography, Button, Grid, Box } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';
import { useParams } from 'react-router-dom';

const Resume: React.FC = () => {
	const { resume, getResume } = useResume();
	const [resumeLoading, setResumeLoading] = useState(false);
	const { resumeId } = useParams();

	useEffect(() => {
		const ApiCall = async () => {
			setResumeLoading(true);
			await getResume(resumeId!);
			setResumeLoading(false);
		};
		ApiCall();
	}, [resumeId]);

	return (
		<Grow in={true}>
			{resumeLoading ? (
				<img src={'/loading.svg'} alt="My SVG" style={{ height: '15rem' }} />
			) : (
				<Typography variant="h1">HELLO</Typography>
			)}
		</Grow>
	);
};

export default Resume;
