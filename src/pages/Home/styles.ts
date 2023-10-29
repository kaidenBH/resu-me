import { styled } from '@mui/material/styles';
import { Avatar, Box, Button, Typography, TextField, Paper } from '@mui/material';

export const CustomAvatar = styled(Avatar)(({ theme }) => ({
	color: theme.palette.getContrastText('#363062'),
	backgroundColor: '#363062',
	height: '100px',
	width: '100px',
}));

export const CustomSideBar = styled(Box)({
	height: '100vh',
	padding: '2rem',
	borderRadius: '0 20px',
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

export const LinkTypography = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontWeight: 400,
	color: '#3876BF',
	margin: '0',
	'&:hover': {
		color: '#646cffaa',
	},
	'&:active': {
		color: '#F58840',
	},
}));

export const ConfirmButton = styled(Button)({
	background: '#03C988',
	color: 'white',
	borderRadius: '50px',
	fontWeight: 600,
	'&:hover': {
		background: '#0E8388',
	},
});

export const LogOutButton = styled(Button)({
	background: 'transparent',
	color: '#F58840',
	borderRadius: '50px',
	border: 'solid 2px',
	borderColor: '#F58840',
	fontWeight: 600,
	width: '8rem',
	boxShadow: 'none',
	'&:hover': {
		background: '#B85C38',
		color: 'white',
	},
});

export const ProType = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	animation: 'pop 0.5s ease',
	'@keyframes pop': {
		'0%': { transform: 'scale(1)' },
		'50%': { transform: 'scale(1.1)' },
		'100%': { transform: 'scale(1)' },
	},
	fontWeight: 1000,
	fontSize: '1rem',
	color: '#687EFF',
	margin: '2rem 0',
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
	fontSize: '1rem',
	color: '#03C988',
	margin: '2rem 0',
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
	fontSize: '1rem',
	color: '#A76F6F',
	margin: '2rem 0',
}));
