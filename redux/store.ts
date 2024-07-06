'use client'
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from './features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// Call refresh token
const initializeApp = async () => {
    // await store.dispatch(apiSlice.endpoints.initiate({}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}));
}

initializeApp();
