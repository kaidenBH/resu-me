import axios, { AxiosResponse } from 'axios';

const API = axios.create({
	baseURL: 'http://localhost:5000',
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem('user')) {
		req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('user')!).token}`;
	}
	return req;
});

type ApiFunction = (userData?: object | string) => Promise<AxiosResponse<object>>;
type ApiOrderFunction = (resumeId?: string, originalIndex?: number, targetIndex?: number) => Promise<AxiosResponse<object>>;
type ApiResumeFunction = (
	resumeId?: string,
	fieldId?: string,
	ResumeData?: object,
  ) => Promise<
	AxiosResponse<{
		data: object;
		employment_section?: object;
		education_section?: object;
		link_section?: object;
		skill_section?: object;
		language_section?: object;
		internship_section?: object;
		course_section?: object;
	}>
  >;
type ApiCustomFunction = (
	resumeId?: string,
	fieldId?: string,
	subId?: string,
	ResumeData?: object,
  ) => Promise<
	AxiosResponse<{
		data: object;
		customActivity_section?: object;
	}>
  >;
  
// User Apis
export const signIn: ApiFunction = (userData) => API.post('/user/signin', userData);
export const signUp: ApiFunction = (userData) => API.post('/user/signup', userData);
export const updateUser: ApiFunction = (userData) => API.patch('/user/updateuser', userData);
export const updateUserImage: ApiFunction = (userData) => API.patch('/user/updateImage', userData);
export const refreshToken = () => API.post('/user/refreshToken');
export const sendVerificationEmail = () => API.post('/user/sendVerificationEmail');
export const verifyEmail = (token: string) => API.get(`/user/verify/${token}`);


// Resume Apis
export const newResume = (ResumeData: object) => API.post('/resume/', ResumeData);
export const get_resume: ApiResumeFunction = (resumeId) => API.get(`/resume/${resumeId}`);
export const getAllResumes: ApiResumeFunction = () => API.get('/resume/getAllResumes');
export const removeResume: ApiResumeFunction = (resumeId) => API.delete(`/resume/${resumeId}`, {});
export const duplicateResume: ApiResumeFunction = (resumeId) => API.post(`/resume/duplicate/${resumeId}`, {});
export const reOrderResume: ApiOrderFunction = (resumeId, originalIndex, targetIndex ) => API.patch(`/resume/reOrder/${resumeId}`, {originalIndex, targetIndex});


// Personal Apis
export const updatePersonalSection: ApiResumeFunction = (resumeId, PeronalSectionData) => 
	API.patch(`/resume/updatePersonalSection/${resumeId}`, PeronalSectionData);


// Employment Apis
export const addEmploymentRecord:ApiResumeFunction = (resumeId) => 
	API.patch(`/resume/employment/addEmploymentRecord/${resumeId}`, {});
export const updateEmploymentRecord:ApiResumeFunction = (resumeId, employmentId, ResumeData) => 
	API.patch(`/resume/employment/updateEmploymentRecord/${resumeId}/${employmentId}`, ResumeData);
export const deleteEmploymentRecord:ApiResumeFunction = (resumeId, employmentId) => 
	API.patch(`/resume/employment/deleteEmploymentRecord/${resumeId}/${employmentId}`, {});
export const deleteEmployment:ApiResumeFunction = (resumeId) => 
	API.patch(`/resume/employment/deleteEmployment/${resumeId}`, {});


// Education Apis
export const addSchool:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/education/addSchool/${resumeId}`, {});
export const updateSchool:ApiResumeFunction = (resumeId, schoolId, ResumeData) =>
	API.patch(`/resume/education/updateSchool/${resumeId}/${schoolId}`, ResumeData);
export const deleteSchool:ApiResumeFunction = (resumeId, schoolId) =>
	API.patch(`/resume/education/deleteSchool/${resumeId}/${schoolId}`, {});
export const deleteEducation:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/education/deleteEducation/${resumeId}`, {});


// Links Apis
export const addLink:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/link/addLink/${resumeId}`, {});
export const updateLink:ApiResumeFunction = (resumeId, linkId, ResumeData) =>
	API.patch(`/resume/link/updateLink/${resumeId}/${linkId}`, ResumeData);
export const deleteLink:ApiResumeFunction = (resumeId, linkId) =>
	API.patch(`/resume/link/deleteLink/${resumeId}/${linkId}`, {});
export const deleteLinkSection:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/link/deleteLinkSection/${resumeId}`, {});


// Skills Apis
export const addSkill:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/skill/addSkill/${resumeId}`, {});
export const updateSkill:ApiResumeFunction = (resumeId, skillId, ResumeData) =>
	API.patch(`/resume/skill/updateSkill/${resumeId}/${skillId}`, ResumeData);
export const deleteSkill:ApiResumeFunction = (resumeId, skillId) =>
	API.patch(`/resume/skill/deleteSkill/${resumeId}/${skillId}`, {});
export const deleteSkillSection:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/skill/deleteSkillSection/${resumeId}`, {});


// Languages Apis
export const addLanguage:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/language/addLanguage/${resumeId}`, {});
export const updateLanguage:ApiResumeFunction = (resumeId, languageId, ResumeData) =>
	API.patch(`/resume/language/updateLanguage/${resumeId}/${languageId}`, ResumeData);
export const deleteLanguage:ApiResumeFunction = (resumeId, languageId) =>
	API.patch(`/resume/language/deleteLanguage/${resumeId}/${languageId}`, {});
export const deleteLanguageSection:ApiResumeFunction = (resumeId) =>
	API.patch(`/resume/language/deleteLanguageSection/${resumeId}`, {});


// Internship Apis
export const addInternShipRecord:ApiResumeFunction = (resumeId) => 
API.patch(`/resume/internship/addInternShipRecord/${resumeId}`, {});
export const updateInternShipRecord:ApiResumeFunction = (resumeId, internshipId, ResumeData) => 
API.patch(`/resume/internship/updateInternShipRecord/${resumeId}/${internshipId}`, ResumeData);
export const deleteInternShipRecord:ApiResumeFunction = (resumeId, internshipId) => 
API.patch(`/resume/internship/deleteInternShipRecord/${resumeId}/${internshipId}`, {});
export const deleteInternShip:ApiResumeFunction = (resumeId) => 
API.patch(`/resume/internship/deleteInternShip/${resumeId}`, {});


// Internship Apis
export const addCourse:ApiResumeFunction = (resumeId) => 
API.patch(`/resume/course/addCourse/${resumeId}`, {});
export const updateCourse:ApiResumeFunction = (resumeId, courseId, ResumeData) => 
API.patch(`/resume/course/updateCourse/${resumeId}/${courseId}`, ResumeData);
export const deleteCourse:ApiResumeFunction = (resumeId, courseId) => 
API.patch(`/resume/course/deleteCourse/${resumeId}/${courseId}`, {});
export const deleteCourseSection:ApiResumeFunction = (resumeId) => 
API.patch(`/resume/course/deleteCourseSection/${resumeId}`, {});


// Custom section Apis
export const createCustomActivity:ApiCustomFunction = (resumeId) => 
	API.post(`/resume/custom/createCustomActivity/${resumeId}`, {});
export const addCustomActivity:ApiCustomFunction = (resumeId, customId) => 
	API.patch(`/resume/custom/addCustomActivity/${resumeId}/${customId}`, {});
export const updateCustomActivity:ApiCustomFunction = (resumeId, customId, customActivityId, ResumeData) => 
	API.patch(`/resume/custom/updateCustomActivity/${resumeId}/${customId}/${customActivityId}`, ResumeData);
export const deleteCustomActivity:ApiCustomFunction = (resumeId, customId, customActivityId) => 
	API.patch(`/resume/custom/deleteCustomActivity/${resumeId}/${customId}/${customActivityId}`, {});
export const deleteCustom:ApiCustomFunction = (resumeId, customId) => 
	API.patch(`/resume/custom/deleteCustom/${resumeId}/${customId}`, {});
