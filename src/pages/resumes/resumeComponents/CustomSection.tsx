import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton, Tooltip } from '@mui/material';
import { CustomTextField, CustomTypography, CustomBox, LinkTypography } from './styles';
import { useCustom } from '../../../components/hooks';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import 'react-datepicker/dist/react-datepicker.css';
import { Custom } from '../../../components/interfaces/ResumeInterfaces';
import CustomDatePicker from './CustomDatePicker';

interface CustomSectionProps {
	customActivity_section: Custom;
}

const CustomSection: React.FC<CustomSectionProps> = ({ customActivity_section }) => {
	const [customData, setCustomData] = useState<Custom>({
		type: customActivity_section.type || 'Custom',
		_id: customActivity_section._id,
		resumeId: customActivity_section.resumeId || '',
		field_name: customActivity_section.field_name || 'Untitled',
		activities: customActivity_section.activities || [],
	});

	const { addCustomActivity, updateCustomActivity, deleteCustomActivity, deleteCustom } =
		useCustom();
	const [editCustomField, setEditCustomField] = useState(false);
	const [customFieldLoading, setCustomFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(customData.activities.map(() => false));
	const [secondsArray, setSecondsArray] = useState(customData.activities.map(() => 2));
	const [showDialogCustomSection, setShowDialogCustomSection] = useState(false);
	const [showDialogCustom, setShowDialogCustom] = useState(false);
	const [deletionIndex, setDeletionIndex] = useState(0);
	const [showDetails, setShowDetails] = useState(customData.activities.map(() => false));

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
			setCustomData({
				...customData,
				[name]: value,
			});
		} else {
			const [fieldName, indexStr] = name.split(';-;');
			const index = parseInt(indexStr, 10);

			setCustomData((prevData) => {
				const updatedActivities = [...prevData.activities];
				updatedActivities[index] = {
					...updatedActivities[index],
					[fieldName]: value,
				};

				return {
					...prevData,
					activities: updatedActivities,
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

		setCustomData((prevData) => {
			const updatedActivities = [...prevData.activities];
			updatedActivities[index] = {
				...updatedActivities[index],
				[fieldName]: value,
			};
			return {
				...prevData,
				activities: updatedActivities,
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
	

	const customUpdate = async (index: number) => {
		await updateCustomActivity(
			customData.resumeId,
			customData._id,
			customData.activities[index]._id,
			customData.activities[index],
		);
		setEditingPhases((prevPhases) => {
			const updatedPhases = [...prevPhases];
			updatedPhases[index] = false;
			return updatedPhases;
		});
	};

	const handleChangeFieldName = async () => {
		setCustomFieldLoading(true);
		await updateCustomActivity(
			customData.resumeId,
			customData._id,
			customData.activities[0]._id,
			customData,
		);
		setEditCustomField(false);
		setCustomFieldLoading(false);
	};

	const handleAddActivity = async () => {
		const customActivity_section = await addCustomActivity(customData.resumeId, customData._id);
		setCustomData(customActivity_section!);
		setShowDetails((prevDetails) => {
			const updatedDetails = [...prevDetails];
			updatedDetails[updatedDetails.length] = true;
			return updatedDetails;
		});
	};

	const handleDeleteCustomSection = async () => {
		await deleteCustom(customData.resumeId, customData._id);
		setShowDialogCustomSection(false);
	};

	const handleDeleteActivity = async () => {
		const customActivity_section = await deleteCustomActivity(
			customData.resumeId,
			customData._id,
			customData.activities[deletionIndex]._id,
		);
		setCustomData(customActivity_section!);
		setShowDialogCustom(false);
	};

	const handleShowDialogCustomSection = () => {
		setShowDialogCustomSection((prev) => !prev);
	};
	const handleShowDialogCustom = (index: number) => {
		setDeletionIndex(index);
		setShowDialogCustom(true);
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
				customUpdate(index);
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
					{editCustomField ? (
						<Grid
							item
							xs={6}
							sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
						>
							<CustomTextField
								fullWidth
								label="Custom Field Name"
								variant="filled"
								color="secondary"
								name="field_name"
								value={customData.field_name}
								onChange={handleChange}
							/>
							{customFieldLoading ? (
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
									<Tooltip title="Delete this custom section" arrow>
										<IconButton
											onClick={handleShowDialogCustomSection}
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
								{customData.field_name}
							</CustomTypography>
							<Tooltip title="Change field name" arrow>
								<IconButton
									onClick={() => setEditCustomField(true)}
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
							<Tooltip title="Delete this custom section" arrow>
								<IconButton
									onClick={handleShowDialogCustomSection}
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
								open={showDialogCustomSection}
								handleCloseDialog={handleShowDialogCustomSection}
								handleAgreement={handleDeleteCustomSection}
							/>
						</Grid>
					)}
					{customData.activities.map((activity, index) => (
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
											{activity.activity_title}
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
										<Tooltip title="Delete this custom field" arrow>
											<IconButton
												onClick={() => handleShowDialogCustom(index)}
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
										open={showDialogCustom}
										handleCloseDialog={() => setShowDialogCustom(false)}
										handleAgreement={handleDeleteActivity}
									/>
								</Grid>
								{showDetails[index] && (
									<>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Activity name, job title etc..."
												variant="filled"
												color="secondary"
												name={`activity_title;-;${index}`}
												value={activity.activity_title}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="City"
												variant="filled"
												color="secondary"
												name={`city;-;${index}`}
												value={activity.city}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<CustomDatePicker
												selectedDate={activity.start_date ? new Date(activity.start_date) : null}
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
												selectedDate={activity.end_date ? new Date(activity.end_date) : null}
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
										<Grid item xs={12} style={{ zIndex: 0 }}>
											<CustomTextField
												fullWidth
												label="Description"
												variant="filled"
												color="secondary"
												name={`description;-;${index}`}
												value={activity.description}
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
						<LinkTypography onClick={handleAddActivity}>
							+ Add another Activity
						</LinkTypography>
					</Grid>
				</Grid>
			</CustomBox>
		</Container>
	);
};

export default CustomSection;
