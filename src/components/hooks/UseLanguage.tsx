import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
import { Language } from '../interfaces/ResumeInterfaces';

interface UseLanguageSection {
	addLanguage: (resumeId: string) => Promise<void | Language>;
	updateLanguage: (
		resumeId: string,
		languageId: string,
		languageData: object,
	) => Promise<void | Language>;
	deleteLanguage: (resumeId: string, languageId: string) => Promise<void | Language>;
	deleteLanguageSection: (resumeId: string) => Promise<void>;
}

export const useLanguage = (): UseLanguageSection => {
	const { getResume } = useResume();
	const addLanguage = async (resumeId: string) => {
		try {
			const { data } = await API.addLanguage(resumeId);
			await getResume(resumeId);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

	const updateLanguage = async (resumeId: string, languageId: string, languageData: object) => {
		try {
			const { data } = await API.updateLanguage(resumeId, languageId, languageData);
			getResume(resumeId);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

	const deleteLanguage = async (resumeId: string, languageId: string) => {
		try {
			const { data } = await API.deleteLanguage(resumeId, languageId);
			getResume(resumeId);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

	const deleteLanguageSection = async (resumeId: string) => {
		try {
			await API.deleteLanguageSection(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

	return { addLanguage, updateLanguage, deleteLanguage, deleteLanguageSection };
};
