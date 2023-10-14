import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography, TextField, Paper } from '@mui/material';

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
  color: theme.palette.getContrastText("#363062"),
  backgroundColor: "#363062",
  fontSize: '60px',
  height: '100px',
  width: '100px',
}));

export const CustomSideBar = styled(Box)({
  height: '100vh', 
  padding: '3rem',
  display: 'flex', 
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '0 20px',
  background: '#F9F9F9', 
  position: 'fixed',
  left: 0,
  top: 0,
});

export const CustomSlidePaper = styled(Paper)({
  height: '30rem', 
  padding: '20px', 
  background: '#232D3F', 
});

export const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#61677A', // Adjust the border color
      },
      '&:hover fieldset': {
        borderColor: '#646cffaa', // Adjust the hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#646cffaa', // Adjust the focused border color
      },
    },
});

export const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    animation: 'pop 0.5s ease',
    '@keyframes pop': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    fontWeight: 800,
    color: "#272829",
    margin: "2rem 0",
  }));

export const ProType = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    animation: 'pop 0.5s ease',
    '@keyframes pop': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    fontWeight: 1000,
    fontSize: "1rem",
    color: '#687EFF',
    margin: "2rem 0",
  }));

export const PlusType = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    animation: 'pop 0.5s ease',
    '@keyframes pop': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    fontWeight: 1000,
    fontSize: "1rem",
    color: '#03C988',
    margin: "2rem 0",
  }));

export const BasicType = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    animation: 'pop 0.5s ease',
    '@keyframes pop': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },
    fontWeight: 1000,
    fontSize: "1rem",
    color: '#A76F6F',
    margin: "2rem 0",
  }));