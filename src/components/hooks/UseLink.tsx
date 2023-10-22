import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseLinkSection {
	addLink: (resumeId: string) => Promise<void | object>;
	updateLink: (resumeId: string, linkId: string, linkData: object) => Promise<void | object>;
	deleteLink: (resumeId: string, linkId: string) => Promise<void | object>;
	deleteLinkSection: (resumeId: string) => Promise<void>;
}

export const useLink = (): UseLinkSection => {
	const { getResume } = useResume();
    const addLink = async (resumeId: string) => {
		try {
			const { data } = await API.addLink(resumeId);
			console.log(data.link_section);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

    const updateLink = async (resumeId: string, linkId: string, linkData: object) => {
		try {
			const { data } = await API.updateLink(resumeId, linkId, linkData);
			console.log(data.link_section);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

    const deleteLink = async (resumeId: string, linkId: string) => {
		try {
			const { data } = await API.deleteLink(resumeId, linkId);
			console.log(data);
			return data.link_section;
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

    const deleteLinkSection = async (resumeId: string) => {
		try {
			const { data } = await API.deleteLinkSection(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error Link in:', error);
		}
	};

	return { addLink, updateLink, deleteLink, deleteLinkSection };
};
