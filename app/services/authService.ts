import {createApi} from "@reduxjs/toolkit/query/react";
import {IAuthResponse} from "@/types/auth/IAuthResponse";
import {ILogin} from "@/types/auth/ILogin";
import {IRegister} from "@/types/auth/IRegister";
import { IEditUser } from "@/types/auth/IEditUser";
import {serialize} from "object-to-formdata";
import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IForgotPasswordRequest} from "@/types/auth/IForgotPasswordRequest";
import {IResetPasswordRequest} from "@/types/auth/IResetPasswordRequest";
import {IRefreshRequest} from "@/types/auth/IRefreshRequest";
import {IGoogleLoginRequest} from "@/types/auth/IGoogleLoginRequest";

export const authService = createApi({
    reducerPath: 'api/auth',
    baseQuery: createBaseQuery('Auth'),
    tagTypes: ['Account', 'AccountPassword'],
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, ILogin>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials
            })
        }),

        register: builder.mutation<IAuthResponse, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'register',
                    method: 'POST',
                    body: formData
                };
            }
        }),

        editProfile: builder.mutation<IAuthResponse, IEditUser>({
            query: (data) => ({
                url: 'edit',
                method: 'PUT',
                body: serialize(data),
            }),
        }),

        forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
            query: (model) => ({
                url: 'forgot-password',
                method: 'POST',
                body: model
            })
        }),

        resetPassword: builder.mutation<IAuthResponse, IResetPasswordRequest>({
            query: (model) => ({
                url: 'reset-password',
                method: 'POST',
                body: model
            })
        }),
        refresh: builder.mutation<IAuthResponse, IRefreshRequest>({
            query: (body) => ({
                url: 'refresh',
                method: 'POST',
                body
            })
        }),

        googleLogin: builder.mutation<IAuthResponse, IGoogleLoginRequest>({
            query: (body) => ({
                url: 'google',
                method: 'POST',
                body
            })
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useEditProfileMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshMutation,
    useGoogleLoginMutation
} = authService;