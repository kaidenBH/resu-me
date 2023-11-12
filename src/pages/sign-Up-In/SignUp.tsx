import React, { useState } from 'react';
import { Grid, IconButton, InputAdornment, Container } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { MainButton, CustomTextField, CustomTypography, CustomPaper } from './styles';

interface SignUpProps {
	onSubmit: (formData: SignUpFormData) => void;
}

export interface SignUpFormData {
	email: string;
	password: string;
	confirmPassword: string;
	first_name: string;
	last_name: string;
}

const SignUp: React.FC<SignUpProps> = ({ onSubmit }) => {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [formData, setFormData] = useState<SignUpFormData>({
		email: '',
		password: '',
		confirmPassword: '',
		first_name: '',
		last_name: '',
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
					<CustomTypography variant="h4">Sign Up</CustomTypography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								fullWidth
								label="First Name"
								variant="filled"
								name="first_name"
								value={formData.first_name}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								fullWidth
								label="Last Name"
								variant="filled"
								name="last_name"
								value={formData.last_name}
								onChange={handleChange}
								required
							/>
						</Grid>
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
							<CustomTextField
								fullWidth
								label="Repeat Password"
								variant="filled"
								type="password"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<MainButton
								variant="contained"
								type="submit"
								sx={{ margin: '0 0 1rem 0' }}
							>
								Sign Up
							</MainButton>
						</Grid>
					</Grid>
				</form>
			</CustomPaper>
		</Container>
	);
};

export default SignUp;
