
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
    lastName : string;
    group: string;
}

export type GeneralSettingsChangeRequest = {
    email: string;
    birthday: string;
    name: string;
    lastName : string;
    group: string;
}

export type ChangePasswordRequest = {
    oldPassword: string;
    newPassword: string;
}

export type GetByIdRequest = {
    id: string;
}

export type GetByNameRequest = {
    q: string;
}