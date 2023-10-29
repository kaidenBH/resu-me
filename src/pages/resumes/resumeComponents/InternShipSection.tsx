import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography } from './styles';
import { useInternShip } from '../../../components/hooks';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface InternShipSectionForm {
	_id: string;
	resumeId: string;
	field_name: string;
	internships: [
		{
			_id: string;
			job_title: string;
			employer_name: string;
			start_date: string;
			end_date: string;
			city: string;
			description: string;
		},
	];
}

interface InternShipSectionProps {
	internship_section: InternShipSectionForm;
}

const InternShipSection: React.FC<InternShipSectionProps> = ({ internship_section }) => {
	const [internshipData, setInternShipData] = useState<InternShipSectionForm>({
		_id: internship_section._id,
		resumeId: internship_section.resumeId || '',
		field_name: internship_section.field_name || 'InternShip History',
		internships: internship_section.internships || [],
	});

	const {
		addInternShipRecord,
		updateInternShipRecord,
		deleteInternShipRecord,
		deleteInternShip,
	} = useInternShip();
	const [editInternShipField, setEditInternShipField] = useState(false);
	const [internshipFieldLoading, setInternShipFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(internshipData.internships.map(() => false));
	const [secondsArray, setSecondsArray] = useState(internshipData.internships.map(() => 2));
	const [showDialogInternShip, setShowDialogInternShip] = useState(false);
	const [showDialogRecord, setShowDialogRecord] = useState(false);
	const [deletionIndex, setDeletionIndex] = useState(0);
	const [showDetails, setShowDetails] = useState(internshipData.internships.map(() => false));

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
			setInternShipData({
				...internshipData,
				[name]: value,
			});
		} else {
			const [fieldName, indexStr] = name.split(';-;');
			const index = parseInt(indexStr, 10);

			setInternShipData((prevData) => {
				const updatedInternShips = [...prevData.internships];
				updatedInternShips[index] = {
					...updatedInternShips[index],
					[fieldName]: value,
				};

				return {
					...prevData,
					internships: updatedInternShips,
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

	const internshipRecordUpdate = async (index: number) => {
		await updateInternShipRecord(
			internshipData.resumeId,
			internshipData.internships[index]._id,
			internshipData.internships[index],
		);
		setEditingPhases((prevPhases) => {
			const updatedPhases = [...prevPhases];
			updatedPhases[index] = false;
			return updatedPhases;
		});
	};

	const handleChangeFieldName = async () => {
		setInternShipFieldLoading(true);
		await updateInternShipRecord(internshipData.resumeId, internshipData._id, internshipData);
		setEditInternShipField(false);
		setInternShipFieldLoading(false);
	};

	const handleAddRecord = async () => {
		const internship_section = await addInternShipRecord(internshipData.resumeId);
		setInternShipData(internship_section!);
		setShowDetails((prevDetails) => {
			const updatedDetails = [...prevDetails];
			updatedDetails[updatedDetails.length] = true;
			return updatedDetails;
		});
	};

	const handleDeleteInternShip = async () => {
		await deleteInternShip(internshipData.resumeId);
		setShowDialogInternShip(false);
	};

	const handleDeleteRecord = async () => {
		const internship_section = await deleteInternShipRecord(
			internshipData.resumeId,
			internshipData.internships[deletionIndex]._id,
		);
		setInternShipData(internship_section!);
		setShowDialogRecord(false);
	};

	const handleShowDialogInternShip = () => {
		setShowDialogInternShip((prev) => !prev);
	};
	const handleShowDialogRecord = (index: number) => {
		setDeletionIndex(index);
		setShowDialogRecord(true);
	};

	useEffect(() => {
		const intervals = secondsArray.map((seconds, index) => {
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
				internshipRecordUpdate(index);
			}
		});

		return () => {
			intervals.forEach((interval) => clearInterval(interval));
		};
	}, [secondsArray, editingPhases]);

	return (
		<Container style={{ padding: 0 }} maxWidth="sm">
			<CustomPaper
				sx={{
					borderRadius: '20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '35vw',
				}}
			>
				<Grid container spacing={2}>
					{editInternShipField ? (
						<Grid
							item
							xs={6}
							sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
						>
							<CustomTextField
								fullWidth
								label="InternShip Field Name"
								variant="filled"
								name="field_name"
								value={internshipData.field_name}
								onChange={handleChange}
							/>
							{internshipFieldLoading ? (
								<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
							) : (
								<>
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
									<IconButton
										onClick={handleShowDialogInternShip}
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
								</>
							)}
						</Grid>
					) : (
						<Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
							<CustomTypography variant="h6" sx={{ marginLeft: 0 }}>
								{internshipData.field_name}
							</CustomTypography>
							<IconButton
								onClick={() => setEditInternShipField(true)}
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
							<IconButton
								onClick={handleShowDialogInternShip}
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
							<AlertDialog
								open={showDialogInternShip}
								handleCloseDialog={handleShowDialogInternShip}
								handleAgreement={handleDeleteInternShip}
							/>
						</Grid>
					)}
					{internshipData.internships.map((internship, index) => (
						<Grid
							item
							xs={12}
							key={index}
							sx={{
								border: '1px solid #272829',
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
											{internship.job_title}
											<IconButton sx={{ '&:focus': { outline: 'none' } }}>
												{showDetails[index] ? (
													<ExpandLess />
												) : (
													<ExpandMore />
												)}
											</IconButton>
										</CustomTypography>
									</Grid>
									<Grid item xs={2}>
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
												name={`job_title;-;${index}`}
												value={internship.job_title}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Employer Name"
												variant="filled"
												name={`employer_name;-;${index}`}
												value={internship.employer_name}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<DatePicker
												selected={
													internship.start_date
														? new Date(internship.start_date)
														: null
												}
												onChange={(date: Date) => {
													const formattedDate = date
														? date.toLocaleDateString('en-US')
														: '';
													handleChange({
														target: {
															name: `start_date;-;${index}`,
															value: formattedDate,
														},
													});
												}}
												dateFormat="MM/dd/yyyy"
												customInput={
													<CustomTextField
														fullWidth
														variant="filled"
														label="Start date"
													/>
												}
											/>
										</Grid>
										<Grid item xs={3}>
											<DatePicker
												selected={
													internship.end_date
														? new Date(internship.end_date)
														: null
												}
												onChange={(date: Date) => {
													const formattedDate = date
														? date.toLocaleDateString('en-US')
														: '';
													handleChange({
														target: {
															name: `end_date;-;${index}`,
															value: formattedDate,
														},
													});
												}}
												dateFormat="MM/dd/yyyy"
												customInput={
													<CustomTextField
														fullWidth
														variant="filled"
														label="Start date"
													/>
												}
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="City"
												variant="filled"
												name={`city;-;${index}`}
												value={internship.city}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} style={{ zIndex: 0 }}>
											<CustomTextField
												fullWidth
												label="Description of the Internship"
												variant="filled"
												name={`description;-;${index}`}
												value={internship.description}
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
							+ Add another InternShip Record
						</LinkTypography>
					</Grid>
				</Grid>
			</CustomPaper>
		</Container>
	);
};

export default InternShipSection;
