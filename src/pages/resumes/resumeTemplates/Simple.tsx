import React from 'react';
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
	let fieldType = null;

	return (
		<Box>
			<CustomPaper>
				<Grid container spacing={1}>
					{resume?.fields.map((field, index: number) => (
						<Grid item container xs={12} key={index} spacing={2}>
							{field.type === 'Personal' && (
								<>
									{fieldType = field as INTR.PersonalDetails}
									<Grid item xs={12}>
										<TitleTypography>
											{fieldType.first_name} {fieldType.last_name}, {fieldType.job_title}
										</TitleTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography>{fieldType.email}</PointTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography sx={{ textAlign: 'right' }}>
											{fieldType.city}, {fieldType.country}
										</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.phone}</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12} container spacing={1}>
										<Grid item xs={3}>
											<PointTypography>{fieldType.summary[0]}</PointTypography>
										</Grid>
										<Grid item xs={9}>
											<TextTypography>{fieldType.summary[1]}</TextTypography>
										</Grid>
									</Grid>
								</>
							)}
							{field.type === 'Education' && (
								<>
									{fieldType = field as INTR.Education}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.schools.map((school: INTR.Education_Section, sindex: number) => (
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
							{field.type === 'Employment' && (
								<>
									{fieldType = field as INTR.Employment}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.employments.map((record: INTR.Employment_Section, eindex: number) => (
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
							{field.type === 'Link' && (
								<>
									{fieldType = field as INTR.Link}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									<Grid item xs={9} container>
										{fieldType.links.map((link: INTR.Link_Section, lindex: number) => (
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
							{field.type === 'Skill' && (
								<>
									{fieldType = field as INTR.Skill}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.skills.map((skill: INTR.Skill_Section, sindex: number) => (
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
							{field.type === 'Language' && (
								<>
									{fieldType = field as INTR.Language}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.languages.map((lng: INTR.Language_Section, linkdex: number) => (
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
							{field.type === 'InternShip' && (
								<>
									{fieldType = field as INTR.InternShip}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.internships.map((record: INTR.InternShip_Section, nindex: number) => (
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
							{field.type === 'Course' && (
								<>
									{fieldType = field as INTR.Course}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.courses.map((course: INTR.Course_Section, cindex: number) => (
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
							{field.type === 'Custom' && (
								<>
									{fieldType = field as INTR.Custom}
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{fieldType.field_name}</PointTypography>
									</Grid>
									{fieldType.activities.map((activity: INTR.Custom_Section, aindex: number) => (
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
