import { appApi } from "../store/reducers/appApi";
import {
    ICreateUserRequest, ICreateUserResponse, IGeneralSettingsChangeRequest,
    IGeneralSettingsChangeResponse, IGetUserRequest, IGetUserResponse,
    IGetUserSearchRequest, IGetUserSearchResponse, IPasswordChangeRequest,
    IPasswordChangeResponse, IRemoveUserRequest, IRemoveUserResponse,
    IUserSettingsChangeRequest, IUserSettingsChangeResponse
} from "../types/api";

export const userService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getUser: bulider.query<IGetUserResponse, IGetUserRequest>({
            query: ({ id }) => ({
                url: `user/${id}`,
                method: "GET",
            }),
            providesTags: ["User"]
        }),
        getUserSearch: bulider.query<IGetUserSearchResponse, IGetUserSearchRequest>({
            query: (credentials) => ({
                url: `user/search`,
                method: "GET",
                params: credentials
            }),
            providesTags: ['Users'],
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
        }),
        // admin routes
        createUser: bulider.mutation<ICreateUserResponse, ICreateUserRequest>({
            query: (credential) => ({
                url: `admin/createUser`,
                method: "PUT",
                body: credential
            })
        }),
        changeUserSettings: bulider.mutation<IUserSettingsChangeResponse, IUserSettingsChangeRequest>({
            query: ({ id, ...credential }) => ({
                url: `admin/changeUserSettings/${id}`,
                method: "POST",
                body: credential
            }),
            invalidatesTags: ["User"]
        }),
        removeUser: bulider.mutation<IRemoveUserResponse, IRemoveUserRequest>({
            query: ({ id }) => ({
                url: `admin/removeUser/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        }),
    })
})

export const {
    useGetUserQuery,
    useGetUserSearchQuery,
    useLazyGetUserSearchQuery,
    useChangeGeneralSettingsMutation,
    useChangePasswordMutation,
    useChangeUserSettingsMutation,
    useCreateUserMutation,
    useRemoveUserMutation
} = userService