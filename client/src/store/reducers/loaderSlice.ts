import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { ILoaderState } from "../../types/store";

const initialState: ILoaderState = {
    isLoading: false
}

const loaderSlice = createSlice({
    name: 'loader',
    initialState: initialState,
    reducers: {
        setLoading: (state, { payload: { isLoading } }) => {
            state.isLoading = isLoading
        }
    },
    extraReducers: builder => {
        for (let endpoint of Object.values(authService.endpoints)) {
            builder.addMatcher(
                endpoint.matchPending,
                (state) => {
                    state.isLoading = true
                }
            ).addMatcher(
                endpoint.matchFulfilled,
                (state) => {
                    state.isLoading = false
                }
            ).addMatcher(
                endpoint.matchRejected,
                (state) => {
                    state.isLoading = false
                }
            )
        }
    }
})

export const { setLoading } = loaderSlice.actions
export default loaderSlice.reducer
