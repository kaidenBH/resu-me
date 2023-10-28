import React, { useEffect, useState } from 'react';
import { Grow, Paper, Typography, Button, Grid, Box } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';
import { useParams } from 'react-router-dom';
import ResumeEditPage from './resumeComponents/ResumeEditPage';
import * as Templates from './resumeTemplates/index';

const Resume: React.FC = () => {
	const { resume, getResume, activeTemplate } = useResume();
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
				<Box sx={{ display: 'flex', padding: 0 }}>
					{resume?.owner? (
						<ResumeEditPage />
					):( null )}
					{resume?.template === 'Simple'? (
						<Templates.Simple/>
					) : (null)}
				</Box>
			)}
		</Grow>
	);
};

export default Resume;
