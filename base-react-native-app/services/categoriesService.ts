import { createApi } from "@reduxjs/toolkit/query/react";
import {ICategoryItemResponse} from "@/types/category/ICategoryItemResponse";
import {IGetCategoriesRequest} from "@/types/category/IGetCategoriesRequest";
import { createBaseQuery } from "@/utilities/createBaseQuery";

export const chatService = createApi({
    reducerPath: "api/categories",
    tagTypes: ["Categories"],
    baseQuery: createBaseQuery("categories"),
    endpoints: builder => ({

        getCategories: builder.query<ICategoryItemResponse[], IGetCategoriesRequest>({
            query: params => ({
                url: "",
                params
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
} = chatService;
