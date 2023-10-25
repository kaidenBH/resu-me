import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseCustomSection {
    createCustomActivity: (resumeId: string) => Promise<void | object>;
	addCustomActivity: (resumeId: string, customId: string) => Promise<void | object>;
	updateCustomActivity: (resumeId: string, customId: string, customActivityId: string, customData: object) => Promise<void | object>;
	deleteCustomActivity: (resumeId: string, customId: string, customActivityId: string) => Promise<void | object>;
	deleteCustom: (resumeId: string, customId: string) => Promise<void>;
}

export const useCustom = (): UseCustomSection => {
	const { getResume } = useResume();
    const createCustomActivity = async (resumeId: string) => {
		try {
			await API.createCustomActivity(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

    const addCustomActivity = async (resumeId: string, customId: string) => {
		try {
			const { data } = await API.addCustomActivity(resumeId, customId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

    const updateCustomActivity = async (resumeId: string, customId: string, customActivityId: string, customData: object) => {
		try {
			const { data } = await API.updateCustomActivity(resumeId, customId, customData, customActivityId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

    const deleteCustomActivity = async (resumeId: string, customId: string, customActivityId: string) => {
		try {
			const { data } = await API.deleteCustomActivity(resumeId, customId, {}, customActivityId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

    const deleteCustom = async (resumeId: string, customId: string) => {
		try {
			await API.deleteCustomActivity(resumeId, customId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

	return { createCustomActivity, addCustomActivity, updateCustomActivity, deleteCustomActivity, deleteCustom };
};
