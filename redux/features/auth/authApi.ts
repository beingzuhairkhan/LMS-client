import { apiSlice } from '../api/apiSlice';
import { userRegistration, userLoggedIn , userLoggedOut} from './authSlice';

type RegistrationResponse = {
    message: string,
    activationToken: string
}

type RegistrationData = {}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //register
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        //activation user
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "activate-User",
                method: "POST",
                body: {
                    activation_token,
                    activation_code
                }
            })
        }),
        //login
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "login",
                method: "POST",
                body: {
                    email, password
                },
                credentials: "include"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            token: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        //socialauth
        socialAuth: builder.mutation({
            query: ({ email, name, avatar }) => ({
                url: "socialAuth",
                method: "POST",
                body: {
                    email,
                    name,
                    avatar
                },
                credentials: "include"
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            token: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        //logout
        logOut: builder.query({
            query: () => ({
                url: "logout",
                method: "GET",
            
                credentials: "include",
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    dispatch(
                        userLoggedOut()
                    );
                } catch (error: any) {
                    console.log(error);
                }
            }
        })
    })
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation , useSocialAuthMutation , useLogOutQuery} = authApi;
