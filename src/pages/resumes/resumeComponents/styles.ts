import { styled } from '@mui/material/styles';
import { Slider, Typography, TextField, Box } from '@mui/material';

export const CustomBox = styled(Box)({
	padding: '20px',
	boxShadow: 'none',
	width: '35vw',
});

export const CustomTextField = styled(TextField)({
	background: '#ECF2FF',
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

export const CustomSlider = styled(Slider)(({ value }) => ({
	'.MuiSlider-rail': {
		color: '#ccc',
	},
	'.MuiSlider-track': {
		color:
			value === 1
				? '#FF6464'
				: value === 2
				? '#E25E3E'
				: value === 3
				? '#FFBD67'
				: value === 4
				? '#5BE7A9'
				: '#8E8FFA',
	},
	'.MuiSlider-thumb': {
		color:
			value === 1
				? '#FF6464'
				: value === 2
				? '#E25E3E'
				: value === 3
				? '#FFBD67'
				: value === 4
				? '#5BE7A9'
				: '#8E8FFA',
		width: '20px',
		height: '20px',
	},
	height: '12px',
}));
