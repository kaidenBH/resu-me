import React from 'react'
import { Grow, Grid, Paper } from '@mui/material';
import PersonalSection from './PersonalSection';
import EmploymentSection from './EmploymentSection';
import EducationSection from './EducationSection';
import LinkSection from './LinkSection';
import SkillSection from './SkillSection';
import { useResume } from '../../../components/context/ResumeContext';
import { CustomTypography } from './styles';
import LanguageSection from './LanguageSection';

const ResumeEditPage: React.FC  = () => {
  const { resume } = useResume();
  return (
    <Grow in={true}>
        <Paper sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          left: 0,
          top: 0,
          width: '50vw',
          height: '100vh',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0 !important', /* Hide the scrollbar for WebKit */
          },
        }}>
          <CustomTypography variant="h4" sx={{ 
            position: 'fixed', 
            top: 0, 
            margin: '0', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white', 
            width: '50vw', 
            height: '9rem',
            zIndex: '9',
          }}>{resume?.title}
          <span style={{
            position: 'absolute',
            bottom: 0,
            left: '10%',
            width: '80%',
            borderBottom: '2px solid #ccc',
            content: '""'
          }} />
          </CustomTypography>
          <Grid container sx={{ marginTop:'10rem' }}>
          {resume && resume.fields.map((field, index) => (
            <Grid item xs={12} key={index}>
              {field.type === 'Personal' && (
                <PersonalSection personal_section={field} />
              )}
              {field.type === 'Education' && (
                <EducationSection education_section={field} />
              )}
              {field.type === 'Employment' && (
                <EmploymentSection employment_section={field} />
              )}
              {field.type === 'Link' && (
                <LinkSection link_section={field} />
              )}
              {field.type === 'Skill' && (
                <SkillSection skill_section={field} />
              )}
              {field.type === 'Language' && (
                <LanguageSection language_section={field} />
              )}
            </Grid>
          ))}
          </Grid>
        </Paper>
    </Grow>
  )
}

export default ResumeEditPage