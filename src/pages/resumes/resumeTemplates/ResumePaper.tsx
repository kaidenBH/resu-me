import { CustomPaper } from './simpleStyles';
import { Grid } from '@mui/material';

const ResumePaper = ({ children }) => {
	return (
		<CustomPaper>
			<Grid container spacing={1}>
				{children}
			</Grid>
		</CustomPaper>
	);
};
export default ResumePaper;
