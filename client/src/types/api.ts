
export enum UserRoles {
    STUDENT = "STUDENT",
    HEADMAN = "HEADMAN",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
}

export enum SubjectTypes {
    ELECTIVE_COURSE = "ELECTIVE_COURSE",
    DISCIPLINE = "DISCIPLINE"
}

export enum TranslatedSubjectTypes {
    ELECTIVE_COURSE = "Элективный курс",
    DISCIPLINE = "Дисциплина"
}

export enum TranslatedUserRoles {
    STUDENT = "Студент",
    HEADMAN = "Староста",
    TEACHER = "Учитель",
    ADMIN = "Администратор"
}

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    FIO: string;
    birthday: string | null;
    email: string;
    group: string | null;
    role: keyof typeof UserRoles;
}

export interface IGroupCard {
    id: string;
    faculty: string;
    foundingDate: string;
    studentsCount: number;
}

export interface IGroup {
    id: string;
    faculty: string;
    foundingDate: string;
    students: IUser[]
}

export interface ISubject {
    id: string;
    type: keyof typeof SubjectTypes;
    title: string;
    createdByFIO: string;
    updatedAt: string;
    Groups: IGroupCard[]
}

export interface ISubjectCard {
    id: string;
    type: keyof typeof SubjectTypes;
    title: string;
    createdByFIO: string;
    updatedAt: string;
}


export interface IResponse<T> {
    success: boolean;
    data: T
}

export interface ILoginRequest {
    email: string;
    password: string;
};

export interface IRegisterRequest {
    email: string;
    password: string;
    birthday: string;
    name: string;
    lastName: string;
    group: string;
}

export interface ILoginThroughEmailRequest {
    email: string;
    code: string;
}

export interface ISendVerificationCodeRequest {
    email: string;
}

export interface IUserGetRequest {
    id: string;
}

export interface IUserGetSearchRequest {
    q: string;
    limit: number;
    skip: number;
}

export interface IGeneralSettingsChangeRequest {
    name: string;
    lastName: string;
    email: string;
    group: string;
    birthday: string;
}


export interface IUserSettingsChangeRequest {
    id: string;
    name: string;
    lastName: string;
    email: string;
    group: string;
    birthday: string;
    password: string;
    role: keyof typeof UserRoles;
}

export interface IUserCreateRequest {
    name: string;
    lastName: string;
    email: string;
    group: string;
    birthday: string;
    password: string;
    role: keyof typeof UserRoles;
}

export interface IUserRemoveRequest {
    id: string;
}

export interface IPasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
}

export interface IGroupGetRequest {
    id: string;
}

export interface IGroupGetSearchRequest {
    q: string;
    limit: number;
    skip: number;
    exclude?: string;
}


export interface IGroupSettingsChangeRequest {
    initialId: string;
    id: string;
    faculty: string;
    foundingDate: string;
}


export interface IGroupRemoveRequest {
    id: string;
}

export interface IGroupAddStudentRequest {
    id: string;
    userId: string;
}

export interface IGroupRemoveStudentRequest {
    id: string;
    userId: string;
}

export interface IGroupCreateRequest {
    id: string;
}

export interface ISubjectGetRequest {
    id: string;
}

export interface ISubjectGetSearchRequest {
    q: string;
    limit: number;
    skip: number;
}


export interface ISubjectSettingsChangeRequest {
    initialId: string;
    title: string;
    type: keyof typeof SubjectTypes;
}


export interface ISubjectRemoveRequest {
    id: string;
}

export interface ISubjectAddGroupRequest {
    id: string;
    groupId: string;
}

export interface ISubjectRemoveGroupRequest {
    id: string;
    groupId: string;
}

export interface ISubjectCreateRequest {
    type: keyof typeof SubjectTypes;
    title: string;
    createdById: string;
}








export interface ILoginThroughEmailResponse {
    success: boolean;
    data: string;
}

export interface ISendVerificationCodeResponse {
    success: boolean;
    data: string;
}

export interface IErrorResponse {
    success: boolean;
    error: string;
}

export interface ILoginResponse {
    success: boolean;
    data: string;
}

export interface IRegisterResponse {
    success: boolean;
}

export interface IUserGetResponse {
    success: boolean;
    data: IUser;
}

export interface IUserGetSearchResponse {
    success: boolean;
    data: IUser[];
}

export interface IPasswordChangeResponse {
    success: boolean;
}

export interface IGeneralSettingsChangeResponse {
    success: boolean;
}

export interface IUserSettingsChangeResponse {
    success: boolean;
}

export interface IUserCreateResponse {
    success: boolean;
}

export interface IUserRemoveResponse {
    success: boolean;
}

export interface IGroupGetSearchResponse {
    success: boolean;
    data: IGroupCard[];
}

export interface IGroupSettingsChangeResponse {
    success: boolean;
}

export interface IGroupRemoveResponse {
    success: boolean;
}

export interface IGroupAddStudentResponse {
    success: boolean;
}
export interface IGroupRemoveStudentResponse {
    success: boolean;
}

export interface IGroupGetResponse {
    success: string;
    data: IGroup
}

export interface IGroupCreateResponse {
    success: boolean;
}

export interface ISubjectGetSearchResponse {
    success: boolean;
    data: ISubjectCard[];
}

export interface ISubjectSettingsChangeResponse {
    success: boolean;
}

export interface ISubjectRemoveResponse {
    success: boolean;
}

export interface ISubjectAddGroupResponse {
    success: boolean;
}
export interface ISubjectRemoveGroupResponse {
    success: boolean;
}

export interface ISubjectGetResponse {
    success: string;
    data: ISubject;
}

export interface ISubjectCreateResponse {
    success: boolean;
}