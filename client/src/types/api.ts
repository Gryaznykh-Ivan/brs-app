
export enum UserRoles {
    STUDENT = "STUDENT",
    HEADMAN = "HEADMAN",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN"
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

export interface IGetUserRequest {
    id: string;
}

export interface IGetUserSearchRequest {
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

export interface ICreateUserRequest {
    name: string;
    lastName: string;
    email: string;
    group: string;
    birthday: string;
    password: string;
    role: keyof typeof UserRoles;
}

export interface IRemoveUserRequest {
    id: string;
}

export interface IPasswordChangeRequest {
    oldPassword: string;
    newPassword: string;
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

export interface IGetUserResponse {
    success: boolean;
    data: IUser;
}

export interface IGetUserSearchResponse {
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

export interface ICreateUserResponse {
    success: boolean;
}

export interface IRemoveUserResponse {
    success: boolean;
}