import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseEducationSection {
	addSchool: (resumeId: string) => Promise<void | object>;
	updateSchool: (resumeId: string, schoolId: string, schoolData: object) => Promise<void | object>;
	deleteSchool: (resumeId: string, schoolId: string) => Promise<void | object>;
	deleteEducation: (resumeId: string) => Promise<void>;
}

export const useEducation = (): UseEducationSection => {
	const { getResume } = useResume();
    const addSchool = async (resumeId: string) => {
		try {
			const { data } = await API.addSchool(resumeId);
			await getResume(resumeId);
			return data.education_section;
		} catch (error) {
			console.error('Error Education in:', error);
		}
	};

    const updateSchool = async (resumeId: string, schoolId: string, schoolData: object) => {
		try {
			const { data } = await API.updateSchool(resumeId, schoolId, schoolData);
			return data.education_section;
		} catch (error) {
			console.error('Error Education in:', error);
		}
	};

    const deleteSchool = async (resumeId: string, schoolId: string) => {
		try {
			const { data } = await API.deleteSchool(resumeId, schoolId);
			return data.education_section;
		} catch (error) {
			console.error('Error Education in:', error);
		}
	};

    const deleteEducation = async (resumeId: string) => {
		try {
			await API.deleteEducation(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Education in:', error);
		}
	};

	return { addSchool, updateSchool, deleteSchool, deleteEducation };
};
