import React, { useEffect, useState } from 'react';
import { Grow, Grid } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';
import { useParams } from 'react-router-dom';
import ResumeEditPage from './resumeComponents/ResumeEditPage';
import * as Templates from './resumeTemplates/index';

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
			<Grid container>
				{resumeLoading ? (
					<Grid
						item
						xs={12}
						sx={{
							height: '100vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<img src={'/loading.svg'} alt="My SVG" style={{ height: '15rem' }} />
					</Grid>
				) : (
					<>
						{resume?.owner && (
							<Grid item xs={12} sm={6}>
								<ResumeEditPage />
							</Grid>
						)}
						{resume?.template === 'Simple' && (
							<>
								<Grid
									item
									xs={12}
									sm={resume?.owner ? 6 : 12}
									sx={{
										padding: '0 0 0 16px',
										height: '100vh',
										marginTop: '8px',
										overflow: 'scroll',
										'&::-webkit-scrollbar': {
											width: '0 !important' /* Hide the scrollbar for WebKit */,
										},
									}}
								>
									<Templates.Simple />
								</Grid>
							</>
						)}
					</>
				)}
			</Grid>
		</Grow>
	);
};

export default Resume;
