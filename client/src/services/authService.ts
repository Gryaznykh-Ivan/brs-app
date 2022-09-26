import { appApi } from "../store/reducers/appApi";
import { ILoginRequest, ILoginResponse, ILoginThroughEmailRequest, ILoginThroughEmailResponse, IRegisterRequest, IRegisterResponse, ISendVerificationCodeRequest, ISendVerificationCodeResponse } from "../types/api";

export const authService = appApi.injectEndpoints({
    endpoints: bulider => ({
        login: bulider.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials
            })
        }),
        register: bulider.mutation<IRegisterResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: "auth/register",
                method: "POST",
                body: credentials
            })
        }),
        sendVerificationCode: bulider.mutation<ISendVerificationCodeResponse, ISendVerificationCodeRequest>({
            query: (credentials) => ({
                url: "auth/sendVerificationCode",
                method: "POST",
                body: credentials
            })
        }),
        loginThroughEmail: bulider.mutation<ILoginThroughEmailResponse, ILoginThroughEmailRequest>({
            query: (credentials) => ({
                url: "auth/loginThroughEmail",
                method: "POST",
                body: credentials
            })
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLoginThroughEmailMutation,
    useSendVerificationCodeMutation
} = authService