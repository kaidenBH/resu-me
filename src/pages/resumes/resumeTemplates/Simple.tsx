import React from 'react';
import { Paper, Button, Box, Grid } from '@mui/material';
import { useResume } from '../../../components/context/ResumeContext';
import jsPDF from 'jspdf';

const Simple = () => {
  const { resume } = useResume();
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
    <Box sx={{ 
      overflow: 'auto',
      position: 'relative',
      margin: '2rem',
      right: -470,
     }}>
      <Button variant="contained" color="primary" onClick={generatePDF} sx={{ marginBottom: '32px' }}>
        Download as PDF
      </Button>
      <Paper
        style={{
          width: '210mm', // A4 width in millimeters
          height: '297mm', // A4 height in millimeters
          padding: '1rem',
        }}
      >
        <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
          {resume?.fields.map((field, index) => (
            <Grid item xs={12} key={index}>
              {field.type === 'Personal' && (
                <div>
                  <h2>{field.field_name}</h2>
                  <p>Job Title: {field.job_title}</p>
                  <p>Name: {`${field.first_name} ${field.last_name}`}</p>
                  <p>Email: {field.email}</p>
                  <p>Phone: {field.phone}</p>
                  <p>Country: {field.country}</p>
                  <p>City: {field.city}</p>
                  <p>Summary: {field.summary.join(' ')}</p>
                </div>
              )}
              {/* Add similar blocks for other field types */}
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Simple;
