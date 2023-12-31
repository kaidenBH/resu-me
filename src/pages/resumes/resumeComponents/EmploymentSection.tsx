import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton, Tooltip } from '@mui/material';
import { CustomTextField, CustomTypography, CustomBox, LinkTypography } from './styles';
import { useEmployment } from '../../../components/hooks';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import CustomDatePicker from './CustomDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Employment } from '../../../components/interfaces/ResumeInterfaces';

interface EmploymentSectionProps {
	employment_section: Employment;
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({ employment_section }) => {
	const [employmentData, setEmploymentData] = useState<Employment>({
		type: employment_section.type || 'Employment', 
		_id: employment_section._id,
		resumeId: employment_section.resumeId || '',
		field_name: employment_section.field_name || 'Employment History',
		employments: employment_section.employments || [],
	});

	const {
		addEmploymentRecord,
		updateEmploymentRecord,
		deleteEmploymentRecord,
		deleteEmployment,
	} = useEmployment();
	const [editEmploymentField, setEditEmploymentField] = useState(false);
	const [employmentFieldLoading, setEmploymentFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(employmentData.employments.map(() => false));
	const [secondsArray, setSecondsArray] = useState(employmentData.employments.map(() => 2));
	const [showDialogEmployment, setShowDialogEmployment] = useState(false);
	const [showDialogRecord, setShowDialogRecord] = useState(false);
	const [deletionIndex, setDeletionIndex] = useState(0);
	const [showDetails, setShowDetails] = useState(employmentData.employments.map(() => false));

	const toggleDetails = (index: number) => {
		setShowDetails((prevDetails) => {
			const newDetails = [...prevDetails];
			newDetails[index] = !newDetails[index];
			return newDetails;
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'field_name') {
			setEmploymentData({
				...employmentData,
				[name]: value,
			});
		} else {
			const [fieldName, indexStr] = name.split(';-;');
			const index = parseInt(indexStr, 10);

			setEmploymentData((prevData) => {
				const updatedEmployments = [...prevData.employments];
				updatedEmployments[index] = {
					...updatedEmployments[index],
					[fieldName]: value,
				};

				return {
					...prevData,
					employments: updatedEmployments,
				};
			});
			setEditingPhases((prevPhases) => {
				const updatedPhases = [...prevPhases];
				updatedPhases[index] = true;
				return updatedPhases;
			});

			setSecondsArray((prevSeconds) => {
				const updatedSeconds = [...prevSeconds];
				updatedSeconds[index] = 2;
				return updatedSeconds;
			});
		}
	};

	const handleChangeDates = (target: {name: string, value: string}) => {
		const { name, value } = target;
		const [fieldName, indexStr] = name.split(';-;');
		const index = parseInt(indexStr, 10);
		setEmploymentData((prevData) => {
			const updatedEmployments = [...prevData.employments];
			updatedEmployments[index] = {
				...updatedEmployments[index],
				[fieldName]: value,
			};
			return {
				...prevData,
				employments: updatedEmployments,
			};
		});
		setEditingPhases((prevPhases) => {
			const updatedPhases = [...prevPhases];
			updatedPhases[index] = true;
			return updatedPhases;
		});
		setSecondsArray((prevSeconds) => {
			const updatedSeconds = [...prevSeconds];
			updatedSeconds[index] = 2;
			return updatedSeconds;
		});
	};

	const employmentRecordUpdate = async (index: number) => {
		await updateEmploymentRecord(
			employmentData.resumeId,
			employmentData.employments[index]._id,
			employmentData.employments[index],
		);
		setEditingPhases((prevPhases) => {
			const updatedPhases = [...prevPhases];
			updatedPhases[index] = false;
			return updatedPhases;
		});
	};

	const handleChangeFieldName = async () => {
		setEmploymentFieldLoading(true);
		await updateEmploymentRecord(employmentData.resumeId, employmentData._id, employmentData);
		setEditEmploymentField(false);
		setEmploymentFieldLoading(false);
	};

	const handleAddRecord = async () => {
		const employment_section = await addEmploymentRecord(employmentData.resumeId);
		setEmploymentData(employment_section!);
		setShowDetails((prevDetails) => {
			const updatedDetails = [...prevDetails];
			updatedDetails[updatedDetails.length] = true;
			return updatedDetails;
		});
	};

	const handleDeleteEmployment = async () => {
		await deleteEmployment(employmentData.resumeId);
		setShowDialogEmployment(false);
	};

	const handleDeleteRecord = async () => {
		const employment_section = await deleteEmploymentRecord(
			employmentData.resumeId,
			employmentData.employments[deletionIndex]._id,
		);
		setEmploymentData(employment_section!);
		setShowDialogRecord(false);
	};

	const handleShowDialogEmployment = () => {
		setShowDialogEmployment((prev) => !prev);
	};
	const handleShowDialogRecord = (index: number) => {
		setDeletionIndex(index);
		setShowDialogRecord(true);
	};

	useEffect(() => {
		const intervals = secondsArray.map((_, index) => {
			return setInterval(() => {
				setSecondsArray((prevSeconds) => {
					const updatedSeconds = [...prevSeconds];
					updatedSeconds[index] = prevSeconds[index] - 1;
					return updatedSeconds;
				});
			}, 1000);
		});

		secondsArray.forEach((seconds, index) => {
			if (seconds <= 0 && editingPhases[index]) {
				employmentRecordUpdate(index);
			}
		});

		return () => {
			intervals.forEach((interval) => clearInterval(interval));
		};
	}, [secondsArray, editingPhases]);

	return (
		<Container style={{ padding: 0 }} maxWidth="sm">
			<CustomBox>
				<Grid container spacing={2}>
					{editEmploymentField ? (
						<Grid
							item
							xs={6}
							sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
						>
							<CustomTextField
								fullWidth
								label="Employment Field Name"
								variant="filled"
								color="secondary"
								name="field_name"
								value={employmentData.field_name}
								onChange={handleChange}
							/>
							{employmentFieldLoading ? (
								<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
							) : (
								<>
									<Tooltip title="Confirm field name" arrow>
										<IconButton
											onClick={handleChangeFieldName}
											sx={{ '&:focus': { outline: 'none' } }}
										>
											<Check
												sx={{
													color: '#6499E9',
													fontSize: 30,
													cursor: 'pointer',
												}}
											/>
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete employment section" arrow>
										<IconButton
											onClick={handleShowDialogEmployment}
											sx={{ '&:focus': { outline: 'none' } }}
										>
											<Delete
												sx={{
													color: '#D71313',
													fontSize: 20,
													cursor: 'pointer',
												}}
											/>
										</IconButton>
									</Tooltip>
								</>
							)}
						</Grid>
					) : (
						<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
							<CustomTypography variant="h6" sx={{ marginLeft: 0 }}>
								{employmentData.field_name}
							</CustomTypography>
							<Tooltip title="Change field name" arrow>
								<IconButton
									onClick={() => setEditEmploymentField(true)}
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
							</Tooltip>
							<Tooltip title="Delete employment section" arrow>
								<IconButton
									onClick={handleShowDialogEmployment}
									sx={{ '&:focus': { outline: 'none' } }}
								>
									<Delete
										sx={{
											color: '#D71313',
											fontSize: 20,
											cursor: 'pointer',
										}}
									/>
								</IconButton>
							</Tooltip>
							<AlertDialog
								open={showDialogEmployment}
								handleCloseDialog={handleShowDialogEmployment}
								handleAgreement={handleDeleteEmployment}
							/>
						</Grid>
					)}
					{employmentData.employments.map((employment, index) => (
						<Grid
							item
							xs={12}
							key={index}
							sx={{
								border: '1px solid #D8D9DA',
								padding: '16px',
								margin: '0 0 16px 16px',
								borderRadius: '5px',
							}}
						>
							<Grid container spacing={2}>
								<Grid
									container
									item
									xs={12}
									sx={{ display: 'flex', alignItems: 'center', height: '4rem' }}
								>
									<Grid item xs={10}>
										<CustomTypography
											variant="body1"
											onClick={() => toggleDetails(index)}
											sx={{
												margin: 0,
												textAlign: 'left',
												cursor: 'pointer',
												'&:hover': { color: '#687EFF' },
											}}
										>
											{employment.job_title}
											<Tooltip title={showDetails[index] ? "Hide details" : "Show details"} arrow>
												<IconButton sx={{ '&:focus': { outline: 'none' } }}>
													{showDetails[index] ? (
														<ExpandLess />
													) : (
														<ExpandMore />
													)}
												</IconButton>
											</Tooltip>
										</CustomTypography>
									</Grid>
									<Grid item xs={2} sx={{ textAlign: 'center' }}>
										<Tooltip title="Delete this employment record" arrow>
											<IconButton
												onClick={() => handleShowDialogRecord(index)}
												sx={{ '&:focus': { outline: 'none' } }}
											>
												<DeleteOutline
													sx={{
														color: '#FF6969',
														fontSize: 20,
														cursor: 'pointer',
													}}
												/>
											</IconButton>
										</Tooltip>
									</Grid>
									<AlertDialog
										open={showDialogRecord}
										handleCloseDialog={() => setShowDialogRecord(false)}
										handleAgreement={handleDeleteRecord}
									/>
								</Grid>
								{showDetails[index] && (
									<>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Job Title"
												variant="filled"
												color="secondary"
												name={`job_title;-;${index}`}
												value={employment.job_title}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Employer Name"
												variant="filled"
												color="secondary"
												name={`employer_name;-;${index}`}
												value={employment.employer_name}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<CustomDatePicker
												selectedDate={employment.start_date ? new Date(employment.start_date) : null}
												label='Start Date'
												onChange={(date: Date | null) => {
													const formattedDate = date ? date.toLocaleDateString('en-US') : '';
													handleChangeDates({
													name: `start_date;-;${index}`,
													value: formattedDate,
													});
												}}
											/>
										</Grid>
										<Grid item xs={3}>
											<CustomDatePicker
												selectedDate={employment.end_date ? new Date(employment.end_date) : null}
												label='End Date'
												onChange={(date: Date | null) => {
													const formattedDate = date ? date.toLocaleDateString('en-US') : '';
													handleChangeDates({
													name: `end_date;-;${index}`,
													value: formattedDate,
													});
												}}
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="City"
												variant="filled"
												color="secondary"
												name={`city;-;${index}`}
												value={employment.city}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} style={{ zIndex: 0 }}>
											<CustomTextField
												fullWidth
												label="Description of the job"
												variant="filled"
												color="secondary"
												name={`description;-;${index}`}
												value={employment.description}
												onChange={handleChange}
												multiline
												rows={4}
											/>
										</Grid>
									</>
								)}
							</Grid>
						</Grid>
					))}
					<Grid
						item
						xs={6}
						sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '16px' }}
					>
						<LinkTypography onClick={handleAddRecord}>
							+ Add another Employment Record
						</LinkTypography>
					</Grid>
				</Grid>
			</CustomBox>
		</Container>
	);
};

export default EmploymentSection;
