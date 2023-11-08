import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
import { Custom } from '../interfaces/ResumeInterfaces';

interface UseCustomSection {
	createCustomActivity: (resumeId: string) => Promise<void | Custom>;
	addCustomActivity: (resumeId: string, customId: string) => Promise<void | Custom>;
	updateCustomActivity: (
		resumeId: string,
		customId: string,
		customActivityId: string,
		customData: object,
	) => Promise<void | Custom>;
	deleteCustomActivity: (
		resumeId: string,
		customId: string,
		customActivityId: string,
	) => Promise<void | Custom>;
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
			getResume(resumeId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

	const updateCustomActivity = async (
		resumeId: string,
		customId: string,
		customActivityId: string,
		customData: object,
	) => {
		try {
			const { data } = await API.updateCustomActivity(
				resumeId,
				customId,
				customActivityId,
				customData,
			);
			getResume(resumeId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

	const deleteCustomActivity = async (
		resumeId: string,
		customId: string,
		customActivityId: string,
	) => {
		try {
			const { data } = await API.deleteCustomActivity(resumeId, customId, customActivityId);
			getResume(resumeId);
			return data.customActivity_section;
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

	const deleteCustom = async (resumeId: string, customId: string) => {
		try {
			await API.deleteCustom(resumeId, customId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Custom in:', error);
		}
	};

	return {
		createCustomActivity,
		addCustomActivity,
		updateCustomActivity,
		deleteCustomActivity,
		deleteCustom,
	};
};
