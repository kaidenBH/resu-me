import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper, LinkTypography } from './styles';
import { useCourse } from '../../../components/hooks';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CourseSectionForm {
    _id: string;
    resumeId: string;
    field_name: string;
	courses: [
        {
            _id: string;
			course_name: string;
			institution: string;
            start_date: string;
			end_date: string;
			description: string;
		}
    ];
}

interface CourseSectionProps {
    course_section: CourseSectionForm; 
}

const CourseSection: React.FC<CourseSectionProps> = ({ course_section }) => {
    const [courseData, setCourseData] = useState<CourseSectionForm>({
        _id: course_section._id,
        resumeId: course_section.resumeId || '',
        field_name: course_section.field_name || 'Courses',
        courses: course_section.courses || [],
    });

    const { addCourse, updateCourse, deleteCourse, deleteCourseSection } = useCourse();
	const [editCourseField, setEditCourseField] = useState(false);
	const [courseFieldLoading, setCourseFieldLoading] = useState(false);
	const [editingPhases, setEditingPhases] = useState(courseData.courses.map(() => false));
    const [secondsArray, setSecondsArray] = useState(courseData.courses.map(() => 2));
    const [showDialogCourseSection, setShowDialogCourseSection] = useState(false);
    const [showDialogCourse, setShowDialogCourse] = useState(false);
    const [deletionIndex, setDeletionIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(
        courseData.courses.map(() => false)
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
            setCourseData({
                ...courseData,
				[name]: value,
			});
		} else {
            const [fieldName, indexStr] = name.split(';-;');
            const index = parseInt(indexStr, 10);
    
            setCourseData(prevData => {
                const updatedCourses = [...prevData.courses];
                updatedCourses[index] = {
                    ...updatedCourses[index],
                    [fieldName]: value,
                };
    
                return {
                    ...prevData,
                    courses: updatedCourses,
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
	
	const courseUpdate = async (index: number) => {
		await updateCourse(courseData.resumeId, courseData.courses[index]._id, courseData.courses[index]);
		setEditingPhases(prevPhases => {
            const updatedPhases = [...prevPhases];
            updatedPhases[index] = false;
            return updatedPhases;
        });
	};

	const handleChangeFieldName = async () =>{
		setCourseFieldLoading(true);
		await updateCourse(courseData.resumeId, courseData._id, courseData);
		setEditCourseField(false);
		setCourseFieldLoading(false);
	};

    const handleAddCourse = async () =>{
        const course_section = await addCourse(courseData.resumeId);
        setCourseData(course_section!);
        setShowDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[updatedDetails.length] = true;
            return updatedDetails;
        });
    };

	const handleDeleteCourseSection = async () =>{
		await deleteCourseSection(courseData.resumeId);
        setShowDialogCourseSection(false);
	};

	const handleDeleteCourse = async () =>{
		const course_section = await deleteCourse(courseData.resumeId, courseData.courses[deletionIndex]._id);
        setCourseData(course_section!);
        setShowDialogCourse(false);
	};

    const handleShowDialogCourseSection = () =>{
        setShowDialogCourseSection(prev => !prev);
    }
    const handleShowDialogCourse = (index: number) =>{
        setDeletionIndex(index);
        setShowDialogCourse(true);
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
                courseUpdate(index);
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
				{editCourseField? (
					<Grid item xs={6} sx={{ display: 'flex', alignItems:'center', marginBottom: '8px' }}>
						<CustomTextField
							fullWidth
							label="Courses Field Name"
							variant="filled"
							name="field_name"
							value={courseData.field_name}
							onChange={handleChange}
						/>
						{courseFieldLoading?
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
                                <IconButton onClick={handleShowDialogCourseSection} sx={{ '&:focus': { outline: 'none' }}} >
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
						<CustomTypography variant="h6" sx={{ marginLeft:0 }}>{courseData.field_name}</CustomTypography>
                        <IconButton onClick={() => setEditCourseField(true)} sx={{ '&:focus': { outline: 'none' }}} >
                            <Edit
                                sx={{
                                    color: '#6499E9',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <IconButton onClick={handleShowDialogCourseSection} sx={{ '&:focus': { outline: 'none' }}} >
                            <Delete
                                sx={{
                                    color: '#D71313',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                }}
                            />
                        </IconButton>
                        <AlertDialog open={showDialogCourseSection} handleCloseDialog={handleShowDialogCourseSection} handleAgreement={handleDeleteCourseSection}/>
					</Grid>
				)}
                {courseData.courses.map((course, index) => (
                    <Grid item xs={12} key={index} sx={{ border: '1px solid #D8D9DA', padding: '16px', margin: '0 0 16px 16px', borderRadius: '5px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', height: '4rem' }}>
                                <CustomTypography variant="body1" onClick={() => toggleDetails(index)} sx={{ 
                                    marginLeft: 0, 
                                    cursor: 'pointer' ,
                                    '&:hover': { color: '#687EFF' }
                                    }}>
                                    {course.course_name}
                                    <IconButton sx={{ '&:focus': { outline: 'none' }}} >
                                        {showDetails[index] ? <ExpandLess /> : <ExpandMore />}
                                    </IconButton>
                                </CustomTypography>
                                <IconButton onClick={() => handleShowDialogCourse(index)} sx={{ '&:focus': { outline: 'none' }}} >
                                    <DeleteOutline
                                        sx={{
                                            color: '#FF6969',
                                            fontSize: 20,
                                            cursor: 'pointer',
                                        }}
                                    />
                                </IconButton>
                                <AlertDialog open={showDialogCourse} handleCloseDialog={() => setShowDialogCourse(false)} handleAgreement={handleDeleteCourse}/>
                            </Grid>
                            {showDetails[index] && (
                                <>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Course"
                                            variant="filled"
                                            name={`course_name;-;${index}`}
                                            value={course.course_name}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomTextField
                                            fullWidth
                                            label="Institution"
                                            variant="filled"
                                            name={`institution;-;${index}`}
                                            value={course.institution}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <DatePicker
                                            selected={course.start_date ? new Date(course.start_date) : null}
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
                                            selected={course.end_date ?  new Date(course.end_date): null}
                                            onChange={(date: Date) => {
                                                const isoString = date ? date.toISOString() : '';
                                                handleChange({ target: { name: `end_date;-;${index}`, value: isoString } });
                                            }}
                                            dateFormat="MM/dd/yyyy"
                                            customInput={<CustomTextField fullWidth variant="filled" label="End date" />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ zIndex: 0 }}>
                                        <CustomTextField
                                            fullWidth
                                            label="Description"
                                            variant="filled"
                                            name={`description;-;${index}`}
                                            value={course.description}
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
                    <LinkTypography onClick={handleAddCourse}>+ Add another Course</LinkTypography>
                </Grid>
			</Grid>
		</CustomPaper>
	</Container>
  );
}

export default CourseSection