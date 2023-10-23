import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseLanguageSection {
	addLanguage: (resumeId: string) => Promise<void | object>;
	updateLanguage: (resumeId: string, languageId: string, languageData: object) => Promise<void | object>;
	deleteLanguage: (resumeId: string, languageId: string) => Promise<void | object>;
	deleteLanguageSection: (resumeId: string) => Promise<void>;
}

export const useLanguage = (): UseLanguageSection => {
	const { getResume } = useResume();
    const addLanguage = async (resumeId: string) => {
		try {
			const { data } = await API.addLanguage(resumeId);
			console.log(data.language_section);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

    const updateLanguage = async (resumeId: string, languageId: string, languageData: object) => {
		try {
			const { data } = await API.updateLanguage(resumeId, languageId, languageData);
			console.log(data.language_section);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

    const deleteLanguage = async (resumeId: string, languageId: string) => {
		try {
			const { data } = await API.deleteLanguage(resumeId, languageId);
			console.log(data);
			return data.language_section;
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

    const deleteLanguageSection = async (resumeId: string) => {
		try {
			const { data } = await API.deleteLanguageSection(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error Language in:', error);
		}
	};

	return { addLanguage, updateLanguage, deleteLanguage, deleteLanguageSection };
};
