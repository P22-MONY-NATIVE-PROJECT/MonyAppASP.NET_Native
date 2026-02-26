import { createApi } from "@reduxjs/toolkit/query/react";
import { serialize } from "object-to-formdata";

import { ICategoryItemResponse } from "@/types/category/ICategoryItemResponse";
import { IGetCategoriesRequest } from "@/types/category/IGetCategoriesRequest";
import { ICreateCategoryRequest } from "@/types/category/ICreateCategoryRequest";
import { IEditCategoryRequest } from "@/types/category/IEditCategoryRequest";

import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IGetCategoryByIdRequest} from "@/types/category/IGetCategoryByIdRequest";
import {ICategoryTypeItemResponse} from "@/types/category/ICategoryTypeItemResponse";

export const categoriesService = createApi({
    reducerPath: "api/categories",
    tagTypes: ["Categories"],
    baseQuery: createBaseQuery("categories"),
    endpoints: builder => ({

        getCategories: builder.query<ICategoryItemResponse[], IGetCategoriesRequest>({
            query: params => ({
                url: "",
                params
            }),
            providesTags: ["Categories"]
        }),

        getCategoryById: builder.query<ICategoryItemResponse, IGetCategoryByIdRequest>({
            query: params => ({
                url: `/${params.id}`,
            }),
        }),

        getAllCategoryTypes: builder.query<ICategoryTypeItemResponse[], void>({
            query: () => ({
                url: `/all-category-types`,
            }),
        }),

        createCategory: builder.mutation<void, ICreateCategoryRequest>({
            query: body => ({
                url: "",
                method: "POST",
                body: serialize(body)
            }),
            invalidatesTags: ["Categories"]
        }),

        updateCategory: builder.mutation<void, IEditCategoryRequest>({
            query: body => ({
                url: "",
                method: "PUT",
                body: serialize(body)
            }),
            invalidatesTags: ["Categories"]
        }),

        deleteCategory: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Categories"]
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetAllCategoryTypesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery
} = categoriesService;