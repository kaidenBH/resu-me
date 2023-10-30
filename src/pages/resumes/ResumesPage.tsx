import React, { useEffect, useState } from 'react';
import { Grow, Paper, Typography, Button, Grid, Box, IconButton, TextField } from '@mui/material';
import { useResume } from '../../components/context/ResumeContext';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DeleteOutline } from '@mui/icons-material';
import AlertDialog from './resumeComponents/Dialog';

const ResumesPage: React.FC = () => {
	const { allResumes, navigateResume, createResume, removeResume, duplicateResume } = useResume();
	const [resumeTitle, setResumeTile] = useState('');
	const [loadingNewResume, setLoadingNewResume] = useState(false);
	const [deletionDialog, setDeletionDialog] = useState(false);
	const [deletionIndex, setDeletionIndex] = useState(0);
	const [resumeLoading, setResumeLoading] = useState(allResumes?.map(() => false) || [false]);

	const toggleLoading = (index: number) => {
		setResumeLoading((prevDetails) => {
			const newDetails = [...prevDetails];
			newDetails[index] = !newDetails[index];
			return newDetails;
		});
	};

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setResumeTile(value);
	};
	const handleAddResume = async () => {
		setLoadingNewResume(true);
		await createResume(resumeTitle);
		setLoadingNewResume(false);
	};
	const popDialog = (index: number) => {
		setDeletionDialog(true);
		setDeletionIndex(index);
	}

	const handleDuplicating = async (resumeIndex: number) => {
		if (allResumes && allResumes[resumeIndex]) {
			toggleLoading(resumeIndex);
			await duplicateResume(allResumes[resumeIndex]._id);
			toggleLoading(resumeIndex);
		}
	}

	const handleDeletion = async () => {
		if (allResumes && allResumes[deletionIndex]) {
			toggleLoading(deletionIndex);
			setDeletionDialog(false);
			await removeResume(allResumes[deletionIndex]._id);
			toggleLoading(deletionIndex);
		}
	}

	const handleViewResume = (resumeId: string) => {
		navigateResume(resumeId);
	};

	return (
		<Grow in={true}>
			<Grid container spacing={6} sx={{ margin: '1rem' }}>
				<Grid item xs={12}>
					<Typography
						variant="h4"
						sx={{ color: 'white' }}
					>
						My Resumes
					</Typography>
				</Grid>
				<Grid item xs={12} container spacing={2} sx={{ marginRight: '5rem' }}>
					<Grid item xs={6} sm={4} lg={3}>
						<Paper style={{ padding: '8px' }}>
							<Box sx={{ height: '13rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
								<Typography variant='h6' sx={{ marginBottom: '16px' }}>New Resume: </Typography>
								<TextField
									fullWidth
									label="Resume Title"
									variant="filled"
									color='secondary'
									value={resumeTitle}
									onChange={handleChangeTitle}
									required
								/>
								{loadingNewResume ? (
									<img
										src={'/loading.svg'}
										alt="My SVG"
										style={{ height: '5rem' }}
									/>
								) : (
									<IconButton
										onClick={handleAddResume}
										sx={{ '&:focus': { outline: 'none' } }}
										disabled={resumeTitle === ''}
									>
										<AddBoxIcon
											sx={{
												color: resumeTitle !== '' ? '#6499E9' : '#ccc',
												fontSize: 50,
												cursor: 'pointer',
											}}
										/>
									</IconButton>
								)}
							</Box>
						</Paper>
					</Grid>
					{allResumes &&
						allResumes.map((resume, index) => (
							<Grid item key={resume._id} xs={6} sm={4} lg={3}>
								<Paper style={{ padding: '16px' }} >
									<Grid container spacing={2} sx={{ height: '13rem' }}>
									{resumeLoading[index] ? (
										<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
											<img src={'/loading.svg'} alt="My SVG" style={{ height: '6rem' }} />
										</Grid>
									) : (
										<>
											<Grid item xs={10} sx={{ cursor: 'pointer', '&:hover': { color: '#687EFF' } }} onClick={() => handleViewResume(resume._id)}>
												<Typography variant="h6">{resume.title}</Typography>
											</Grid>
											{/*<Grid item xs={2}>
												<IconButton
													onClick={() => setEditCourseField(true)}
													sx={{ '&:focus': { outline: 'none' } }}
												>
													<Edit
														sx={{
															color: '#6499E9',
															fontSize: 20,
															cursor: 'pointer',
														}}
													/>
												</IconButton>
											</Grid>*/}
											<Grid item xs={12} sx={{ textAlign: 'left' }}>
												<Box sx={{ display: 'flex', alignContent: 'center' }}>
													<IconButton
														onClick={() => popDialog(index)}
														sx={{ padding: 0, '&:focus': { outline: 'none' } }}
													>
														Delete
														<DeleteOutline
															sx={{
																color: '#FF6969',
																fontSize: 20,
																cursor: 'pointer',
															}}
														/>
													</IconButton>
													<AlertDialog
														open={deletionDialog}
														handleCloseDialog={() => setDeletionDialog(false)}
														handleAgreement={handleDeletion}
													/>
												</Box>
											</Grid>
											<Grid item xs={12} sx={{ textAlign: 'left' }}>
												<Box sx={{ display: 'flex', alignContent: 'center' }}>
													<IconButton
														onClick={() => handleDuplicating(index)}
														sx={{ padding: 0, '&:focus': { outline: 'none' } }}
													>
														Duplicate
														<ContentCopyIcon
															sx={{
																color: '#687EFF',
																fontSize: 20,
																cursor: 'pointer',
															}}
														/>
													</IconButton>
												</Box>
											</Grid>
										</>
									)}
									</Grid>
								</Paper>
							</Grid>
						))
					}
				</Grid>
			</Grid>
		</Grow>
	);
};

export default ResumesPage;
