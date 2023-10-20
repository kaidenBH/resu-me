import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper } from './styles';
import { useEmployment } from '../../../components/hooks/UseEmployment';
import AlertDialog from './Dialog';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface EmploymentSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	employments: [
        {
            _id: string;
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
    const [employmentData, setEmploymentData] = useState<EmploymentSectionForm>({
        _id: employment_section._id,
        resumeId: employment_section.resumeId || '',
        field_name: employment_section.field_name || 'Employment History',
        employments: employment_section.employments || null,
    });

    const { addEmploymentRecord, updateEmploymentRecord, deleteEmploymentRecord, deleteEmployment } = useEmployment();
	const [editEmploymentField, setEditEmploymentField] = useState(false);
	const [employmentFieldLoading, setEmploymentFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(employmentData.employments.map(() => false));
    const [secondsArray, setSecondsArray] = useState(employmentData.employments.map(() => 2));
    const [showDialogEmployment, setShowDialogEmployment] = useState(false);
    const [showDialogRecord, setShowDialogRecord] = useState(false);
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
            setEditingPhases(prevPhases => {
                const updatedPhases = [...prevPhases];
                updatedPhases[index] = true;
                return updatedPhases;
            });
    
            setSecondsArray(prevSeconds => {
                const updatedSeconds = [...prevSeconds];
                updatedSeconds[index] = 2;
                return updatedSeconds;
            });
        }
	};	
	
	const employmentRecordUpdate = async (index: number) => {
		await updateEmploymentRecord(employmentData.resumeId, employmentData.employments[index]._id, employmentData.employments[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setEmploymentFieldLoading(true);
		await updateEmploymentRecord(employmentData.resumeId, employmentData._id, employmentData);
		setEditEmploymentField(false);
		setEmploymentFieldLoading(false);
	};

	const handleDeleteEmployment = async () =>{
		//await deleteEmployment(employmentData.resumeId);
        console.log('works');
        setShowDialogEmployment(false);
	};

	const handleDeleteRecord = async (index: number) =>{
		const employment_section = await deleteEmploymentRecord(employmentData.resumeId, employmentData.employments[index]._id);
        setEmploymentData(employment_section!);
        setShowDialogRecord(false);
	};

    const handleShowDialogEmployment = () =>{
        setShowDialogEmployment(prev => !prev);
    }
    const handleShowDialogRecord = () =>{
        setShowDialogRecord(prev => !prev);
    }

	useEffect(() => {
        const intervals = secondsArray.map((seconds, index) => {
            return setInterval(() => {
                setSecondsArray(prevSeconds => {
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
            intervals.forEach(interval => clearInterval(interval));
        };
    }, [secondsArray, editingPhases]);

  return (
    <Container style={{ padding: 0 }} maxWidth="xs">
		<CustomPaper
			sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30vw' }}
		>
			<Grid container spacing={2}>
				{editEmploymentField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
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
                            <>
                                <CheckIcon
                                    sx={{
                                        color: '#6499E9',
                                        fontSize: 40,
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleChangeFieldName}
                                />
                                <DeleteIcon
                                    sx={{
                                        color: '#D71313',
                                        fontSize: 20,
                                        cursor: 'pointer',
                                        marginLeft: '8px',
                                    }}
                                    onClick={handleShowDialogEmployment}
                                />
                            </>
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
                        <DeleteIcon
                            sx={{
                                color: '#D71313',
                                fontSize: 20,
                                cursor: 'pointer',
                                marginLeft: '8px',
                            }}
                            onClick={handleShowDialogEmployment}
                        />
					</Grid>
				)}
                <AlertDialog open={showDialogEmployment} handleCloseDialog={handleShowDialogEmployment} handleAgreement={handleDeleteEmployment}/>
                {employmentData.employments.map((employment, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #272829', padding: '16px', margin: '0 0 16px 0', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex' }}>
                                <CustomTypography variant="body1" sx={{ marginLeft: 0 }}>
                                    {employment.job_title}
                                    <IconButton onClick={() => toggleDetails(index)}>
                                        {showDetails[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                    <DeleteOutlineIcon
                                        sx={{
                                            color: '#D71313',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                            marginLeft: '8px',
                                        }}
                                        onClick={handleShowDialogRecord}
                                    />
                                </CustomTypography>
                                <AlertDialog open={showDialogRecord} handleCloseDialog={handleShowDialogRecord} handleAgreement={() => handleDeleteRecord(index)}/>
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
                                        selected={employment.start_date ? new Date(employment.start_date) : null}
                                        onChange={(date: Date) => {
                                            const isoString = date ? date.toISOString() : '';
                                            handleChange({ target: { name: `start_date;-;${index}`, value: isoString } });
                                        }}
                                        dateFormat="MM/dd/yyyy"
                                        customInput={<CustomTextField fullWidth variant="filled" label="Start date" />}
                                    />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker
                                            selected={employment.end_date ?  new Date(employment.end_date): null}
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
                    </Grid>
                ))}
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default EmploymentSection