import React from 'react'
import { Grow, Grid, Paper } from '@mui/material';
import PersonalSection from './PersonalSection';
import EmploymentSection from './EmploymentSection';
import { useResume } from '../../../components/context/ResumeContext';
import { CustomTypography } from './styles';

const ResumeEditPage: React.FC  = () => {
  const { resume } = useResume();
  return (
    <Grow in={true}>
        <Paper sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          left: 0,
          top: 0,
          width: '50vw',
          height: '97vh',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0 !important', /* Hide the scrollbar for WebKit */
          },
        }}>
          <CustomTypography variant="h4" sx={{ 
            position: 'fixed', 
            top: 0, 
            margin: '0', 
            background: 'white', 
            width: '50vw', 
            height: '4rem',
            zIndex: '9' 
          }}>{resume?.title}</CustomTypography>
          <Grid container spacing={2} sx={{ marginTop:'2rem' }}>
            <Grid item xs={12}>
              <PersonalSection personal_section={resume?.fields[0]}/>
            </Grid>
            <Grid item xs={12}>
              <EmploymentSection employment_section={resume?.fields[2]}/>
            </Grid>
            <Grid item xs={12}>
              <PersonalSection personal_section={resume?.fields[0]}/>
            </Grid>
            <Grid item xs={12}>
              <PersonalSection personal_section={resume?.fields[0]}/>
            </Grid>
          </Grid>
        </Paper>
    </Grow>
  )
}

export default ResumeEditPage