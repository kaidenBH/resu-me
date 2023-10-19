import React, { useState, useEffect } from 'react';
import { Grid, Box, Container } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper } from './styles';
import { useResume } from '../../../components/context/ResumeContext';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

interface personalSectionForm {
    resumeId: string;
    field_name: string;
    job_title: string;
    image: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
	summary: [string, string];
}

interface PersonalSectionProps {
    personal_section: personalSectionForm; 
}

const PersonalSection: React.FC<PersonalSectionProps> = ({ personal_section }) => {
	const { updatePersonalSection } = useResume();
	const [editPersonalField, setEditPersonalField] = useState(false);
	const [PersonalFieldLoading, setPersonalFieldLoading] = useState(false);
	const [editSummaryField, setEditSummaryField] = useState(false);
	const [summaryFieldLoading, setSummaryFieldLoading] = useState(false);
	const [editingPhase, setEditingPhase] = useState(false);
	const [seconds, setSeconds] = useState(2);

    const [personalData, setPersonalData] = useState<personalSectionForm>({
        resumeId: personal_section.resumeId || '',
        field_name: personal_section.field_name || 'Personal Details',
        job_title: personal_section.job_title || '',
        image: personal_section.image || '',
        first_name: personal_section.first_name || '',
        last_name: personal_section.last_name || '',
        email: personal_section.email || '',
        phone: personal_section.phone || '',
        country: personal_section.country || '',
        city: personal_section.city || '',
		summary: [
			personal_section.summary[0],
			personal_section.summary[1]
		],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name.startsWith("summary")) {
			const index = parseInt(name.split(';-;')[1], 10);
			setPersonalData({
				...personalData,
				summary: [
					...personalData.summary.slice(0, index),
					value,
					...personalData.summary.slice(index + 1)
				],
			});
		} else {
			setPersonalData({
				...personalData,
				[name]: value,
			});
		}
		setEditingPhase(true);
		setSeconds(2);
	};	
	
	const personalSectionUpdate = async () => {
		await updatePersonalSection(personalData.resumeId, personalData);
		setEditingPhase(false);
	};

	const handleChangeFieldName = async () =>{
		setPersonalFieldLoading(true);
		await personalSectionUpdate();
		setEditPersonalField(false);
		setPersonalFieldLoading(false);
	};

	const handleChangeSummaryName = async () =>{
		setSummaryFieldLoading(true);
		await personalSectionUpdate();
		setEditSummaryField(false);
		setSummaryFieldLoading(false);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(prevSeconds => prevSeconds - 1);
		}, 1000);
	
		if (seconds <= 0 && editingPhase) {
			personalSectionUpdate();
		}
	
		return () => clearInterval(interval);
	}, [seconds]);

  return (
    <Container style={{ padding: 0 }} maxWidth="xs">
		<CustomPaper
			sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30vw' }}
		>
			<Grid container spacing={2}>
				<CustomTypography variant="h6">{personalData.field_name}</CustomTypography>
				{/*editPersonalField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center' }}>
						<CustomTextField
							fullWidth
							label="Personal Field Name"
							variant="filled"
							name="field_name"
							value={personalData.field_name}
							onChange={handleChange}
						/>
						{PersonalFieldLoading?
							<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
						:(
							<CheckIcon
								sx={{
									color: '#6499E9',
									fontSize: 40,
									cursor: 'pointer',
								}}
								onClick={handleChangeFieldName}
							/>
						)}
					</Grid>
				):(
					<Grid item xs={12}  sx={{ display: 'flex', alignItems:'center' }}>
						<CustomTypography variant="h6">{personalData.field_name}</CustomTypography>
						<EditIcon
							sx={{
								color: '#6499E9',
								fontSize: 20,
								cursor: 'pointer',
							}}
							onClick={() => setEditPersonalField(true)}
						/>
					</Grid>
				)*/}
				<Grid item xs={12}>
					<CustomTextField
						fullWidth
						label="Wanted Job Title"
						variant="filled"
						name="job_title"
						value={personalData.job_title}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="First Name"
						variant="filled"
						name="first_name"
						value={personalData.first_name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Last Name"
						variant="filled"
						name="last_name"
						value={personalData.last_name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Email"
						variant="filled"
						type="email"
						name="email"
						value={personalData.email}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Phone"
						variant="filled"
						name="phone"
						value={personalData.phone}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Country"
						variant="filled"
						name="country"
						value={personalData.country}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="City"
						variant="filled"
						name="city"
						value={personalData.city}
						onChange={handleChange}
					/>
				</Grid>
				{editSummaryField? (
					<Grid item xs={6} sx={{ marginTop:'2rem', marginBottom:'0', display: 'flex', alignItems:'center' }}>
						<CustomTextField
							fullWidth
							label="Professional Summary"
							variant="filled"
							name="summary;-;0"
							value={personalData.summary[0]}
							onChange={handleChange}
						/>
						{summaryFieldLoading?
							<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
						:(
							<CheckIcon
								sx={{
									color: '#6499E9',
									fontSize: 40,
									cursor: 'pointer',
								}}
								onClick={handleChangeSummaryName}
							/>
						)}
					</Grid>
				):(
					<Grid item xs={12}  sx={{ margin:'2rem 0 0 0', display: 'flex', alignItems:'center' }}>
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{personalData.summary[0]}</CustomTypography>
						<EditIcon
							sx={{
								color: '#6499E9',
								fontSize: 20,
								cursor: 'pointer',
							}}
							onClick={() => setEditSummaryField(true)}
						/>
					</Grid>
				)}
                <Grid item xs={12}>
                    <CustomTextField
                        fullWidth
                        label="About yourself and the work you do ..."
                        variant="filled"
                        name="summary;-;1"
						value={personalData.summary[1]}
						onChange={handleChange}
                        multiline 
                        rows={4}
                    />
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default PersonalSection