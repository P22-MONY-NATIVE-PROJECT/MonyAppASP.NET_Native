import { createApi } from "@reduxjs/toolkit/query/react";

import { createBaseQuery } from "@/utilities/createBaseQuery";
import {IOperationItemResponse} from "@/types/operation/IOperationItemResponse";
import {ICreateOperationRequest} from "@/types/operation/ICreateOperationRequest";
import {IDeleteOperationRequest} from "@/types/operation/IDeleteOperationRequest";
import {IGetOperationByIdRequest} from "@/types/operation/IGetOperationByIdRequest";
import {IEditOperationRequest} from "@/types/operation/IEditOperationRequest";
import {balancesService} from "@/services/balancesService";

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
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        //оновляємо операції по балансах
                        dispatch(operationsService.util.invalidateTags(['Operation','Operations']))
                        //оновили баланси
                        dispatch(balancesService.util.invalidateTags(['Balances','Balances']))
                    } catch (error) {
                        console.error('Create balans failed:', error);
                    }
                },
            }),

            editOperation: builder.mutation<void, IEditOperationRequest>({
                query: body => ({
                    url: "",
                    method: "PUT",
                    body: body
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        //оновляємо операції по балансах
                        dispatch(operationsService.util.invalidateTags(['Operation','Operations']))
                        //оновили баланси
                        dispatch(balancesService.util.invalidateTags(['Balances','Balances']))
                    } catch (error) {
                        console.error('Create balans failed:', error);
                    }
                },
                // invalidatesTags: ["Operations", "Operation"]
            }),

            deleteOperation: builder.mutation<void, IDeleteOperationRequest>({
                query: params => ({
                    url: `${params.id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["Operations"]
            }),

            getOperationById: builder.query<IOperationItemResponse, IGetOperationByIdRequest>({
                query: params => ({
                    url: `${params.id}`,
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