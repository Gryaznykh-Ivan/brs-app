import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '..'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:2000/',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers
    }
});

const baseQueryWithLogic: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch({ type: "auth/logout" });
    }

    return result;
};


export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: baseQueryWithLogic,
    tagTypes: ['Profile', 'User', 'Users', 'Group', 'Groups', 'Subject', 'Subjects'],
    endpoints: (builder) => ({}),
})

