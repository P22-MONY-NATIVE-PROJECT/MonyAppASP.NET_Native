import {
    type BaseQueryFn,
    fetchBaseQuery,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {APP_URLS} from "@/constants/Urls";
import { storage } from "@/utilities/storage";
import { logout } from "@/store/authSlice";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${APP_URLS.BASE_URL}/api/`,
    prepareHeaders: (headers) => {
        const token = storage.getAccessToken();

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const createBaseQuery = (endpoint: string): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
    return async (args, api, extraOptions) => {
        const normalizedArgs: FetchArgs =
            typeof args === "string"
                ? { url: `${endpoint}/${args}` }
                : { ...args, url: `${endpoint}/${args.url}` };

        let result = await rawBaseQuery(normalizedArgs, api, extraOptions);

        if (result.error?.status === 401) {
            console.log("[BaseQuery] 401 Unauthorized - Clearing auth and logging out.");
            storage.clearAuth();
            api.dispatch(logout());
        }

        return result;
    };
};
