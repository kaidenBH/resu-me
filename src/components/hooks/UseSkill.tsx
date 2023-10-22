import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseSkillSection {
	addSkill: (resumeId: string) => Promise<void | object>;
	updateSkill: (resumeId: string, skillId: string, skillData: object) => Promise<void | object>;
	deleteSkill: (resumeId: string, skillId: string) => Promise<void | object>;
	deleteSkillSection: (resumeId: string) => Promise<void>;
}

export const useSkill = (): UseSkillSection => {
	const { getResume } = useResume();
    const addSkill = async (resumeId: string) => {
		try {
			const { data } = await API.addSkill(resumeId);
			console.log(data.skill_section);
			return data.skill_section;
		} catch (error) {
			console.error('Error Skill in:', error);
		}
	};

    const updateSkill = async (resumeId: string, skillId: string, skillData: object) => {
		try {
			const { data } = await API.updateSkill(resumeId, skillId, skillData);
			console.log(data.skill_section);
			return data.skill_section;
		} catch (error) {
			console.error('Error Skill in:', error);
		}
	};

    const deleteSkill = async (resumeId: string, skillId: string) => {
		try {
			const { data } = await API.deleteSkill(resumeId, skillId);
			console.log(data);
			return data.skill_section;
		} catch (error) {
			console.error('Error Skill in:', error);
		}
	};

    const deleteSkillSection = async (resumeId: string) => {
		try {
			const { data } = await API.deleteSkillSection(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error Skill in:', error);
		}
	};

	return { addSkill, updateSkill, deleteSkill, deleteSkillSection };
};
