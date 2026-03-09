import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IOperationItemResponse} from "@/types/operation/IOperationItemResponse";
import {ICreateOperationRequest} from "@/types/operation/ICreateOperationRequest";
import {IDeleteOperationRequest} from "@/types/operation/IDeleteOperationRequest";
import {IGetCategoryByIdRequest} from "@/types/category/IGetCategoryByIdRequest";

export const operationsService = createApi({
    reducerPath: "api/operations",
    tagTypes: ["Operations", "Operation"],
    baseQuery: createBaseQuery("operations"),
    endpoints: builder => ({

        getOperations: builder.query<IOperationItemResponse[], void>({
            query: () => ({
                url: ""
            }),
            providesTags: ["Operations"]
        }),

        createOperation: builder.mutation<void, ICreateOperationRequest>({
            query: body => ({
                url: "",
                method: "POST",
                body: body //serialize(body)
            }),
            invalidatesTags: ["Operations","Operation"]
        }),

        editOperation: builder.mutation<void, IEditOperationRequest>({
            query: body => ({
                url: "",
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Operations","Operation"]
        }),

        deleteOperation: builder.mutation<void, IDeleteOperationRequest>({
            query: params => ({
                url: `/${params.id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Operations"]
        }),

        getOperationById: builder.query<IOperationItemResponse, IGetCategoryByIdRequest>({
            query: params => ({
                url: `/${params.id}`,
            }),
            providesTags: ["Operation"]
        }),
    }),
});

export const {
    useGetOperationsQuery,
    useCreateOperationMutation,
} = operationsService;