import React, { useState } from 'react';
import { Box, Slide } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import SignUp, { SignUpFormData } from './SignUp';
import SignIn, { SignInFormData } from './SignIn';
import Slider from './Slider';

const Sign = () => {
	const { signIn, signUp } = useAuth();
	const [haveAccount, setHaveAccount] = useState(true);

	const SignUpFormData = async (formData: SignUpFormData) => {
		await signUp(formData);
	};
	const SignInFormData = async (formData: SignInFormData) => {
		await signIn(formData);
	};
	const SlideEffect = () => {
		setHaveAccount(!haveAccount);
		console.log('Button clicked', haveAccount);
	};
	return (
		<Slide direction="right" in={true} timeout={600}>
			<Box sx={{ display: 'flex', padding: 0 }}>
				<Slider onSubmit={() => SlideEffect()} haveAccount={haveAccount} />
				{haveAccount ? (
					<>
						<SignIn onSubmit={SignInFormData} />
					</>
				) : (
					<>
						<SignUp onSubmit={SignUpFormData} />
					</>
				)}
			</Box>
		</Slide>
	);
};

export default Sign;
