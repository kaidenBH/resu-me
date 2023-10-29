import { styled } from '@mui/material/styles';
import { Button, Typography, TextField, Paper } from '@mui/material';

export const MainButton = styled(Button)({
	background: '#F58840',
	color: 'white',
	borderRadius: '50px',
	fontWeight: 600,
	'&:hover': {
		background: '#F5A962',
	},
});

export const SecondaryButton = styled(Button)({
	background: 'transparent',
	color: '#F58840',
	borderRadius: '50px',
	border: 'solid 2px',
	borderColor: '#F58840',
	fontWeight: 600,
	width: '8rem',
	'&:hover': {
		background: '#F5A962',
		color: 'white',
	},
});

export const CustomPaper = styled(Paper)({
	height: '30rem',
	padding: '20px',
	background: '#F9F9F9',
	display: 'flex',
});

export const CustomSlidePaper = styled(Paper)({
	height: '30rem',
	padding: '20px',
	background: '#232D3F',
});

export const CustomTextField = styled(TextField)({
	background: '#DDE6ED',
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

export const CustomSlidingTypography = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	animation: 'pop 0.5s ease',
	'@keyframes pop': {
		'0%': { transform: 'scale(1)' },
		'50%': { transform: 'scale(1.1)' },
		'100%': { transform: 'scale(1)' },
	},
	fontWeight: 800,
	color: 'white',
	margin: '2rem 0',
}));
