import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, IconButton, InputAdornment } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import FileBase from 'react-file-base64';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {
	ConfirmButton,
	CustomSideBar,
	CustomTypography,
	LinkTypography,
	ProType,
	BasicType,
	PlusType,
	CustomAvatar,
	CustomTextField,
	LogOutButton,
} from './styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface ProfileFormData {
	email: string;
	oldPassword: string;
	newPassword: string;
	confirmsNewPassword: string;
	first_name: string;
	last_name: string;
}

const Profile: React.FC = () => {
	const { user, updateUserImage, updateUser, signOut } = useAuth();
	const [imageChangeActive, setImageChangeActive] = useState(false);
	const [imageChangeLoading, setImageChangeLoading] = useState(false);
	const [userUpdateLoading, setUserUpdateLoading] = useState(false);
	const [editData, setEditData] = useState(false);
	const [editDataActive, setEditDataActive] = useState(false);
	const [editPassword, setEditPassword] = useState(false);
	const [profielImage, setProfileImage] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

	const [formData, setFormData] = useState<ProfileFormData>({
		email: user?.email || '',
		oldPassword: '',
		newPassword: '',
		confirmsNewPassword: '',
		first_name: user?.first_name || '',
		last_name: user?.last_name || '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleActiveAddImage = () => {
		setImageChangeActive(true);
		setTimeout(() => {
			setImageChangeActive(false);
		}, 200);
	};

	const handleActiveEditData = () => {
		if (!editData) {
			setFormData({
				email: user?.email,
				oldPassword: '',
				newPassword: '',
				confirmsNewPassword: '',
				first_name: user?.first_name,
				last_name: user?.last_name,
			});
		} else {
			setEditPassword(false);
		}
		setEditData(!editData);
		setEditDataActive(true);
		setTimeout(() => {
			setEditDataActive(false);
		}, 200);
	};

	const handleUserUpdate = async () => {
		setUserUpdateLoading(true);
		await updateUser(formData);
		setUserUpdateLoading(false);
		setEditData(false);
		setEditPassword(false);
	};

	useEffect(() => {
		const ApiCall = async () => {
			if (profielImage) {
				setImageChangeLoading(true);
				await updateUserImage({ image: profielImage });
				setImageChangeLoading(false);
			}
		};
		ApiCall();
	}, [profielImage]);

	return (
		<Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
			<CustomSideBar>
				<Grid container spacing={2} justifyContent="center" alignItems="center">
					<Grid item xs={12} sx={{ textAlign: 'right' }}>
						<EditNoteIcon
							sx={{
								color: editDataActive ? '#FF5733' : '#6499E9',
								fontSize: 40,
								cursor: 'pointer',
							}}
							onClick={handleActiveEditData}
						/>
					</Grid>
					<Grid item xs={4} sx={{ textAlign: 'right' }}>
						<CustomAvatar alt={user?.first_name} src={user?.image}>
							{user?.first_name.charAt(0)}
						</CustomAvatar>
						{editData ? (
							<IconButton
								aria-label="upload picture"
								component="label"
								sx={{ padding: 0 }}
							>
								{imageChangeLoading ? (
									<img src={'/loading.svg'} alt="My SVG" style={{ height: '3rem' }} />
								) : (
									<AddPhotoAlternateIcon
										sx={{
											color: imageChangeActive ? '#FF5733' : '#6499E9',
											transition: 'color 0.2s',
										}}
										onClick={handleActiveAddImage}
									/>
								)}
								<div style={{ display: 'none' }}>
									<FileBase
										type="file"
										multiple={false}
										onDone={({ base64 }: { base64: string }) =>
											setProfileImage(base64)
										}
									/>
								</div>
							</IconButton>
						) : null}
					</Grid>
					{editData ? (
						<>
							<Grid item xs={12}>
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
							<Grid item xs={12}>
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
							{editPassword ? (
								<>
									<Grid item xs={12}>
										<CustomTextField
											fullWidth
											label="New Password"
											variant="filled"
											type={showNewPassword ? 'text' : 'password'}
											name="newPassword"
											value={formData.newPassword}
											onChange={handleChange}
											required
											autoComplete="new-password"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={handleClickShowNewPassword}
															edge="end"
														>
															{showPassword ? (
																<Visibility />
															) : (
																<VisibilityOff />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<CustomTextField
											fullWidth
											label="Repeat New Password"
											variant="filled"
											type={'password'}
											name="confirmsNewPassword"
											value={formData.confirmsNewPassword}
											onChange={handleChange}
											required
											autoComplete="new-password"
										/>
									</Grid>
								</>
							) : null}
							<Grid item xs={12}>
								<CustomTextField
									fullWidth
									label="Confirm Password"
									variant="filled"
									type={showPassword ? 'text' : 'password'}
									name="oldPassword"
									value={formData.oldPassword}
									onChange={handleChange}
									required
									autoComplete="new-password"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<LinkTypography
									variant="body2"
									sx={{ cursor: 'pointer' }}
									onClick={() => setEditPassword(!editPassword)}
								>
									{!editPassword ? 'Change passowrd?' : 'Cancel changing passowrd?'}
								</LinkTypography>
							</Grid>
							<Grid item xs={12} sx={{ textAlign: 'center' }}>
								{userUpdateLoading ? (
									<img src={'/loading.svg'} alt="My SVG" style={{ height: '5rem' }} />
								) : (
									<ConfirmButton
										variant="contained"
										sx={{ margin: '0 0 1rem 0' }}
										onClick={handleUserUpdate}
									>
										Confirm
									</ConfirmButton>
								)}
							</Grid>
						</>
					) : (
						<>
							<Grid item xs={12} sx={{ textAlign: 'center' }}>
								<CustomTypography variant="h6">
									{user?.first_name} {user?.last_name}
								</CustomTypography>
							</Grid>
							<Grid item xs={12} sx={{ textAlign: 'center' }}>
								<CustomTypography variant="body1">{user?.email}</CustomTypography>
							</Grid>
						</>
					)}
					<Grid item xs={7} sx={{ textAlign: 'right' }}>
						<CustomTypography variant="body2">
							Account Type:{' '}
						</CustomTypography>
					</Grid>
					<Grid item xs={5} sx={{ textAlign: 'left' }}>	
						{user?.account_type == 'Basic' ? (
							<BasicType variant="body2">{user?.account_type}</BasicType>
						) : user?.account_type == 'Plus' ? (
							<PlusType variant="body2">{user?.account_type}</PlusType>
						) : (
							<ProType variant="body2">{user?.account_type}</ProType>
						)}
					</Grid>
					<Grid item xs={12} sx={{ textAlign: 'center' }}>
						<LogOutButton variant="contained" onClick={signOut}>
							Log out
						</LogOutButton>
					</Grid>
				</Grid>
			</CustomSideBar>
		</Grow>
	);
};

export default Profile;
