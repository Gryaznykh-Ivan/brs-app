import { appApi } from "../store/reducers/appApi";
import { IGroupAddStudentRequest, IGroupAddStudentResponse, IGroupCreateRequest, IGroupCreateResponse, IGroupGetRequest, IGroupGetResponse, IGroupGetSearchRequest, IGroupGetSearchResponse, IGroupGetUserGroupRequest, IGroupGetUserGroupResponse, IGroupRemoveRequest, IGroupRemoveResponse, IGroupRemoveStudentRequest, IGroupRemoveStudentResponse, IGroupSettingsChangeRequest, IGroupSettingsChangeResponse } from "../types/api";

export const groupService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getGroup: bulider.query<IGroupGetResponse, IGroupGetRequest>({
            query: ({ id }) => `group/${ id }`,
            providesTags: ['Group']
        }),
        getUserGroup: bulider.query<IGroupGetUserGroupResponse, IGroupGetUserGroupRequest>({
            query: (credentials) => ({
                url: "group/getUserGroup",
                method: "GET",
                params: credentials
            }),
            providesTags: ['Group']
        }),
        getGroupSearch: bulider.query<IGroupGetSearchResponse,IGroupGetSearchRequest>({
            query: (credentials) => ({
                url: "group/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ['Groups']
        }),
        addStudentToGroup: bulider.mutation<IGroupAddStudentResponse, IGroupAddStudentRequest>({
            query: ({ id, userId }) => ({
                url: `group/${ id }/addStudentToGroup`,
                method: "POST",
                body: {
                    id: userId
                }
            }),
            invalidatesTags: ['Users', 'Group', 'User', 'Table']
        }),
        removeStudentFromGroup: bulider.mutation<IGroupRemoveStudentResponse, IGroupRemoveStudentRequest>({
            query: ({ id, userId }) => ({
                url: `group/${ id }/removeStudentFromGroup`,
                method: "POST",
                body: {
                    id: userId
                }
            }),
            invalidatesTags: ['Users', 'Group', 'User', 'Table']
        }),
        createGroup: bulider.mutation<IGroupCreateResponse, IGroupCreateRequest>({
            query: (credentials) => ({
                url: "group/create",
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['Groups']
        }),
        changeGroupSettings: bulider.mutation<IGroupSettingsChangeResponse, IGroupSettingsChangeRequest>({
            query: ({ initialId, ...credentials }) => ({
                url: `group/${ initialId }/change`,
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['Group', 'User', 'Subject', 'Table']
        }),
        removeGroup: bulider.mutation<IGroupRemoveResponse, IGroupRemoveRequest>({
            query: ({ id }) => ({
                url: `group/${ id }/remove`,
                method: "DELETE"
            }),
            invalidatesTags: ['Groups', 'User', 'Subject', 'Group']
        })
    })
})

export const {
    useGetGroupQuery,
    useGetUserGroupQuery,
    useLazyGetGroupSearchQuery,
    useGetGroupSearchQuery,
    useAddStudentToGroupMutation,
    useCreateGroupMutation,
    useChangeGroupSettingsMutation,
    useRemoveGroupMutation,
    useRemoveStudentFromGroupMutation
} = groupService