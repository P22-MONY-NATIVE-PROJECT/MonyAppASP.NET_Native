import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IOperationItemResponse} from "@/types/operation/IOperationItemResponse";
import {ICreateOperationRequest} from "@/types/operation/ICreateOperationRequest";
import {IDeleteOperationRequest} from "@/types/operation/IDeleteOperationRequest";
import {IEditOperationChargeRequest} from "@/types/operation/IEditOperationChargeRequest";
import {IGetOperationByIdRequest} from "@/types/operation/IGetOperationByIdRequest";

export const operationsService = createApi({
    reducerPath: "api/operations",
    tagTypes: ["Operations", "Operation"],
    baseQuery: createBaseQuery("operations"),
    endpoints: builder => {
        return ({

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
                invalidatesTags: ["Operations", "Operation"]
            }),

            editOperation: builder.mutation<void, IEditOperationRequest>({
                query: body => ({
                    url: "",
                    method: "PUT",
                    body: body
                }),
                invalidatesTags: ["Operations", "Operation"]
            }),

            deleteOperation: builder.mutation<void, IDeleteOperationRequest>({
                query: params => ({
                    url: `/${params.id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["Operations"]
            }),

            getOperationById: builder.query<IOperationItemResponse, IGetOperationByIdRequest>({
                query: params => ({
                    url: `/${params.id}`,
                }),
                providesTags: ["Operation"]
            }),
        });
    },
});

export const {
    useGetOperationsQuery,
    useCreateOperationMutation,
    useEditOperationMutation,
    useDeleteOperationMutation,
    useGetOperationByIdQuery
} = operationsService;