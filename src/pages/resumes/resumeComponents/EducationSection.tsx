import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography } from './styles';
import { useEducation } from '../../../components/hooks/UseEducation';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EducationSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	schools: [
        {
            _id: string;
			school_name: string;
			degree_title: string;
			start_date: string;
			end_date: string;
			city: string;
			description: string;
		}
    ];
}

interface EducationSectionProps {
    education_section: EducationSectionForm; 
}

const EducationSection: React.FC<EducationSectionProps> = ({ education_section }) => {
    const [schoolData, setSchoolData] = useState<EducationSectionForm>({
        _id: education_section._id,
        resumeId: education_section.resumeId || '',
        field_name: education_section.field_name || 'Education',
        schools: education_section.schools || [],
    });

    const { addSchool, updateSchool, deleteSchool, deleteEducation } = useEducation();
	const [editSchoolField, setEditSchoolField] = useState(false);
	const [schoolFieldLoading, setSchoolFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(schoolData.schools.map(() => false));
    const [secondsArray, setSecondsArray] = useState(schoolData.schools.map(() => 2));
    const [showDialogEducation, setShowDialogEducation] = useState(false);
    const [showDialogSchool, setShowDialogSchool] = useState(false);
    const [showDetails, setShowDetails] = useState(
        schoolData.schools.map(() => false)
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
            setSchoolData({
                ...schoolData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setSchoolData(prevData => {
                const updatedSchools = [...prevData.schools];
                updatedSchools[index] = {
                    ...updatedSchools[index],
                    [fieldName]: value,
                };
    
                return {
                    ...prevData,
                    schools: updatedSchools,
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
	
	const schoolUpdate = async (index: number) => {
		await updateSchool(schoolData.resumeId, schoolData.schools[index]._id, schoolData.schools[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setSchoolFieldLoading(true);
		await updateSchool(schoolData.resumeId, schoolData._id, schoolData);
		setEditSchoolField(false);
		setSchoolFieldLoading(false);
	};

    const handleAddSchool = async () =>{
        const education_section = await addSchool(schoolData.resumeId);
        setSchoolData(education_section!);
    };

	const handleDeleteEducation = async () =>{
		await deleteEducation(schoolData.resumeId);
        setShowDialogEducation(false);
	};

	const handleDeleteSchool = async (index: number) =>{
		const education_section = await deleteSchool(schoolData.resumeId, schoolData.schools[index]._id);
        setSchoolData(education_section!);
        setShowDialogSchool(false);
	};

    const handleShowDialogEducation = () =>{
        setShowDialogEducation(prev => !prev);
    }
    const handleShowDialogSchool = () =>{
        setShowDialogSchool(prev => !prev);
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
                schoolUpdate(index);
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
				{editSchoolField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
						<CustomTextField
							fullWidth
							label="Education Field Name"
							variant="filled"
							name="field_name"
							value={schoolData.field_name}
							onChange={handleChange}
						/>
						{schoolFieldLoading?
							<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
						:(
                            <>
                                <IconButton onClick={handleChangeFieldName} sx={{ '&:focus': { outline: 'none' }}} >
                                    <Check
                                        sx={{
                                            color: '#6499E9',
                                            fontSize: 30,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <IconButton onClick={handleShowDialogEducation} sx={{ '&:focus': { outline: 'none' }}} >
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
				):(
					<Grid item xs={12}  sx={{ display: 'flex', alignItems:'center' }}>
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{schoolData.field_name}</CustomTypography>
                        <IconButton onClick={() => setEditSchoolField(true)} sx={{ '&:focus': { outline: 'none' }}} >
                            <Edit
                                sx={{
                                    color: '#6499E9',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleShowDialogEducation} sx={{ '&:focus': { outline: 'none' }}} >
                            <Delete
                                sx={{
                                    color: '#D71313',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
					</Grid>
				)}
                <AlertDialog open={showDialogEducation} handleCloseDialog={handleShowDialogEducation} handleAgreement={handleDeleteEducation}/>
                {schoolData.schools.map((school, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #272829', padding: '16px', margin: '0 0 16px 16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                <CustomTypography variant="body1" onClick={() => toggleDetails(index)} sx={{ 
                                    marginLeft: 0, 
                                    cursor: 'pointer' ,
                                    '&:hover': { color: '#687EFF' }
                                    }}>
                                    {school.school_name}
                                    <IconButton sx={{ '&:focus': { outline: 'none' }}} >
                                        {showDetails[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </CustomTypography>
                                <IconButton onClick={handleShowDialogSchool} sx={{ '&:focus': { outline: 'none' }}} >
                                    <DeleteOutline
                                        sx={{
                                            color: '#FF6969',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <AlertDialog open={showDialogSchool} handleCloseDialog={handleShowDialogSchool} handleAgreement={() => handleDeleteSchool(index)}/>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="School Name"
                                            variant="filled"
                                            name={`school_name;-;${index}`}
                                            value={school.school_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Degree"
                                            variant="filled"
                                            name={`degree_title;-;${index}`}
                                            value={school.degree_title}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker
                                            selected={school.start_date ? new Date(school.start_date) : null}
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
                                            selected={school.end_date ?  new Date(school.end_date): null}
                                            onChange={(date: Date) => {
                                                const isoString = date ? date.toISOString() : '';
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
                                            value={school.city}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ zIndex: 0 }}>
                                        <CustomTextField
                                            fullWidth
                                            label="Description"
                                            variant="filled"
                                            name={`description;-;${index}`}
                                            value={school.description}
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
                <Grid item xs={6} sx={{ display: 'flex', justifyContent:'flex-start', marginLeft: '16px' }}>
                    <LinkTypography onClick={handleAddSchool}>+ Add an School</LinkTypography>
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default EducationSection