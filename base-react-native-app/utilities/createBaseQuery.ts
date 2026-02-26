import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { RootState } from "@/store";
import { BASE_URL } from "@/constants/Urls";

export const createBaseQuery = (endpoint: string) =>
    fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/${endpoint}/`,
        prepareHeaders: (headers, { getState }) => {
            return headers;
        },
    });
