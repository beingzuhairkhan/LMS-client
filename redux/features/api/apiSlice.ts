import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../auth/authSlice';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    }),
    endpoints: (builder) => ({
        refreshToken: builder.mutation({
            query: () => ({
                url: "refresh",
                method: "GET",
                credentials: "include"
            })
        }),
        loadUser: builder.query({
            query: () => ({
                url: "me",
                method: "GET",
                credentials: "include"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log('Load User Query Result:', result); // Add logging
                    dispatch(
                        userLoggedIn({
                            token: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.error('Error in loadUser query:', error); // Improved logging
                }
            }
        })
    })
});

export const { useRefreshTokenMutation, useLoadUserQuery } = apiSlice;
