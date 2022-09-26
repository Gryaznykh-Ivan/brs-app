import { appApi } from "../store/reducers/appApi";
import { IGeneralSettingsChangeRequest, IGeneralSettingsChangeResponse, IGetUserRequest, IGetUserResponse, IPasswordChangeRequest, IPasswordChangeResponse } from "../types/api";

export const userService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getUser: bulider.query<IGetUserResponse, IGetUserRequest>({
            query: ({ id }) => ({
                url: `user/${ id }`,
                method: "GET",
            }),
            providesTags: ["User"]
        }),
        changeGeneralSettings: bulider.mutation<IGeneralSettingsChangeResponse, IGeneralSettingsChangeRequest>({
            query: (credential) => ({
                url: "settings/changeGeneral",
                method: "POST",
                body: credential
            }),
            invalidatesTags: ["User"]
        }),
        changePassword: bulider.mutation<IPasswordChangeResponse, IPasswordChangeRequest>({
            query: (credential) => ({
                url: "settings/changePassword",
                method: "POST",
                body: credential
            })
        })
    })
})

export const {
    useGetUserQuery,
    useChangeGeneralSettingsMutation,
    useChangePasswordMutation
} = userService