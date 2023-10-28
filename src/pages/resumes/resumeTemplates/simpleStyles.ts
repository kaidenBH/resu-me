import { styled } from '@mui/material/styles';
import { Typography, Paper } from '@mui/material';

export const CustomPaper = styled(Paper)({
	width: '216mm', // A4 width in millimeters
    height: '279mm', // A4 height in millimeters
    padding: '12mm',
	borderRadius: 0,
});

export const TitleTypography = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	fontSize: '16px',
	fontWeight: 800,
	color: '#272829',
	margin: 0,
}));
export const PointTypography = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	textAlign: 'left',
	fontSize: '14px',
	fontWeight: 600,
	color: '#272829',
	margin: 0,
}));
export const TextTypography = styled(Typography)(({ theme }) => ({
	fontFamily: theme.typography.fontFamily,
	textAlign: 'left',
	fontSize: '12px',
	fontWeight: 500,
	color: '#272829',
	margin: 0,
}));
export const LinkTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
	textAlign: 'left',
	fontSize: '14px',
    fontWeight: 700,
    color: '#687EFF',
    cursor: 'pointer',
	margin: '0 8px 0 0'
}));