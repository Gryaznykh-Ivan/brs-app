import { appApi } from "../store/reducers/appApi";
import { ISubjectAddGroupRequest, ISubjectAddGroupResponse, ISubjectCreateRequest, ISubjectCreateResponse, ISubjectGetRequest, ISubjectGetResponse, ISubjectGetSearchRequest, ISubjectGetSearchResponse, ISubjectRemoveRequest, ISubjectRemoveResponse, ISubjectRemoveGroupRequest, ISubjectRemoveGroupResponse, ISubjectSettingsChangeRequest, ISubjectSettingsChangeResponse } from "../types/api";

export const subjectService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getSubject: bulider.query<ISubjectGetResponse, ISubjectGetRequest>({
            query: ({ id }) => `subject/${ id }`,
            providesTags: ['Subject']
        }),
        getSubjectSearch: bulider.query<ISubjectGetSearchResponse,ISubjectGetSearchRequest>({
            query: (credentials) => ({
                url: "subject/search",
                method: "GET",
                params: credentials
            }),
            providesTags: ['Subjects']
        }),
        addGroupToSubject: bulider.mutation<ISubjectAddGroupResponse, ISubjectAddGroupRequest>({
            query: ({ id, groupId }) => ({
                url: `subject/${ id }/addGroupToSubject`,
                method: "POST",
                body: {
                    id: groupId
                }
            }),
            invalidatesTags: ['Subjects', 'Subject', 'Groups']
        }),
        removeGroupFromSubject: bulider.mutation<ISubjectRemoveGroupResponse, ISubjectRemoveGroupRequest>({
            query: ({ id, groupId }) => ({
                url: `subject/${ id }/removeGroupFromSubject`,
                method: "POST",
                body: {
                    id: groupId
                }
            }),
            invalidatesTags: ['Subject']
        }),
        createSubject: bulider.mutation<ISubjectCreateResponse, ISubjectCreateRequest>({
            query: (credentials) => ({
                url: "subject/create",
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['Subjects']
        }),
        changeSubjectSettings: bulider.mutation<ISubjectSettingsChangeResponse, ISubjectSettingsChangeRequest>({
            query: ({ initialId, ...credentials }) => ({
                url: `subject/${ initialId }/change`,
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['Subject']
        }),
        removeSubject: bulider.mutation<ISubjectRemoveResponse, ISubjectRemoveRequest>({
            query: ({ id }) => ({
                url: `subject/${ id }/remove`,
                method: "DELETE"
            }),
            invalidatesTags: ['Subjects']
        })
    })
})

export const {
    useGetSubjectQuery,
    useLazyGetSubjectSearchQuery,
    useGetSubjectSearchQuery,
    useAddGroupToSubjectMutation,
    useCreateSubjectMutation,
    useChangeSubjectSettingsMutation,
    useRemoveSubjectMutation,
    useRemoveGroupFromSubjectMutation
} = subjectService