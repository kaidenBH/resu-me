import { styled } from '@mui/material/styles';
import { Button, Typography, TextField } from '@mui/material';

export const MainButton = styled(Button)({
  background: '#ffcc00',
  color: 'white',
  '&:hover': {
    background: '#ff9900',
  },
});

export const CustomTextField = styled(TextField)({
    '& .MuiInputLabel-root': {
      color: '#ff4400', // Adjust the label color
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ff4400', // Adjust the border color
      },
      '&:hover fieldset': {
        borderColor: '#646cffaa', // Adjust the hover border color
        color: '#646cffaa',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#646cffaa', // Adjust the focused border color
        color: '#646cffaa',
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
    fontWeight: 'bold',
    color: "#03001C",
    margin: "1rem 0",
  }));