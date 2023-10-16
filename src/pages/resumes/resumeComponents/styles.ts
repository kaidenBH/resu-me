import { styled } from '@mui/material/styles';
import { Button, Typography, TextField, Paper } from '@mui/material';

export const CustomPaper = styled(Paper)({
	height: '30rem',
	padding: '20px',
	background: '#F9F9F9',
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
	color: '#272829',
	margin: '2rem 0',
}));
