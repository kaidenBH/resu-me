import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseEmploymentSection {
	addEmploymentRecord: (resumeId: string) => Promise<void | object>;
	updateEmploymentRecord: (
		resumeId: string,
		employmentId: string,
		EmploymentData: object,
	) => Promise<void | object>;
	deleteEmploymentRecord: (resumeId: string, employmentId: string) => Promise<void | object>;
	deleteEmployment: (resumeId: string) => Promise<void>;
}

export const useEmployment = (): UseEmploymentSection => {
	const { getResume } = useResume();
	const addEmploymentRecord = async (resumeId: string) => {
		try {
			const { data } = await API.addEmploymentRecord(resumeId);
			await getResume(resumeId);
			return data.employment_section;
		} catch (error) {
			console.error('Error Employment in:', error);
		}
	};

	const updateEmploymentRecord = async (
		resumeId: string,
		employmentId: string,
		EmploymentData: object,
	) => {
		try {
			const { data } = await API.updateEmploymentRecord(
				resumeId,
				employmentId,
				EmploymentData,
			);
			getResume(resumeId);
			return data.employment_section;
		} catch (error) {
			console.error('Error Employment in:', error);
		}
	};

	const deleteEmploymentRecord = async (resumeId: string, employmentId: string) => {
		try {
			const { data } = await API.deleteEmploymentRecord(resumeId, employmentId);
			getResume(resumeId);
			return data.employment_section;
		} catch (error) {
			console.error('Error Employment in:', error);
		}
	};

	const deleteEmployment = async (resumeId: string) => {
		try {
			await API.deleteEmployment(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Employment in:', error);
		}
	};

	return {
		addEmploymentRecord,
		updateEmploymentRecord,
		deleteEmploymentRecord,
		deleteEmployment,
	};
};
