import * as API from '../../apis/Apis';
import { useResume } from '../context/ResumeContext';
interface UseCourseSection {
	addCourse: (resumeId: string) => Promise<void | object>;
	updateCourse: (resumeId: string, courseId: string, courseData: object) => Promise<void | object>;
	deleteCourse: (resumeId: string, courseId: string) => Promise<void | object>;
	deleteCourseSection: (resumeId: string) => Promise<void>;
}

export const useCourse = (): UseCourseSection => {
	const { getResume } = useResume();
    const addCourse = async (resumeId: string) => {
		try {
			const { data } = await API.addCourse(resumeId);
			console.log(data.course_section);
			return data.course_section;
		} catch (error) {
			console.error('Error Course in:', error);
		}
	};

    const updateCourse = async (resumeId: string, courseId: string, courseData: object) => {
		try {
			const { data } = await API.updateCourse(resumeId, courseId, courseData);
			console.log(data.course_section);
			return data.course_section;
		} catch (error) {
			console.error('Error Course in:', error);
		}
	};

    const deleteCourse = async (resumeId: string, courseId: string) => {
		try {
			const { data } = await API.deleteCourse(resumeId, courseId);
			console.log(data);
			return data.course_section;
		} catch (error) {
			console.error('Error Course in:', error);
		}
	};

    const deleteCourseSection = async (resumeId: string) => {
		try {
			const { data } = await API.deleteCourse(resumeId);
			await getResume(resumeId);
			console.log(data);
		} catch (error) {
			console.error('Error Course in:', error);
		}
	};

	return { addCourse, updateCourse, deleteCourse, deleteCourseSection };
};