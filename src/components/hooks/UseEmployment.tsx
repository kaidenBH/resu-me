import * as API from '../../apis/Apis';

interface UseEmploymentSection {
	addEmploymentRecord: (resumeId: string) => Promise<void>;
	updateEmploymentRecord: (resumeId: string, employmentId: string, EmploymentData: object) => Promise<void>;
	deleteEmploymentRecord: (resumeId: string, employmentId: string) => Promise<void>;
	deleteEmployment: (resumeId: string) => Promise<void>;
}

export const useEmployment = (): UseEmploymentSection => {

    const addEmploymentRecord = async (resumeId: string) => {
		try {
			const { data } = await API.addEmploymentRecord(resumeId);
			console.log(data.employment_section);
			return data.employment_section;
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const updateEmploymentRecord = async (resumeId: string, employmentId: string, EmploymentData: object) => {
		try {
			const { data } = await API.updateEmploymentRecord(resumeId, employmentId, EmploymentData);
			console.log(data.employment_section);
			return data.employment_section;
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const deleteEmploymentRecord = async (resumeId: string, employmentId: string) => {
		try {
			const { data } = await API.deleteEmploymentRecord(resumeId, employmentId);
			console.log(data);
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

    const deleteEmployment = async (resumeId: string) => {
		try {
			const { data } = await API.deleteEmployment(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error signing in:', error);
		}
	};

	return { addEmploymentRecord, updateEmploymentRecord, deleteEmploymentRecord, deleteEmployment };
};
