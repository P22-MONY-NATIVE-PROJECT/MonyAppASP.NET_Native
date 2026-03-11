import {createApi} from "@reduxjs/toolkit/query/react";
import {IAuthResponse} from "@/types/auth/IAuthResponse";
import {ILogin} from "@/types/auth/ILogin";
import {IRegister} from "@/types/auth/IRegister";
import {serialize} from "object-to-formdata";
import { createBaseQuery } from "@/utilities/createBaseQuery";

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
                const formData =  serialize(credentials);

                return {
                    url: 'register',
                    method: 'POST',
                    body: formData
                };
            }
        })

    })
});

export const {
    useLoginMutation,
    useRegisterMutation
} = authService;