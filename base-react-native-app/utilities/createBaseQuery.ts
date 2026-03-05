import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {APP_URLS} from "@/constants/Urls";
import {getToken} from "@/utilities/storage";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${APP_URLS.BASE_URL}/api/${endpoint}/`,
        prepareHeaders: async (headers) => {
            const token = await getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });