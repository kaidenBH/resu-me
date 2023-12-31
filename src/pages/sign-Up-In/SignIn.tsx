import React, { useState } from 'react';
import { Grid, IconButton, InputAdornment, Container } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { MainButton, CustomTextField, CustomTypography, CustomPaper } from './styles';

interface SignInProps {
	onSubmit: (formData: SignInFormData) => void;
}

export interface SignInFormData {
	setLoadingSign: (loading: boolean) => void;
	email: string;
	password: string;
}

const SignIn: React.FC<SignInProps> = ({ onSubmit }) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [loagingSign, setLoadingSign] = useState(false);
	const [formData, setFormData] = useState<SignInFormData>({
		setLoadingSign: setLoadingSign,
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Container style={{ padding: 0 }} maxWidth="xs">
			<CustomPaper sx={{ borderRadius: '0 15px 15px 0' }}>
				<form onSubmit={handleSubmit}>
					<CustomTypography variant="h4">Sign In</CustomTypography>
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<CustomTextField
								fullWidth
								label="Email"
								variant="filled"
								type="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<CustomTextField
								fullWidth
								label="Password"
								variant="filled"
								type={showPassword ? 'text' : 'password'}
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={handleClickShowPassword}
												edge="end"
												sx={{ '&:focus': { outline: 'none' } }}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							{loagingSign ? (
								<iframe
									title="Loading Dots"
									src={`./loadingDots.html`}
									style={{ border: 'none' }} 
								/>
							):(
								<MainButton
									variant="contained"
									type="submit"
									sx={{ margin: '0 0 1rem 0' }}
								>
									Sign In
								</MainButton>
							)}
						</Grid>
					</Grid>
				</form>
			</CustomPaper>
		</Container>
	);
};

export default SignIn;
