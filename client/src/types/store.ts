import { UserRoles } from "./api";

export const AUTH_COLLACTING = "COLLACTING"
export const AUTH_VERIFYING = "VERIFYING"
export const AUTH_DONE = "DONE"

export interface IJwtDecode {
    id: string;
    role: keyof typeof UserRoles;
    iat: number;
    exp: number;
}

export interface IAuthState {
    isAuth: boolean;
    stage: typeof AUTH_COLLACTING | typeof AUTH_VERIFYING | typeof AUTH_DONE;
    token: string;
    payload: IJwtDecode | null;
    email: string;
}

export interface ILoaderState {
    isLoading: boolean
}