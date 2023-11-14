import React, { useState, useEffect } from 'react';
import { Grow, Grid, Paper, Typography, IconButton, Box, Tooltip  } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonalSection from './PersonalSection';
import EmploymentSection from './EmploymentSection';
import EducationSection from './EducationSection';
import LinkSection from './LinkSection';
import SkillSection from './SkillSection';
import LanguageSection from './LanguageSection';
import InternShipSection from './InternShipSection';
import CourseSection from './CourseSection';
import CustomSection from './CustomSection';
import { useResume } from '../../../components/context/ResumeContext';
import { CustomTypography, LinkTypography } from './styles';
import { useNavigate } from 'react-router-dom';
import {
	useEducation,
	useEmployment,
	useLink,
	useSkill,
	useLanguage,
	useInternShip,
	useCourse,
	useCustom,
} from '../../../components/hooks';
import * as INTR from '../../../components/interfaces/ResumeInterfaces';
  
const ResumeEditPage: React.FC = () => {
	const navigate = useNavigate();
	const { addSchool } = useEducation();
	const { addEmploymentRecord } = useEmployment();
	const { addLink } = useLink();
	const { addSkill } = useSkill();
	const { addLanguage } = useLanguage();
	const { addInternShipRecord } = useInternShip();
	const { addCourse } = useCourse();
	const { createCustomActivity } = useCustom();
	const { resume, reOrderResume } = useResume();
	const [sections, setSections] = useState({
		Education: false,
		Employment: false,
		Link: false,
		Skill: false,
		Language: false,
		InternShip: false,
		Course: false,
	});
	
	const handleAddEducation = async () => {
		if (resume) await addSchool(resume._id);
	};
	const handleAddEmployment = async () => {
		if (resume) await addEmploymentRecord(resume._id);
	};
	const handleAddLink = async () => {
		if (resume) await addLink(resume._id);
	};
	const handleAddSkill = async () => {
		if (resume) await addSkill(resume._id);
	};
	const handleAddLanguage = async () => {
		if (resume) await addLanguage(resume._id);
	};
	const handleAddInernShip = async () => {
		if (resume) await addInternShipRecord(resume._id);
	};
	const handleAddCourse = async () => {
		if (resume) await addCourse(resume._id);
	};
	const handleAddCustom = async () => {
		if (resume) await createCustomActivity(resume._id);
	};

	const handleMoveUp = (index: number) => {
		if (index > 0 && resume) {
			reOrderResume(resume?._id, index, index - 1);
		}
	};

	const handleMoveDown = (index: number) => {
		if (resume && index < resume.fields.length - 1) {
			reOrderResume(resume._id, index, index + 1);
		}
	};

	useEffect(() => {
		if (resume) {
			const updatedSections: INTR.UpdatedSections = {
				Education: false,
				Employment: false,
				Link: false,
				Skill: false,
				Language: false,
				InternShip: false,
				Course: false,
			};

			resume.fields.forEach((field) => {
				const type = field.type;
				if (type && Object.prototype.hasOwnProperty.call(updatedSections, type)) {
					updatedSections[type] = true;
				}
			});
			setSections(updatedSections);
		}
	}, [resume]);

	return (
		<Grow in={true}>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100vh',
					zIndex: '4',
					overflowY: 'scroll',
					'&::-webkit-scrollbar': {
						width: '0 !important' /* Hide the scrollbar for WebKit */,
					},
				}}
			>
				<CustomTypography
					variant="h4"
					sx={{
						position: 'fixed',
						top: 0,
						margin: '0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: 'white',
						width: '49vw',
						height: '9rem',
						zIndex: '9',
					}}
				>
					<Tooltip title="Go back to main page" arrow>
						<IconButton
							onClick={() => navigate('/')}
							sx={{ color: '#687EFF', '&:focus': { outline: 'none' } }}
						>
							<ArrowBackIcon fontSize="large" />
						</IconButton>
					</Tooltip>
					{resume?.title}
					<span
						style={{
							position: 'absolute',
							bottom: 0,
							left: '10%',
							width: '80%',
							borderBottom: '2px solid #ccc',
						}}
					/>
				</CustomTypography>
				<Grid
					container
					sx={{ marginTop: '10rem', display: 'flex', justifyContent: 'center' }}
				>
					{resume &&
						resume.fields.map((field, index) => (
							<Grid
								item
								xs={12}
								key={index}
								sx={{
									position: 'relative',
									display: 'grid',
									gridTemplateColumns: '1fr 4fr 2fr',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-evenly',
									}}
								>
									<Tooltip title="Move this section up" arrow>
										<IconButton
											disabled={
												field.type === resume.fields[1].type ||
												field.type === 'Personal'
											}
											onClick={() => handleMoveUp(index)}
											sx={{ color: '#687EFF', '&:focus': { outline: 'none' } }}
										>
											<ExpandLessIcon fontSize="large" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Move this section down" arrow>
										<IconButton
											disabled={
												field.type ===
													resume.fields[resume.fields.length - 1].type ||
												field.type === 'Personal'
											}
											onClick={() => handleMoveDown(index)}
											sx={{ color: '#687EFF', '&:focus': { outline: 'none' } }}
										>
											<ExpandMoreIcon fontSize="large" />
										</IconButton>
									</Tooltip>
								</Box>
								{field.type === 'Personal' && (
									<PersonalSection personal_section={field as INTR.PersonalDetails} />
								)}
								{field.type === 'Education' && (
									<EducationSection education_section={field as INTR.Education} />
								)}
								{field.type === 'Employment' && (
									<EmploymentSection employment_section={field as INTR.Employment} />
								)}
								{field.type === 'Link' && (
									<LinkSection link_section={field as INTR.Link} />
								)}
								{field.type === 'Skill' && (
									<SkillSection skill_section={field as INTR.Skill} />
								)}
								{field.type === 'Language' && (
									<LanguageSection language_section={field as INTR.Language} />
								)}
								{field.type === 'InternShip' && (
									<InternShipSection internship_section={field as INTR.InternShip} />
								)}
								{field.type === 'Course' && (
									<CourseSection course_section={field as INTR.Course} />
								)}
								{field.type === 'Custom' && (
									<CustomSection customActivity_section={field as INTR.Custom} />
								)}
							</Grid>
						))}
					<span
						style={{
							width: '80%',
							borderBottom: '2px solid #ccc',
						}}
					/>
					<Grid item xs={6} sx={{ marginTop: '3rem', marginBottom: '5rem' }}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Education ? handleAddEducation : undefined}
									sx={{
										color: !sections.Education ? '#687EFF' : '#ccc',
										cursor: !sections.Education ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Education ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Education
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Employment ? handleAddEmployment : undefined}
									sx={{
										color: !sections.Employment ? '#687EFF' : '#ccc',
										cursor: !sections.Employment ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Employment ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Employment
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Link ? handleAddLink : undefined}
									sx={{
										color: !sections.Link ? '#687EFF' : '#ccc',
										cursor: !sections.Link ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Link ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Links
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Skill ? handleAddSkill : undefined}
									sx={{
										color: !sections.Skill ? '#687EFF' : '#ccc',
										cursor: !sections.Skill ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Skill ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Skill
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Language ? handleAddLanguage : undefined}
									sx={{
										color: !sections.Language ? '#687EFF' : '#ccc',
										cursor: !sections.Language ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Language ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Lnaguage
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.InternShip ? handleAddInernShip : undefined}
									sx={{
										color: !sections.InternShip ? '#687EFF' : '#ccc',
										cursor: !sections.InternShip ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.InternShip ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add InternShip
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<Typography
									onClick={!sections.Course ? handleAddCourse : undefined}
									sx={{
										color: !sections.Course ? '#687EFF' : '#ccc',
										cursor: !sections.Course ? 'pointer' : 'default',
										'&:hover': {
											color: !sections.Course ? '#EF6262' : '#ccc',
										},
									}}
								>
									+ Add Course
								</Typography>
							</Grid>
							<Grid item xs={6}>
								<LinkTypography onClick={handleAddCustom}>
									+ Add Custom Section
								</LinkTypography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grow>
	);
};

export default ResumeEditPage;
