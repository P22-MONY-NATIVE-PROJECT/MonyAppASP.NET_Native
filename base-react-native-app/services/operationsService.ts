import { createApi } from "@reduxjs/toolkit/query/react";
import { serialize } from "object-to-formdata";

import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IOperationItemResponse} from "@/types/operation/IOperationItemResponse";
import {ICreateOperationRequest} from "@/types/operation/ICreateOperationRequest";

export const categoriesService = createApi({
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
                body: serialize(body)
            }),
            invalidatesTags: ["Operations","Operation"]
        }),
    }),
});

export const {
    useGetOperationsQuery,
    useCreateOperationMutation,
} = categoriesService;