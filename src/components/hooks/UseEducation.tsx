import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseEducationSection {
	addSchool: (resumeId: string) => Promise<void>;
	updateSchool: (resumeId: string, schoolId: string, schoolData: object) => Promise<void>;
	deleteSchool: (resumeId: string, schoolId: string) => Promise<void>;
	deleteEducation: (resumeId: string) => Promise<void>;
}

export const useEducation = (): UseEducationSection => {
	const { getResume } = useResume();
    const addSchool = async (resumeId: string) => {
		try {
			const { data } = await API.addSchool(resumeId);
			console.log(data.education_section);
			return data.education_section;
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const updateSchool = async (resumeId: string, schoolId: string, schoolData: object) => {
		try {
			const { data } = await API.updateSchool(resumeId, schoolId, schoolData);
			console.log(data.education_section);
			return data.education_section;
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const deleteSchool = async (resumeId: string, schoolId: string) => {
		try {
			const { data } = await API.deleteSchool(resumeId, schoolId);
			console.log(data);
			return data.education_section;
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const deleteEducation = async (resumeId: string) => {
		try {
			const { data } = await API.deleteEducation(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	return { addSchool, updateSchool, deleteSchool, deleteEducation };
};
