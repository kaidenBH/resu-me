import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import * as API from '../../apis/Apis';

interface User {
	first_name: string;
	last_name: string;
	email: string;
	image?: string | null;
	account_type: string;
	token: string;
}

interface UserContextType {
	user: User | object | null;
	signIn: (userData: object) => Promise<void>;
	signUp: (userData: object) => Promise<void>;
	updateUserImage: (userData: object) => Promise<void>;
	updateUser: (userData: object) => Promise<void>;
	signOut: () => void;
	checkUser: () => void;
	refreshUserToken: (newUser: object) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | object | null>(null);
	const { getItem, setItem, removeItem } = useLocalStorage();
	const navigate = useNavigate();

	const signIn = async (userData: object) => {
		try {
			const { data } = await API.signIn(userData);
			refreshUserToken(data);
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	const signUp = async (userData: object) => {
		try {
			const { data } = await API.signUp(userData);
			refreshUserToken(data);
		} catch (error) {
			console.error('Error signing in:', error);
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
			console.error('Error signing in:', error);
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
	const refreshUserToken = (newUser: object) => {
		setUser(newUser);
		setItem('user', JSON.stringify(newUser));
		navigate('/');
	};
	return (
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
	);
};

export const useAuth = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useAuth must be used within a UserProvider');
	}
	return context;
};
