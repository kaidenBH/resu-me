import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../apis/Apis';

interface Resume {
	_id: string,
	title: string;
	template: string;
	owner: boolean;
	fields: [object];
}

interface ResumeContextType {
	resume: Resume | object | null;
	allResumes: [Resume] | [object] | null;
	activeTemplate: string | null;
	getAllResumes: () => Promise<void>;
	createResume: (title: string) => Promise<void>;
	getResume: (resumeId: string) => Promise<void>;
	navigateResume: (resumeId: string) => void;
	updatePersonalSection: (resumeId: string, PeronalSectionData: object) => Promise<void>;
	reOrderResume: (resumeId: string, originalIndex: number, targetIndex: number) => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [resume, setResume] = useState<Resume | object | null>(null);
	const [allResumes, setAllResumes] = useState<[Resume] | [object] | null>(null);
	const [activeTemplate, setActiveTemplate] = useState<string | null>('Simple');
	const navigate = useNavigate();

	const getAllResumes = async () => {
		try {
			const { data } = await API.getAllResumes();
			setAllResumes(data.resumes);
		} catch (error) {
			console.error('Error getting all resumes in:', error);
		}
	};

	const createResume = async (title: string) => {
		try {
			await API.newResume({ title: title });
			await getAllResumes();
		} catch (error) {
			console.error('Error making new resumes in:', error);
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
			console.error('Error getting resume in:', error);
		}
	};

	const updatePersonalSection = async (resumeId: string, PeronalSectionData: object) => {
		try {
			const {data} = await API.updatePersonalSection(resumeId, PeronalSectionData);
			console.log(data.personal_section);
			getResume(resumeId);
		} catch (error) {
			console.error('Error updating resume in:', error);
		}
	};
	const reOrderResume = async (resumeId: string, originalIndex: number, targetIndex: number) => {
		try {
			await API.reOrderResume(resumeId, originalIndex, targetIndex);
			const { data } = await API.get_resume(resumeId);
			setResume(data);
		} catch (error) {
			console.error('Error updating resume order in:', error);
		}
	}

	return (
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
			}}
		>
			{children}
		</ResumeContext.Provider>
	);
};

export const useResume = (): ResumeContextType => {
	const context = useContext(ResumeContext);
	if (!context) {
		throw new Error('useResume must be used within a ResumeProvider');
	}
	return context;
};
