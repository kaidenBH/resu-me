export interface User {
	first_name: string;
	last_name: string;
	email: string;
	image?: string | null;
	account_type: string;
	token: string;
}

export interface PersonalDetails {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	job_title: string;
	image: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	country: string;
	city: string;
	summary: [string, string];
}

// Link interface
export interface Link_Section {
	_id: string;
	webite_name: string;
	url: string;
}
export interface Link {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	links: Link_Section[];
}

// Skill interface
export interface Skill_Section {
	_id: string;
	skill_name: string;
	level: number;
}
export interface Skill {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	skills: Skill_Section[];
}

// Language interface
export interface Language_Section {
	_id: string;
	language: string;
	level: number;
}
export interface Language {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	languages: Language_Section[];
}

// Internship interface
export interface InternShip_Section {
	_id: string;
	job_title: string;
	employer_name: string;
	start_date: string;
	end_date: string;
	city: string;
	description: string;
}
export interface InternShip {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	internships: InternShip_Section[];
}

// Employment interface
export interface Employment_Section {
	_id: string;
	job_title: string;
	employer_name: string;
	start_date: string;
	end_date: string;
	city: string;
	description: string;
}
export interface Employment {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	employments: Employment_Section[];
}

// Education interface
export interface Education_Section {
	_id: string;
	school_name: string;
	degree_title: string;
	start_date: string;
	end_date: string;
	city: string;
	description: string;
}
export interface Education {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	schools: Education_Section[];
}

// custom interface
export interface Custom_Section {
	_id: string;
	activity_title: string;
	start_date: string;
	end_date: string;
	city: string;
	description: string;
}
export interface Custom {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	activities: Custom_Section[];
}

// course interface
export interface Course_Section {
	_id: string;
	course_name: string;
	institution: string;
	start_date: string;
	end_date: string;
	description: string;
}
export interface Course {
    type: string;
	_id: string;
	resumeId: string;
	field_name: string;
	courses: Course_Section[];
}

// Fields type
export type FieldSection =
	| PersonalDetails
	| Link
	| Skill
	| Language
	| InternShip
	| Employment
	| Education
	| Custom
	| Course;

// Resume interface
export interface Resume {
	_id: string;
	title: string;
	template: string;
	owner: boolean;
	fields: FieldSection[];
}

export interface UpdatedSections {
	[key: string]: boolean;
	Education: boolean;
	Employment: boolean;
	Link: boolean;
	Skill: boolean;
	Language: boolean;
	InternShip: boolean;
	Course: boolean;
}