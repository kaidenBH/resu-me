import { useState, useEffect } from 'react';
import { Grid, Slide } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import SignUp, { SignUpFormData } from './SignUp';
import SignIn, { SignInFormData } from './SignIn';
import Slider from './Slider';

const Sign = () => {
	const { signIn, signUp, checkUser } = useAuth();
	const [haveAccount, setHaveAccount] = useState(true);

	useEffect(() => {
		checkUser();
	}, []);

	const SignUpFormData = async (formData: SignUpFormData) => {
		const { setLoadingSign, ...signUpData } = formData;
		setLoadingSign(true);
		await signUp(signUpData);
		setLoadingSign(false);
	};
	const SignInFormData = async (formData: SignInFormData) => {
		const { setLoadingSign, ...signInData } = formData;
		setLoadingSign(true);
		await signIn(signInData);
		setLoadingSign(false);
	};
	const SlideEffect = () => {
		setHaveAccount(!haveAccount);
	};
	return (
		<Slide direction="right" in={true} timeout={600}>
			<Grid
				container
				spacing={0}
				sx={{
					display: 'felx',
					justifyContent: 'center',
					height: '100vh',
					alignItems: 'center',
				}}
			>
				<Grid item>
					<Slider onSubmit={() => SlideEffect()} haveAccount={haveAccount} />
				</Grid>
				<Grid item>
					{haveAccount ? (
						<>
							<SignIn onSubmit={SignInFormData} />
						</>
					) : (
						<>
							<SignUp onSubmit={SignUpFormData} />
						</>
					)}
				</Grid>
			</Grid>
		</Slide>
	);
};

export default Sign;
