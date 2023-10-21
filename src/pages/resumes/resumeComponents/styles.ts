import { styled } from '@mui/material/styles';
import { Button, Typography, TextField, Paper } from '@mui/material';

export const CustomPaper = styled(Paper)({
	padding: '20px',
	boxShadow: 'none',
});

export const CustomTextField = styled(TextField)({
	background: '#DDE6ED',
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
	margin: '1rem',
}));

export const LinkTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    color: '#687EFF',
    cursor: 'pointer',
    '&:hover': {
        color: '#EF6262',
    },
}));