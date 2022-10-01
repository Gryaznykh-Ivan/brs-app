import { appApi } from "../store/reducers/appApi";
import { IGroupAddStudentRequest, IGroupAddStudentResponse, IGroupCreateRequest, IGroupCreateResponse, IGroupGetRequest, IGroupGetResponse, IGroupGetSearchRequest, IGroupGetSearchResponse, IGroupRemoveRequest, IGroupRemoveResponse, IGroupRemoveStudentRequest, IGroupRemoveStudentResponse, IGroupSettingsChangeRequest, IGroupSettingsChangeResponse } from "../types/api";

export const groupService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getGroup: bulider.query<IGroupGetResponse, IGroupGetRequest>({
            query: ({ id }) => `group/${ id }`,
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
            invalidatesTags: ['Users', 'Group']
        }),
        removeStudentFromGroup: bulider.mutation<IGroupRemoveStudentResponse, IGroupRemoveStudentRequest>({
            query: ({ id, userId }) => ({
                url: `group/${ id }/removeStudentFromGroup`,
                method: "POST",
                body: {
                    id: userId
                }
            }),
            invalidatesTags: ['Group']
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
            invalidatesTags: ['Group']
        }),
        removeGroup: bulider.mutation<IGroupRemoveResponse, IGroupRemoveRequest>({
            query: ({ id }) => ({
                url: `group/${ id }/remove`,
                method: "DELETE"
            }),
            invalidatesTags: ['Groups']
        })
    })
})

export const {
    useGetGroupQuery,
    useLazyGetGroupSearchQuery,
    useGetGroupSearchQuery,
    useAddStudentToGroupMutation,
    useCreateGroupMutation,
    useChangeGroupSettingsMutation,
    useRemoveGroupMutation,
    useRemoveStudentFromGroupMutation
} = groupService