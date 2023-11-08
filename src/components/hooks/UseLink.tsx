import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
import { Link } from '../interfaces/ResumeInterfaces';

interface UseLinkSection {
	addLink: (resumeId: string) => Promise<void | Link>;
	updateLink: (resumeId: string, linkId: string, linkData: object) => Promise<void | Link>;
	deleteLink: (resumeId: string, linkId: string) => Promise<void | Link>;
	deleteLinkSection: (resumeId: string) => Promise<void>;
}

export const useLink = (): UseLinkSection => {
	const { getResume } = useResume();
	const addLink = async (resumeId: string) => {
		try {
			const { data } = await API.addLink(resumeId);
			await getResume(resumeId);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

	const updateLink = async (resumeId: string, linkId: string, linkData: object) => {
		try {
			const { data } = await API.updateLink(resumeId, linkId, linkData);
			getResume(resumeId);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

	const deleteLink = async (resumeId: string, linkId: string) => {
		try {
			const { data } = await API.deleteLink(resumeId, linkId);
			getResume(resumeId);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

	const deleteLinkSection = async (resumeId: string) => {
		try {
			await API.deleteLinkSection(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

	return { addLink, updateLink, deleteLink, deleteLinkSection };
};
