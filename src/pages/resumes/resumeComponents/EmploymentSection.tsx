import React, { useState, useEffect } from 'react';
import { Grid, Box, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper } from './styles';
import { useResume } from '../../../components/context/ResumeContext';
import { useEmployment } from '../../../components/hooks/UseEmployment';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EmploymentSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	employments: [
        {
			job_title: string;
			employer_name: string;
			start_date: string;
			end_date: string;
			city: string;
			description: string;
		}
    ];
}

interface EmploymentSectionProps {
    employment_section: EmploymentSectionForm; 
}

const EmploymentSection: React.FC<EmploymentSectionProps> = ({ employment_section }) => {
	const { resume } = useResume();
    const { addEmploymentRecord, updateEmploymentRecord, deleteEmploymentRecord, deleteEmployment } = useEmployment();
	const [editEmploymentField, setEditEmploymentField] = useState(false);
	const [employmentFieldLoading, setEmploymentFieldLoading] = useState(false);
	const [editingPhase, setEditingPhase] = useState(false);
	const [seconds, setSeconds] = useState(2);
    
    const [employmentData, setEmploymentData] = useState<EmploymentSectionForm>({
        _id: employment_section._id,
        resumeId: employment_section.resumeId || '',
        field_name: employment_section.field_name || 'Employment History',
        employments: employment_section.employments || null,
    });
    
    const [showDetails, setShowDetails] = useState(
        employmentData.employments.map(() => false)
      );

    const toggleDetails = (index: number) => {
        setShowDetails(prevDetails => {
            const newDetails = [...prevDetails];
            newDetails[index] = !newDetails[index];
            return newDetails;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "field_name") {
            setEmploymentData({
                ...employmentData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setEmploymentData(prevData => {
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
        }
		setEditingPhase(true);
		setSeconds(2);
	};	
	
	const employmentSectionUpdate = async () => {
		await updateEmploymentRecord(employmentData.resumeId, employmentData._id, employmentData);
		setEditingPhase(false);
	};

	const handleChangeFieldName = async () =>{
		setEmploymentFieldLoading(true);
		await employmentSectionUpdate();
		setEditEmploymentField(false);
		setEmploymentFieldLoading(false);
	};

	/*const handleChangeSummaryName = async () =>{
		setSummaryFieldLoading(true);
		await employmentSectionUpdate();
		setEditSummaryField(false);
		setSummaryFieldLoading(false);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(prevSeconds => prevSeconds - 1);
		}, 1000);
	
		if (seconds <= 0 && editingPhase) {
			employmentSectionUpdate();
		}
	
		return () => clearInterval(interval);
	}, [seconds]);*/

  return (
    <Container style={{ padding: 0 }} maxWidth="xs">
		<CustomPaper
			sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30vw' }}
		>
			<Grid container spacing={2}>
				{editEmploymentField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center' }}>
						<CustomTextField
							fullWidth
							label="Personal Field Name"
							variant="filled"
							name="field_name"
							value={employmentData.field_name}
							onChange={handleChange}
						/>
						{employmentFieldLoading?
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
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{employmentData.field_name}</CustomTypography>
						<EditIcon
							sx={{
                                color: '#6499E9',
								fontSize: 20,
								cursor: 'pointer',
							}}
							onClick={() => setEditEmploymentField(true)}
						/>
					</Grid>
				)}
                {employmentData.employments.map((employment, index) => (
                    <Box key={index} sx={{ border: '1px solid #272829', padding: '16px', marginLeft: '16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <CustomTypography variant="body1" sx={{ marginLeft: 0 }}>
                                    {employment.job_title}
                                    <IconButton onClick={() => toggleDetails(index)}>
                                        {showDetails[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </CustomTypography>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Job Title"
                                            variant="filled"
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
                                            name={`employer_name;-;${index}`}
                                            value={employment.employer_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker
                                            selected={new Date(employment.start_date)}
                                            onChange={(date: Date) => {
                                                const isoString = date.toISOString();
                                                handleChange({ target: { name: `start_date;-;${index}`, value: isoString } });
                                            }}
                                            dateFormat="MM/dd/yyyy"
                                            customInput={<CustomTextField fullWidth variant="filled" label="Start date" />}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker
                                            selected={new Date(employment.end_date)}
                                            onChange={(date: Date) => {
                                                const isoString = date.toISOString();
                                                handleChange({ target: { name: `end_date;-;${index}`, value: isoString } });
                                            }}
                                            dateFormat="MM/dd/yyyy"
                                            customInput={<CustomTextField fullWidth variant="filled" label="End date" />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="City"
                                            variant="filled"
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
                    </Box>
                ))}
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default EmploymentSection