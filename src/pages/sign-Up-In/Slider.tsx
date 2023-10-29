import React from 'react';
import { Grid, Container } from '@mui/material';
import { SecondaryButton, CustomSlidingTypography, CustomSlidePaper } from './styles';

interface SliderProps {
	onSubmit: () => void;
	haveAccount: boolean;
}

const Slider: React.FC<SliderProps> = ({ onSubmit, haveAccount }) => {
	return (
		<Container style={{ padding: 0 }} maxWidth="xs">
			<CustomSlidePaper sx={{ borderRadius: '15px 0 0 15px' }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ textAlign: 'center' }}>
						<CustomSlidingTypography variant="h4">
							{haveAccount ? "Don't Have an account!" : 'Have an account!'}
						</CustomSlidingTypography>
					</Grid>
					<Grid item xs={12} sx={{ textAlign: 'center' }}>
						<CustomSlidingTypography variant="h6">
							{haveAccount
							? 'Click here to Sign up a new account'
							: 'Click here to Sign in to your account'}
						</CustomSlidingTypography>
					</Grid>
					<Grid item xs={12} sx={{ textAlign: 'center' }}>
						<SecondaryButton
							variant="contained"
							onClick={onSubmit}
							sx={{ margin: '2rem 0 0 0' }}
						>
							{haveAccount ? 'Sign Up' : 'Sign In'}
						</SecondaryButton>
					</Grid>
				</Grid>
			</CustomSlidePaper>

		</Container>
	);
};

export default Slider;
