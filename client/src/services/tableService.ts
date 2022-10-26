import { appApi } from "../store/reducers/appApi";
import { ITableAddColumnRequest, ITableAddColumnResponse, ITableChangeColumnNameRequest, ITableChangeColumnNameResponse, ITableCreateRequest, ITableCreateResponse, ITableGetByIdRequest, ITableGetByIdResponse, ITableGetNamesRequest, ITableGetNamesResponse, ITableGetStudentNamesRequest, ITableGetStudentNamesResponse, ITableRemoveColumnRequest, ITableRemoveColumnResponse, ITableRemoveRequest, ITableSetMarkRequest, ITableSetMarkResponse } from "../types/api";

export const tableService = appApi.injectEndpoints({
    endpoints: bulider => ({
        getTableNames: bulider.query<ITableGetNamesResponse, ITableGetNamesRequest>({
            query: (credentials) => ({
                url: `table/getNames`,
                method: "GET",
                params: credentials
            }),
            providesTags: ['TableNames']
        }),
        getStudentTableNames: bulider.query<ITableGetStudentNamesResponse, ITableGetStudentNamesRequest>({
            query: (credentials) => ({
                url: `table/getStudentNames`,
                method: "GET",
                params: credentials
            }),
            providesTags: ['TableNames']
        }),
        getTableById: bulider.query<ITableGetByIdResponse, ITableGetByIdRequest>({
            query: ({ id }) => ({
                url: `table/${id}`,
                method: "GET",
            }),
            providesTags: ['Table']
        }),
        createTable: bulider.mutation<ITableCreateResponse, ITableCreateRequest>({
            query: (credentials) => ({
                url: "table/create",
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['TableNames']
        }),
        removeTable: bulider.mutation<ITableCreateResponse, ITableRemoveRequest>({
            query: ({ id }) => ({
                url: `table/${id}/remove`,
                method: "DELETE"
            }),
            invalidatesTags: ['TableNames']
        }),
        removeColumn: bulider.mutation<ITableRemoveColumnResponse, ITableRemoveColumnRequest>({
            query: ({ id }) => ({
                url: `table/${id}/removeColumn`,
                method: "DELETE"
            }),
            invalidatesTags: ['Table']
        }),
        addColumn: bulider.mutation<ITableAddColumnResponse, ITableAddColumnRequest>({
            query: (credentials) => ({
                url: `table/${credentials.tableId}/addColumn`,
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['Table']
        }),
        changeColumnName: bulider.mutation<ITableChangeColumnNameResponse, ITableChangeColumnNameRequest>({
            query: ({ tableId, ...credentials }) => ({
                url: `table/${tableId}/changeColumn`,
                method: "POST",
                body: credentials
            }),
            invalidatesTags: ['Table']
        }),
        setMark: bulider.mutation<ITableSetMarkResponse, ITableSetMarkRequest>({
            query: (credentials) => ({
                url: `table/${credentials.tableId}/setMark`,
                method: "PUT",
                body: credentials
            }),
            invalidatesTags: ['Table']
        })
    })
})

export const {
    useGetTableByIdQuery,
    useGetTableNamesQuery,
    useGetStudentTableNamesQuery,
    useCreateTableMutation,
    useRemoveTableMutation,
    useAddColumnMutation,
    useRemoveColumnMutation,
    useChangeColumnNameMutation,
    useSetMarkMutation
} = tableService