import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Container } from '@mui/material';
import { CustomTextField, CustomTypography, CustomPaper } from './styles';

interface personalSectionForm {
    type: string;
    _id: string;
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
    summary: [string, string | null];
}

interface PersonalSectionProps {
    personal_section: personalSectionForm; 
}

const PersonalSection: React.FC<PersonalSectionProps> = ({ personal_section }) => {
    const [personalData, setPersonalData] = useState<personalSectionForm>({
        type: personal_section.type || '',
        _id: personal_section._id || '',
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
            personal_section.summary[0] || 'Professional Summary', 
            personal_section.summary[1] || ''
        ],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setPersonalData({
			...personalData,
			[name]: value,
		});
	};

  return (
    <Container style={{ padding: 0 }} maxWidth="xs">
		<CustomPaper
			sx={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '30vw' }}
		>
			<Grid container spacing={2}>
			    <CustomTypography variant="h6">{personal_section.field_name}</CustomTypography>
				<Grid item xs={12}>
					<CustomTextField
						fullWidth
						label="Job Title"
						variant="outlined"
						name="job_title"
						value={personalData.job_title}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="First Name"
						variant="outlined"
						name="first_name"
						value={personalData.first_name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Last Name"
						variant="outlined"
						name="last_name"
						value={personalData.last_name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Email"
						variant="outlined"
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
						variant="outlined"
						name="phone"
						value={personalData.phone}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="Country"
						variant="outlined"
						name="country"
						value={personalData.country}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<CustomTextField
						fullWidth
						label="City"
						variant="outlined"
						name="city"
						value={personalData.city}
						onChange={handleChange}
					/>
				</Grid>
                <CustomTypography variant="h6" sx={{ marginTop:'2rem', marginBottom:'0' }}>{personal_section.summary[0]}</CustomTypography>
                {/*<Grid item xs={12}>
                    <CustomTextField
                        fullWidth
                        label="Professional Summary"
                        variant="outlined"
                        name="summary[0]"  // Update the name to reflect the correct field in personalData
                        value={personalData.summary[0]}
                        onChange={handleChange}
                    />
                </Grid>*/}
                <Grid item xs={12}>
                    <CustomTextField
                        fullWidth
                        label="About yourself and the work you do ..."
                        variant="outlined"
                        name="summary[1]"  // Update the name to reflect the correct field in personalData
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