import {
    type BaseQueryFn,
    fetchBaseQuery,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import {APP_URLS} from "@/constants/Urls";
import { storage } from "@/utilities/storage";
import { setAuth } from "@/store/authSlice";

interface RefreshResponse {
    accessToken: string;
    refreshToken: string;
}

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

        if (result.error?.status !== 401) {
            return result;
        }

        const refreshToken = storage.getRefreshToken();

        if (!refreshToken) {
            storage.clearAuth();
            return result;
        }

        const refreshResult = await rawBaseQuery(
            {
                url: "Auth/refresh",
                method: "POST",
                body: { refreshToken },
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const tokens = refreshResult.data as RefreshResponse;

            api.dispatch(setAuth(tokens));

            result = await rawBaseQuery(
                {
                    ...normalizedArgs,
                    headers: {
                        ...(normalizedArgs.headers ?? {}),
                        authorization: `Bearer ${tokens.accessToken}`,
                    },
                },
                api,
                extraOptions
            );

            return result;
        }

        storage.clearAuth();
        return result;
    };
};