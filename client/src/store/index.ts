import { setupListeners } from '@reduxjs/toolkit/query/react'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appApi } from './reducers/appApi'
import authSlice from './reducers/authSlice'
import loaderSlice from './reducers/loaderSlice'

const rootReducer = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    auth: authSlice,
    loader: loaderSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
