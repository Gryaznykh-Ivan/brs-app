import { appApi } from "../store/reducers/appApi";
import { ILoginRequest, ILoginResponse, ILoginThroughEmailRequest, ILoginThroughEmailResponse, IRegisterRequest, IRegisterResponse, ISendVerificationCodeRequest, ISendVerificationCodeResponse } from "../types/api";

export const authService = appApi.injectEndpoints({
    endpoints: bulider => ({
        login: bulider.mutation<ILoginResponse, ILoginRequest>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['User']
        }),
        register: bulider.mutation<IRegisterResponse, IRegisterRequest>({
            query: (credentials) => ({
                url: "auth/register",
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['User']
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
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLoginThroughEmailMutation,
    useSendVerificationCodeMutation
} = authService