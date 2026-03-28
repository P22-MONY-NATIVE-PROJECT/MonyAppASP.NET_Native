import {IAuthResponse} from "@/types/auth/IAuthResponse";
import {ILogin} from "@/types/auth/ILogin";
import {IRegister} from "@/types/auth/IRegister";
import { IEditUser } from "@/types/auth/IEditUser";
import {serialize} from "object-to-formdata";
import {IForgotPasswordRequest} from "@/types/auth/IForgotPasswordRequest";
import {IResetPasswordRequest} from "@/types/auth/IResetPasswordRequest";
import {IRefreshRequest} from "@/types/auth/IRefreshRequest";
import {IGoogleLoginRequest} from "@/types/auth/IGoogleLoginRequest";
import { api } from "@/services/api";

export const authService = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuthResponse, ILogin>({
            query: (credentials) => ({
                url: 'Auth/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: ["Balances","Balance","Operations","Operation","Categories","Category"]
        }),

        register: builder.mutation<IAuthResponse, IRegister>({
            query: (credentials) => {
                const formData = serialize(credentials);

                return {
                    url: 'Auth/register',
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ["Balances","Balance","Operations","Operation","Categories","Category"]
        }),

        editProfile: builder.mutation<IAuthResponse, IEditUser>({
            query: (data) => ({
                url: 'Auth/edit',
                method: 'PUT',
                body: serialize(data),
            }),
        }),

        forgotPassword: builder.mutation<void, IForgotPasswordRequest>({
            query: (model) => ({
                url: 'Auth/forgot-password',
                method: 'POST',
                body: model
            })
        }),

        resetPassword: builder.mutation<IAuthResponse, IResetPasswordRequest>({
            query: (model) => ({
                url: 'Auth/reset-password',
                method: 'POST',
                body: model
            })
        }),
        refresh: builder.mutation<IAuthResponse, IRefreshRequest>({
            query: (body) => ({
                url: 'Auth/refresh',
                method: 'POST',
                body
            })
        }),

        googleLogin: builder.mutation<IAuthResponse, IGoogleLoginRequest>({
            query: (body) => ({
                url: 'Auth/google',
                method: 'POST',
                body
            })
        }),

    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useEditProfileMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRefreshMutation,
    useGoogleLoginMutation,
} = authService;

