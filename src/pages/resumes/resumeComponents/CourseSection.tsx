import React, { useState, useEffect } from 'react';
import { Grid, Container, IconButton } from '@mui/material';
import { CustomTextField, CustomTypography, CustomBox, LinkTypography } from './styles';
import { useCourse } from '../../../components/hooks';
import AlertDialog from './Dialog';
import { Edit, Check, ExpandMore, ExpandLess, Delete, DeleteOutline } from '@mui/icons-material';
import CustomDatePicker from './CustomDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Course } from '../../../components/interfaces/ResumeInterfaces';

interface CourseSectionProps {
	course_section: Course;
}

const CourseSection: React.FC<CourseSectionProps> = ({ course_section }) => {
	const [courseData, setCourseData] = useState<Course>({
		type: course_section.type || 'Course',
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
	const [showDetails, setShowDetails] = useState(courseData.courses.map(() => false));

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
			setCourseData({
				...courseData,
				[name]: value,
			});
		} else {
			const [fieldName, indexStr] = name.split(';-;');
			const index = parseInt(indexStr, 10);

			setCourseData((prevData) => {
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

		setCourseData((prevData) => {
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

	const courseUpdate = async (index: number) => {
		await updateCourse(
			courseData.resumeId,
			courseData.courses[index]._id,
			courseData.courses[index],
		);
		setEditingPhases((prevPhases) => {
			const updatedPhases = [...prevPhases];
			updatedPhases[index] = false;
			return updatedPhases;
		});
	};

	const handleChangeFieldName = async () => {
		setCourseFieldLoading(true);
		await updateCourse(courseData.resumeId, courseData._id, courseData);
		setEditCourseField(false);
		setCourseFieldLoading(false);
	};

	const handleAddCourse = async () => {
		const course_section = await addCourse(courseData.resumeId);
		setCourseData(course_section!);
		setShowDetails((prevDetails) => {
			const updatedDetails = [...prevDetails];
			updatedDetails[updatedDetails.length] = true;
			return updatedDetails;
		});
	};

	const handleDeleteCourseSection = async () => {
		await deleteCourseSection(courseData.resumeId);
		setShowDialogCourseSection(false);
	};

	const handleDeleteCourse = async () => {
		const course_section = await deleteCourse(
			courseData.resumeId,
			courseData.courses[deletionIndex]._id,
		);
		setCourseData(course_section!);
		setShowDialogCourse(false);
	};

	const handleShowDialogCourseSection = () => {
		setShowDialogCourseSection((prev) => !prev);
	};
	const handleShowDialogCourse = (index: number) => {
		setDeletionIndex(index);
		setShowDialogCourse(true);
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
				courseUpdate(index);
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
					{editCourseField ? (
						<Grid
							item
							xs={6}
							sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
						>
							<CustomTextField
								fullWidth
								label="Courses Field Name"
								variant="filled"
								color="secondary"
								name="field_name"
								value={courseData.field_name}
								onChange={handleChange}
							/>
							{courseFieldLoading ? (
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
										onClick={handleShowDialogCourseSection}
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
								{courseData.field_name}
							</CustomTypography>
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
							<IconButton
								onClick={handleShowDialogCourseSection}
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
								open={showDialogCourseSection}
								handleCloseDialog={handleShowDialogCourseSection}
								handleAgreement={handleDeleteCourseSection}
							/>
						</Grid>
					)}
					{courseData.courses.map((course, index) => (
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
											{course.course_name}
											<IconButton sx={{ '&:focus': { outline: 'none' } }}>
												{showDetails[index] ? (
													<ExpandLess />
												) : (
													<ExpandMore />
												)}
											</IconButton>
										</CustomTypography>
									</Grid>
									<Grid item xs={2} sx={{ textAlign: 'center' }}>
										<IconButton
											onClick={() => handleShowDialogCourse(index)}
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
										open={showDialogCourse}
										handleCloseDialog={() => setShowDialogCourse(false)}
										handleAgreement={handleDeleteCourse}
									/>
								</Grid>
								{showDetails[index] && (
									<>
										<Grid item xs={6}>
											<CustomTextField
												fullWidth
												label="Course"
												variant="filled"
												color="secondary"
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
												color="secondary"
												name={`institution;-;${index}`}
												value={course.institution}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={3}>
											<CustomDatePicker
												selectedDate={course.start_date ? new Date(course.start_date) : null}
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
												selectedDate={course.end_date ? new Date(course.end_date) : null}
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
					<Grid
						item
						xs={6}
						sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '16px' }}
					>
						<LinkTypography onClick={handleAddCourse}>
							+ Add another Course
						</LinkTypography>
					</Grid>
				</Grid>
			</CustomBox>
		</Container>
	);
};

export default CourseSection;
