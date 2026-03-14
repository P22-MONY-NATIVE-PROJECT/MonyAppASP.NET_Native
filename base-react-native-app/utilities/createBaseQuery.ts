import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { logout } from "@/store/authSlice";
import { APP_URLS } from "@/constants/Urls";
import { getToken } from "@/utilities/storage";

export const createBaseQuery = (endpoint: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    const baseQuery = fetchBaseQuery({
        baseUrl: `${APP_URLS.BASE_URL}/api/${endpoint}/`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    return async (args, api, extraOptions) => {
        const result = await baseQuery(args, api, extraOptions);
        if (result.error?.status === 401) {
            api.dispatch(logout());
        }
        return result;
    };
};
