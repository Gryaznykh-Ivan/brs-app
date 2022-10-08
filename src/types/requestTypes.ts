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

export type LoginThroughEmailRequest = {
    email: string;
    code: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type SendVerificationCodeRequest = {
    email: string;
}

export type RegisterRequest = {
    email: string;
    password: string;
    birthday: string;
    name: string;
    lastName: string;
    group: string;
}

export type GeneralSettingsChangeRequest = {
    email: string;
    birthday: string;
    name: string;
    lastName: string;
    group: string;
}

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
}

export type GetByIdRequest = {
    id: string;
}

export type CreateUserRequest = {
    email: string;
    password: string;
    birthday: string;
    name: string;
    lastName: string;
    group: string;
    role: keyof typeof UserRoles;
}

export type ChangeUserRequest = {
    email: string;
    password: string;
    birthday: string;
    name: string;
    lastName: string;
    group: string;
    role: keyof typeof UserRoles;
}

export type ChangeGroupRequest = {
    id: string;
    faculty: number;
    foundingDate: string;
}

export type CreateGroupRequest = {
    id: string;
}

export type IdParamsRequest = {
    id: string;
}

export type GetBySearchRequest = {
    q?: string;
    limit?: string;
    skip?: string;
    exclude?: string;
}

export type AddStudentToGroupRequest = {
    id: string;
}

export type RemoveStudentFromGroupRequest = {
    id: string;
}

export type CreateSubjectRequest = {
    type: keyof typeof SubjectTypes;
    title: string;
    createdBy: string;
}

export type AddGroupToSubjectRequest = {
    id: string;
}

export type RemoveGroupFromSubjectRequest = {
    id: string;
}

export type ChangeSubjectRequest = {
    title: string;
    type: keyof typeof SubjectTypes;
}