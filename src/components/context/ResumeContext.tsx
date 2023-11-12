import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../apis/Apis';
import { Resume } from '../interfaces/ResumeInterfaces';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

interface ResumeContextType {
	resume: Resume | null;
	allResumes: Resume[] | null;
	activeTemplate: string | null;
	getAllResumes: () => Promise<void>;
	createResume: (title: string) => Promise<void>;
	getResume: (resumeId: string) => Promise<void>;
	navigateResume: (resumeId: string) => void;
	updatePersonalSection: (resumeId: string, PeronalSectionData: object) => Promise<void>;
	reOrderResume: (resumeId: string, originalIndex: number, targetIndex: number) => Promise<void>;
	removeResume: (resumeId: string) => Promise<void>;
	duplicateResume: (resumeId: string) => Promise<void>;
	updateResume: (resumeId: string, resumeData: object) => Promise<void>;
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

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [resume, setResume] = useState<Resume | null>(null);
	const [allResumes, setAllResumes] = useState<Resume[] | null>(null);
	const [activeTemplate, setActiveTemplate] = useState<string | null>('Simple');
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

	const getAllResumes = async () => {
		try {
			const { data } = await API.getAllResumes();
			setAllResumes(data.resumes);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const createResume = async (title: string) => {
		try {
			await API.newResume({ title: title });
			await getAllResumes();
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const duplicateResume = async (resumeId: string) => {
		try {
			await API.duplicateResume(resumeId);
			await getAllResumes();
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const navigateResume = (resumeId: string) => {
		navigate(`/resume/${resumeId}`);
	};

	const getResume = async (resumeId: string) => {
		try {
			const { data } = await API.get_resume(resumeId);
			setResume(data);
			setActiveTemplate(data.template);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const updateResume = async (resumeId: string, resumeData: object) => {
		try {
			await API.updateResume(resumeId, resumeData);
			await getAllResumes();
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const updatePersonalSection = async (resumeId: string, PeronalSectionData: object) => {
		try {
			await API.updatePersonalSection(resumeId, PeronalSectionData);
			getResume(resumeId);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const reOrderResume = async (resumeId: string, originalIndex: number, targetIndex: number) => {
		try {
			await API.reOrderResume(resumeId, originalIndex, targetIndex);
			getResume(resumeId);
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
	};

	const removeResume = async (resumeId: string) => {
		try {
			await API.removeResume(resumeId);
			await getAllResumes();
		} catch (error) {
			const apiError = error as ApiError;
			const errorMessage = apiError.response.data.message;
			showErrorAlert(errorMessage, 'error');
		}
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
			<ResumeContext.Provider
				value={{
					resume,
					allResumes,
					getResume,
					createResume,
					getAllResumes,
					navigateResume,
					activeTemplate,
					updatePersonalSection,
					reOrderResume,
					removeResume,
					duplicateResume,
					updateResume,
				}}
			>
				{children}
			</ResumeContext.Provider>
		</>
	);
};

export const useResume = (): ResumeContextType => {
	const context = useContext(ResumeContext);
	if (!context) {
		throw new Error('useResume must be used within a ResumeProvider');
	}
	return context;
};
