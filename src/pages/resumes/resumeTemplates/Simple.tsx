import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useResume } from '../../../components/context/ResumeContext';
import {
	CustomPaper,
	TitleTypography,
	PointTypography,
	TextTypography,
	LinkTypography,
} from './simpleStyles';
import * as INTR from '../../../components/interfaces/ResumeInterfaces';

const Simple = () => {
	const { resume } = useResume();
	const skillMarks = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];
	const languageMarks = ['Basic', 'Conversional', 'Intermediate', 'Fluent', 'Expert / Native'];
	
	const [fieldPersonalDetails, setFieldPersonalDetails] = useState<INTR.PersonalDetails | null>(null);
	const [fieldLink, setFieldLink] = useState<INTR.Link | null>(null);
	const [fieldSkill, setFieldSkill] = useState<INTR.Skill | null>(null);
	const [fieldLanguage, setFieldLanguage] = useState<INTR.Language | null>(null);
	const [fieldInternShip, setFieldInternShip] = useState<INTR.InternShip | null>(null);
	const [fieldEmployment, setFieldEmployment] = useState<INTR.Employment | null>(null);
	const [fieldEducation, setFieldEducation] = useState<INTR.Education | null>(null);
	const [fieldCustom, setFieldCustom] = useState<INTR.Custom | null>(null);
	const [fieldCourse, setFieldCourse] = useState<INTR.Course | null>(null);
  
	
	useEffect(() => {
		if (resume){
			for (const field of resume.fields) {
				switch (field.type) {
					case 'Personal':
						setFieldPersonalDetails(field as INTR.PersonalDetails);
						break;
					case 'Link':
						setFieldLink(field as INTR.Link);
						break;
					case 'Skill':
						setFieldSkill(field as INTR.Skill);
						break;
					case 'Language':
						setFieldLanguage(field as INTR.Language);
						break;
					case 'InternShip':
						setFieldInternShip(field as INTR.InternShip);
						break;
					case 'Employment':
						setFieldEmployment(field as INTR.Employment);
						break;
					case 'Education':
						setFieldEducation(field as INTR.Education);
						break;
					case 'Custom':
						setFieldCustom(field as INTR.Custom);
						break;
					case 'Course':
						setFieldCourse(field as INTR.Course);
						break;
					default:
						setFieldPersonalDetails(field as INTR.PersonalDetails);
						break;
				}
			}
		}
	}, [resume]);
	return (
		<Box>
			<CustomPaper>
				<Grid container spacing={1}>
					{resume?.fields.map((field, index: number) => (
						<Grid item container xs={12} key={index} spacing={2}>
							{field.type === 'Personal' && fieldPersonalDetails && (
								<>
									<Grid item xs={12}>
										<TitleTypography>
											{fieldPersonalDetails.first_name} {fieldPersonalDetails.last_name}, {fieldPersonalDetails.job_title}
										</TitleTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography>{fieldPersonalDetails.email}</PointTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography sx={{ textAlign: 'right' }}>
											{fieldPersonalDetails.city}, {fieldPersonalDetails.country}
										</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldPersonalDetails.phone}</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12} container spacing={1}>
										<Grid item xs={3}>
											<PointTypography>{fieldPersonalDetails.summary[0]}</PointTypography>
										</Grid>
										<Grid item xs={9}>
											<TextTypography>{fieldPersonalDetails.summary[1]}</TextTypography>
										</Grid>
									</Grid>
								</>
							)}
							{field.type === 'Education' && fieldEducation && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldEducation.field_name}</PointTypography>
									</Grid>
									{fieldEducation.schools.map((school: INTR.Education_Section, sindex: number) => (
										<Grid item xs={12} container spacing={1} key={sindex}>
											<Grid item xs={3}>
												{school.start_date && (
													<TextTypography>
														{new Date(
															school.start_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
														{' - '}
														{new Date(
															school.end_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
													</TextTypography>
												)}
											</Grid>
											<Grid item xs={6}>
												<PointTypography>
													{school.degree_title}, {school.school_name}
												</PointTypography>
											</Grid>
											<Grid item xs={3}>
												<PointTypography sx={{ textAlign: 'right' }}>
													{school.city}
												</PointTypography>
											</Grid>
											<Grid item xs={3}></Grid>
											<Grid item xs={9}>
												<TextTypography>
													{school.description}
												</TextTypography>
											</Grid>
										</Grid>
									))}
								</>
							)}
							{field.type === 'Employment' && fieldEmployment && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldEmployment.field_name}</PointTypography>
									</Grid>
									{fieldEmployment.employments.map((record: INTR.Employment_Section, eindex: number) => (
										<Grid item xs={12} container spacing={1} key={eindex}>
											<Grid item xs={3}>
												{record.start_date && (
													<TextTypography>
														{new Date(
															record.start_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
														{' - '}
														{new Date(
															record.end_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
													</TextTypography>
												)}
											</Grid>
											<Grid item xs={6}>
												<PointTypography>
													{record.job_title}, {record.employer_name}
												</PointTypography>
											</Grid>
											<Grid item xs={3}>
												<PointTypography sx={{ textAlign: 'right' }}>
													{record.city}
												</PointTypography>
											</Grid>
											<Grid item xs={3}></Grid>
											<Grid item xs={9}>
												<TextTypography>
													{record.description}
												</TextTypography>
											</Grid>
										</Grid>
									))}
								</>
							)}
							{field.type === 'Link' && fieldLink && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldLink.field_name}</PointTypography>
									</Grid>
									<Grid item xs={9} container>
										{fieldLink.links.map((link: INTR.Link_Section, lindex: number) => (
											<LinkTypography
												key={lindex}
												onClick={() => window.open(link.url, '_blank')}
											>
												{link.webite_name}
											</LinkTypography>
										))}
									</Grid>
								</>
							)}
							{field.type === 'Skill' && fieldSkill && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldSkill.field_name}</PointTypography>
									</Grid>
									{fieldSkill.skills.map((skill: INTR.Skill_Section, sindex: number) => (
										<React.Fragment key={sindex}>
											{sindex > 1 && sindex % 2 === 0 && (
												<Grid item xs={3}></Grid>
											)}
											<Grid
												item
												xs={4.5}
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<PointTypography>
													{skill.skill_name}
												</PointTypography>
												<TextTypography sx={{ textAlign: 'right' }}>
													{skillMarks[skill.level - 1]}
												</TextTypography>
											</Grid>
										</React.Fragment>
									))}
								</>
							)}
							{field.type === 'Language' && fieldLanguage && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldLanguage.field_name}</PointTypography>
									</Grid>
									{fieldLanguage.languages.map((lng: INTR.Language_Section, linkdex: number) => (
										<React.Fragment key={linkdex}>
											{linkdex > 1 && linkdex % 2 === 0 && (
												<Grid item xs={3}></Grid>
											)}
											<Grid
												item
												xs={4.5}
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
												}}
											>
												<PointTypography>{lng.language}</PointTypography>
												<TextTypography sx={{ textAlign: 'right' }}>
													{languageMarks[lng.level - 1]}
												</TextTypography>
											</Grid>
										</React.Fragment>
									))}
								</>
							)}
							{field.type === 'InternShip' && fieldInternShip && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldInternShip.field_name}</PointTypography>
									</Grid>
									{fieldInternShip.internships.map((record: INTR.InternShip_Section, nindex: number) => (
										<Grid item xs={12} container spacing={1} key={nindex}>
											<Grid item xs={3}>
												{record.start_date && (
													<TextTypography>
														{new Date(
															record.start_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
														{' - '}
														{new Date(
															record.end_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
													</TextTypography>
												)}
											</Grid>
											<Grid item xs={6}>
												<PointTypography>
													{record.job_title}, {record.employer_name}
												</PointTypography>
											</Grid>
											<Grid item xs={3}>
												<PointTypography sx={{ textAlign: 'right' }}>
													{record.city}
												</PointTypography>
											</Grid>
											<Grid item xs={3}></Grid>
											<Grid item xs={9}>
												<TextTypography>
													{record.description}
												</TextTypography>
											</Grid>
										</Grid>
									))}
								</>
							)}
							{field.type === 'Course' && fieldCourse && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldCourse.field_name}</PointTypography>
									</Grid>
									{fieldCourse.courses.map((course: INTR.Course_Section, cindex: number) => (
										<Grid item xs={12} container spacing={1} key={cindex}>
											<Grid item xs={3}>
												{course.start_date && (
													<TextTypography>
														{new Date(
															course.start_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
														{' - '}
														{new Date(
															course.end_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
													</TextTypography>
												)}
											</Grid>
											<Grid item xs={9}>
												<PointTypography>
													{course.course_name}, {course.institution}
												</PointTypography>
											</Grid>
											<Grid item xs={3}></Grid>
											<Grid item xs={9}>
												<TextTypography>
													{course.description}
												</TextTypography>
											</Grid>
										</Grid>
									))}
								</>
							)}
							{field.type === 'Custom' && fieldCustom && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldCustom.field_name}</PointTypography>
									</Grid>
									{fieldCustom.activities.map((activity: INTR.Custom_Section, aindex: number) => (
										<Grid item xs={12} container spacing={1} key={aindex}>
											<Grid item xs={3}>
												{activity.start_date && (
													<TextTypography>
														{new Date(
															activity.start_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
														{' - '}
														{new Date(
															activity.end_date,
														).toLocaleDateString('en-US', {
															year: 'numeric',
															month: 'short',
														})}
													</TextTypography>
												)}
											</Grid>
											<Grid item xs={6}>
												<PointTypography>
													{activity.activity_title}
												</PointTypography>
											</Grid>
											<Grid item xs={3}>
												<PointTypography sx={{ textAlign: 'right' }}>
													{activity.city}
												</PointTypography>
											</Grid>
											<Grid item xs={3}></Grid>
											<Grid item xs={9}>
												<TextTypography>
													{activity.description}
												</TextTypography>
											</Grid>
										</Grid>
									))}
								</>
							)}
						</Grid>
					))}
				</Grid>
			</CustomPaper>
		</Box>
	);
};

export default Simple;
