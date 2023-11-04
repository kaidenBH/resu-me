import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import { useResume } from '../../../components/context/ResumeContext';
import {
	CustomPaper,
	TitleTypography,
	PointTypography,
	TextTypography,
	LinkTypography,
} from './simpleStyles';
import jsPDF from 'jspdf';

const Simple = () => {
	const { resume } = useResume();
	const skillMarks = ['Novice', 'Beginner', 'Skillful', 'Experienced', 'Expert'];
	const languageMarks = ['Basic', 'Conversional', 'Intermediate', 'Fluent', 'Expert / Native'];

	const generatePDF = () => {
		const doc = new jsPDF();

		// Add content to the PDF (similar to what you displayed on the page)
		resume?.fields.forEach((field, index) => {
			if (field.type === 'Personal') {
				doc.text(20, 10 + index * 50, `Field Name: ${field.field_name}`);
				// Add other details similarly
			}
		});

		// Save the document
		doc.save('resume.pdf');
	};

	return (
		<Box>
			{/*<Button
				variant="contained"
				color="primary"
				onClick={generatePDF}
				sx={{ marginBottom: '32px' }}
			>
				Download as PDF
			</Button>*/}
			<CustomPaper>
				<Grid container spacing={1}>
					{resume?.fields.map((field: object, index: number) => (
						<Grid item container xs={12} key={index} spacing={2}>
							{field.type === 'Personal' && (
								<>
									<Grid item xs={12}>
										<TitleTypography>
											{field.first_name} {field.last_name}, {field.job_title}
										</TitleTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography>{field.email}</PointTypography>
									</Grid>
									<Grid item xs={6}>
										<PointTypography sx={{ textAlign: 'right' }}>
											{field.city}, {field.country}
										</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.phone}</PointTypography>
									</Grid>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12} container spacing={1}>
										<Grid item xs={3}>
											<PointTypography>{field.summary[0]}</PointTypography>
										</Grid>
										<Grid item xs={9}>
											<TextTypography>
												{field.summary[1]}
											</TextTypography>
										</Grid>
									</Grid>
								</>
							)}
							{field.type === 'Education' && (
								<>
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.schools.map((school: object, sindex: number) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.employments.map((record: object, eindex: number) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									<Grid item xs={9} container>
										{field.links.map((link: object, lindex) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.skills.map((skill: object, sindex) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={3}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.languages.map((lng: object, linkdex) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.internships.map((record: object, nindex: number) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.courses.map((course: object, cindex: number) => (
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
									<Grid item xs={12}>
										<Box borderBottom={1} sx={{ borderColor: '#B2B2B2' }} />
									</Grid>
									<Grid item xs={12}>
										<PointTypography>{field.field_name}</PointTypography>
									</Grid>
									{field.activities.map((activity: object, aindex: number) => (
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
