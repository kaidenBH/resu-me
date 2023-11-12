import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '../hooks';
import { useNavigate } from 'react-router-dom';
import * as API from '../../apis/Apis';
import { User } from '../interfaces/ResumeInterfaces';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

interface UserContextType {
	user: User | null;
	signIn: (userData: object) => Promise<void>;
	signUp: (userData: object) => Promise<void>;
	updateUserImage: (userData: object) => Promise<void>;
	updateUser: (userData: object) => Promise<void>;
	signOut: () => void;
	checkUser: () => void;
	refreshUserToken: (newUser: User) => void;
}
interface CustomAlert {
	message: string;
	severity: 'error' | 'warning' | 'info' | 'success';
}
 
interface ApiError {
	response: {
		data: {
			message: string;
		};
	};
}
  
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const { getItem, setItem, removeItem } = useLocalStorage();
	const navigate = useNavigate();
	const [errorAlert, setErrorAlert] = useState<CustomAlert | null>(null);

	const handleCloseErrorAlert = () => {
		setErrorAlert(null);
	};

	const showErrorAlert = (message: string, severity: 'error' | 'warning' | 'info' | 'success') => {
		setErrorAlert({ message, severity });
		setTimeout(() => {
			handleCloseErrorAlert();
		}, 5000);
	};

	const signIn = async (userData: object) => {
		try {
			const { data } = await API.signIn(userData);
			refreshUserToken(data);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const signUp = async (userData: object) => {
		try {
			const { data } = await API.signUp(userData);
			refreshUserToken(data);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'warning');
		}
	};

	const updateUserImage = async (userData: object) => {
		try {
			const { data } = await API.updateUserImage(userData);
			refreshUserToken(data);
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	const updateUser = async (userData: object) => {
		try {
			const { data } = await API.updateUser(userData);
			refreshUserToken(data);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const signOut = () => {
		setUser(null);
		removeItem('user');
		navigate('/auth');
	};

	const checkUser = () => {
		const existUser = getItem('user');
		if (existUser) {
			const parsedUser = JSON.parse(existUser);
			setUser(parsedUser);
			navigate('/');
		} else {
			navigate('/auth');
		}
	};
	const refreshUserToken = (newUser: User) => {
		setUser(newUser);
		setItem('user', JSON.stringify(newUser));
		navigate('/');
	};
	return (
		<>
			<Snackbar
				open={!!errorAlert}
				autoHideDuration={6000}
				onClose={handleCloseErrorAlert}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleCloseErrorAlert}
					severity={errorAlert?.severity || 'error'}
				>
					{errorAlert?.message || ''}
				</MuiAlert>
			</Snackbar>
			<UserContext.Provider
				value={{
					user,
					checkUser,
					signIn,
					signUp,
					signOut,
					refreshUserToken,
					updateUserImage,
					updateUser,
				}}
			>
				{children}
			</UserContext.Provider>
		</>
	);
};

export const useAuth = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useAuth must be used within a UserProvider');
	}
	return context;
};