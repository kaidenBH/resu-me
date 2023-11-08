import axios, { AxiosResponse } from 'axios';
import * as INTR from '../components/interfaces/ResumeInterfaces';

const API = axios.create({
	//baseURL: 'http://localhost:5000',
	baseURL: 'https://resu-me.onrender.com',
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem('user')) {
		req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`;
	}
	return req;
});

type ApiFunction = (userData?: object | string) => Promise<AxiosResponse<object>>;

// User Apis
export const signIn: ApiFunction = (userData) => API.post('/user/signin', userData);
export const signUp: ApiFunction = (userData) => API.post('/user/signup', userData);
export const updateUser: ApiFunction = (userData) => API.patch('/user/updateuser', userData);
export const updateUserImage: ApiFunction = (userData) => API.patch('/user/updateImage', userData);
export const refreshToken: ApiFunction = () => API.post('/user/refreshToken');
export const sendVerificationEmail = () => API.post('/user/sendVerificationEmail');
export const verifyEmail = (token: string) => API.get(`/user/verify/${token}`);

// Resume Apis
export const newResume = (ResumeData: object) => API.post('/resume/', ResumeData);
export const get_resume = (resumeId: string): Promise<AxiosResponse<INTR.Resume>> =>
	API.get(`/resume/${resumeId}`);
export const updateResume = (resumeId: string, ResumeData: object) =>
	API.patch(`/resume/${resumeId}`, ResumeData);
export const getAllResumes = (): Promise<AxiosResponse<{ resumes: INTR.Resume[] }>> =>
	API.get('/resume/getAllResumes');
export const removeResume = (resumeId: string) => API.patch(`/resume/removeResume/${resumeId}`, {});
export const duplicateResume = (resumeId: string) => API.post(`/resume/duplicate/${resumeId}`, {});
export const reOrderResume = (resumeId: string, originalIndex: number, targetIndex: number) =>
	API.patch(`/resume/reOrder/${resumeId}`, { originalIndex, targetIndex });

// Personal Apis
export const updatePersonalSection = (
	resumeId: string,
	PeronalSectionData: object,
): Promise<AxiosResponse<{ personal_section: INTR.PersonalDetails }>> =>
	API.patch(`/resume/updatePersonalSection/${resumeId}`, PeronalSectionData);

// Employment Apis
export const addEmploymentRecord = (
	resumeId: string,
): Promise<AxiosResponse<{ employment_section: INTR.Employment }>> =>
	API.patch(`/resume/employment/addEmploymentRecord/${resumeId}`, {});
export const updateEmploymentRecord = (
	resumeId: string,
	employmentId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ employment_section: INTR.Employment }>> =>
	API.patch(`/resume/employment/updateEmploymentRecord/${resumeId}/${employmentId}`, ResumeData);
export const deleteEmploymentRecord = (
	resumeId: string,
	employmentId: string,
): Promise<AxiosResponse<{ employment_section: INTR.Employment }>> =>
	API.patch(`/resume/employment/deleteEmploymentRecord/${resumeId}/${employmentId}`, {});
export const deleteEmployment = (resumeId: string) =>
	API.patch(`/resume/employment/deleteEmployment/${resumeId}`, {});

// Education Apis
export const addSchool = (
	resumeId: string,
): Promise<AxiosResponse<{ education_section: INTR.Education }>> =>
	API.patch(`/resume/education/addSchool/${resumeId}`, {});
export const updateSchool = (
	resumeId: string,
	schoolId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ education_section: INTR.Education }>> =>
	API.patch(`/resume/education/updateSchool/${resumeId}/${schoolId}`, ResumeData);
export const deleteSchool = (
	resumeId: string,
	schoolId: string,
): Promise<AxiosResponse<{ education_section: INTR.Education }>> =>
	API.patch(`/resume/education/deleteSchool/${resumeId}/${schoolId}`, {});
export const deleteEducation = (resumeId: string) =>
	API.patch(`/resume/education/deleteEducation/${resumeId}`, {});

// Links Apis
export const addLink = (resumeId: string): Promise<AxiosResponse<{ link_section: INTR.Link }>> =>
	API.patch(`/resume/link/addLink/${resumeId}`, {});
export const updateLink = (
	resumeId: string,
	linkId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ link_section: INTR.Link }>> =>
	API.patch(`/resume/link/updateLink/${resumeId}/${linkId}`, ResumeData);
export const deleteLink = (
	resumeId: string,
	linkId: string,
): Promise<AxiosResponse<{ link_section: INTR.Link }>> =>
	API.patch(`/resume/link/deleteLink/${resumeId}/${linkId}`, {});
export const deleteLinkSection = (resumeId: string) =>
	API.patch(`/resume/link/deleteLinkSection/${resumeId}`, {});

// Skills Apis
export const addSkill = (resumeId: string): Promise<AxiosResponse<{ skill_section: INTR.Skill }>> =>
	API.patch(`/resume/skill/addSkill/${resumeId}`, {});
export const updateSkill = (
	resumeId: string,
	skillId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ skill_section: INTR.Skill }>> =>
	API.patch(`/resume/skill/updateSkill/${resumeId}/${skillId}`, ResumeData);
export const deleteSkill = (
	resumeId: string,
	skillId: string,
): Promise<AxiosResponse<{ skill_section: INTR.Skill }>> =>
	API.patch(`/resume/skill/deleteSkill/${resumeId}/${skillId}`, {});
export const deleteSkillSection = (resumeId: string) =>
	API.patch(`/resume/skill/deleteSkillSection/${resumeId}`, {});

// Languages Apis
export const addLanguage = (
	resumeId: string,
): Promise<AxiosResponse<{ language_section: INTR.Language }>> =>
	API.patch(`/resume/language/addLanguage/${resumeId}`, {});
export const updateLanguage = (
	resumeId: string,
	languageId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ language_section: INTR.Language }>> =>
	API.patch(`/resume/language/updateLanguage/${resumeId}/${languageId}`, ResumeData);
export const deleteLanguage = (
	resumeId: string,
	languageId: string,
): Promise<AxiosResponse<{ language_section: INTR.Language }>> =>
	API.patch(`/resume/language/deleteLanguage/${resumeId}/${languageId}`, {});
export const deleteLanguageSection = (resumeId: string) =>
	API.patch(`/resume/language/deleteLanguageSection/${resumeId}`, {});

// Internship Apis
export const addInternShipRecord = (
	resumeId: string,
): Promise<AxiosResponse<{ internship_section: INTR.InternShip }>> =>
	API.patch(`/resume/internship/addInternShipRecord/${resumeId}`, {});
export const updateInternShipRecord = (
	resumeId: string,
	internshipId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ internship_section: INTR.InternShip }>> =>
	API.patch(`/resume/internship/updateInternShipRecord/${resumeId}/${internshipId}`, ResumeData);
export const deleteInternShipRecord = (
	resumeId: string,
	internshipId: string,
): Promise<AxiosResponse<{ internship_section: INTR.InternShip }>> =>
	API.patch(`/resume/internship/deleteInternShipRecord/${resumeId}/${internshipId}`, {});
export const deleteInternShip = (resumeId: string) =>
	API.patch(`/resume/internship/deleteInternShip/${resumeId}`, {});

// Course Apis
export const addCourse = (
	resumeId: string,
): Promise<AxiosResponse<{ course_section: INTR.Course }>> =>
	API.patch(`/resume/course/addCourse/${resumeId}`, {});
export const updateCourse = (
	resumeId: string,
	courseId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ course_section: INTR.Course }>> =>
	API.patch(`/resume/course/updateCourse/${resumeId}/${courseId}`, ResumeData);
export const deleteCourse = (
	resumeId: string,
	courseId: string,
): Promise<AxiosResponse<{ course_section: INTR.Course }>> =>
	API.patch(`/resume/course/deleteCourse/${resumeId}/${courseId}`, {});
export const deleteCourseSection = (resumeId: string) =>
	API.patch(`/resume/course/deleteCourseSection/${resumeId}`, {});

// Custom section Apis
export const createCustomActivity = (
	resumeId: string,
): Promise<AxiosResponse<{ customActivity_section: INTR.Custom }>> =>
	API.post(`/resume/custom/createCustomActivity/${resumeId}`, {});
export const addCustomActivity = (
	resumeId: string,
	customId: string,
): Promise<AxiosResponse<{ customActivity_section: INTR.Custom }>> =>
	API.patch(`/resume/custom/addCustomActivity/${resumeId}/${customId}`, {});
export const updateCustomActivity = (
	resumeId: string,
	customId: string,
	customActivityId: string,
	ResumeData: object,
): Promise<AxiosResponse<{ customActivity_section: INTR.Custom }>> =>
	API.patch(
		`/resume/custom/updateCustomActivity/${resumeId}/${customId}/${customActivityId}`,
		ResumeData,
	);
export const deleteCustomActivity = (
	resumeId: string,
	customId: string,
	customActivityId: string,
): Promise<AxiosResponse<{ customActivity_section: INTR.Custom }>> =>
	API.patch(
		`/resume/custom/deleteCustomActivity/${resumeId}/${customId}/${customActivityId}`,
		{},
	);
export const deleteCustom = (resumeId: string, customId: string) =>
	API.patch(`/resume/custom/deleteCustom/${resumeId}/${customId}`, {});
