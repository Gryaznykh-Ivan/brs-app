import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode"
import { IAuthState } from "../../types/store";
import { authService } from "../../services/authService";
import { AUTH_COLLACTING, AUTH_VERIFYING, AUTH_DONE } from "../../types/store"

const initialState: IAuthState = {
    isAuth: false,
    payload: null,
    stage: AUTH_COLLACTING,
    token: "",
    email: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isAuth = true
            state.token = payload.token
            state.stage = AUTH_DONE
            state.payload = payload.decode
        },
        logout: (state) => {
            localStorage.removeItem("token");

            state.isAuth = initialState.isAuth
            state.token = initialState.token
            state.stage = initialState.stage 
            state.payload = initialState.payload
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                authService.endpoints.login.matchFulfilled,
                (state, { payload }) => {
                    localStorage.setItem("token", payload.data);

                    state.isAuth = true
                    state.token = payload.data
                    state.stage = AUTH_DONE
                    state.payload = jwt_decode(payload.data)
                }
            )
            .addMatcher(
                authService.endpoints.loginThroughEmail.matchFulfilled,
                (state, { payload }) => {
                    localStorage.setItem("token", payload.data);

                    state.isAuth = true
                    state.token = payload.data
                    state.stage = AUTH_DONE
                    state.payload = jwt_decode(payload.data)
                }
            )
            .addMatcher(
                authService.endpoints.sendVerificationCode.matchFulfilled,
                (state, { payload }) => {
                    state.email = payload.data
                    state.stage = AUTH_VERIFYING
                }
            )
    }
})


export const { logout } = authSlice.actions
export default authSlice.reducer
