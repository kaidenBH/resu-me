import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseInternShipSection {
	addInternShipRecord: (resumeId: string) => Promise<void | object>;
	updateInternShipRecord: (resumeId: string, internshipId: string, InternShipData: object) => Promise<void | object>;
	deleteInternShipRecord: (resumeId: string, internshipId: string) => Promise<void | object>;
	deleteInternShip: (resumeId: string) => Promise<void>;
}

export const useInternShip = (): UseInternShipSection => {
	const { getResume } = useResume();
    const addInternShipRecord = async (resumeId: string) => {
		try {
			const { data } = await API.addInternShipRecord(resumeId);
			await getResume(resumeId);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const updateInternShipRecord = async (resumeId: string, internshipId: string, InternShipData: object) => {
		try {
			const { data } = await API.updateInternShipRecord(resumeId, internshipId, InternShipData);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const deleteInternShipRecord = async (resumeId: string, internshipId: string) => {
		try {
			const { data } = await API.deleteInternShipRecord(resumeId, internshipId);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const deleteInternShip = async (resumeId: string) => {
		try {
			await API.deleteInternShip(resumeId);
			await getResume(resumeId);
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

	return { addInternShipRecord, updateInternShipRecord, deleteInternShipRecord, deleteInternShip };
};
