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
type ApiResumeFunction = (
	resumeId?: string,
	fieldId?: string,
	ResumeData?: object
  ) => Promise<
	AxiosResponse<{
		data: object;
		employment_section?: object;
		education_section?: object;
		link_section?: object;
		skill_section?: object;
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
export const newResume: ApiResumeFunction = (ResumeData) => API.post('/resume/', ResumeData);
export const get_resume: ApiResumeFunction = (resumeId) => API.get(`/resume/${resumeId}`);
export const getAllResumes: ApiResumeFunction = () => API.get('/resume/getAllResumes');
export const removeResume: ApiResumeFunction = (resumeId) => API.delete(`/resume/${resumeId}`, {});
export const duplicateResume: ApiResumeFunction = (resumeId) => API.post(`/resume/duplicate/${resumeId}`, {});


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