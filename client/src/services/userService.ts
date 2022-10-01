import { appApi } from "../store/reducers/appApi";
import {
    IUserCreateRequest, IUserCreateResponse, IGeneralSettingsChangeRequest,
    IGeneralSettingsChangeResponse, IUserGetRequest, IUserGetResponse,
    IUserGetSearchRequest, IUserGetSearchResponse, IPasswordChangeRequest,
    IPasswordChangeResponse, IUserRemoveRequest, IUserRemoveResponse,
    IUserSettingsChangeRequest, IUserSettingsChangeResponse
} from "../types/api";

export const userService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getUser: bulider.query<IUserGetResponse, IUserGetRequest>({
            query: ({ id }) => ({
                url: `user/${id}`,
                method: "GET",
            }),
            providesTags: ["User"]
        }),
        getUserSearch: bulider.query<IUserGetSearchResponse, IUserGetSearchRequest>({
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
        createUser: bulider.mutation<IUserCreateResponse, IUserCreateRequest>({
            query: (credential) => ({
                url: `createUser`,
                method: "PUT",
                body: credential
            })
        }),
        changeUserSettings: bulider.mutation<IUserSettingsChangeResponse, IUserSettingsChangeRequest>({
            query: ({ id, ...credential }) => ({
                url: `changeUserSettings/${id}`,
                method: "POST",
                body: credential
            }),
            invalidatesTags: ["User"]
        }),
        removeUser: bulider.mutation<IUserRemoveResponse, IUserRemoveRequest>({
            query: ({ id }) => ({
                url: `removeUser/${id}`,
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