

export interface IUser {
    id: string;
    name: string;
    lastName: string;
    birthday?: string;
    email: string;
    group?: string;
    role: string;
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

export interface IGeneralSettingsChangeRequest {
    name: string;
    lastName: string;
    email: string;
    group: string;
    birthday: string;
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

export interface IAuthErrorResponse {
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

export interface IPasswordChangeResponse {
    success: boolean;
}

export interface IGeneralSettingsChangeResponse {
    success: boolean;
}