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
			console.log(data.internship_section);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const updateInternShipRecord = async (resumeId: string, internshipId: string, InternShipData: object) => {
		try {
			const { data } = await API.updateInternShipRecord(resumeId, internshipId, InternShipData);
			console.log(data.internship_section);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const deleteInternShipRecord = async (resumeId: string, internshipId: string) => {
		try {
			const { data } = await API.deleteInternShipRecord(resumeId, internshipId);
			console.log(data);
			return data.internship_section;
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

    const deleteInternShip = async (resumeId: string) => {
		try {
			const { data } = await API.deleteInternShip(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error InternShip in:', error);
		}
	};

	return { addInternShipRecord, updateInternShipRecord, deleteInternShipRecord, deleteInternShip };
};
