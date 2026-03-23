import {IOperationItemResponse} from "@/types/operation/IOperationItemResponse";
import {ICreateOperationRequest} from "@/types/operation/ICreateOperationRequest";
import {IDeleteOperationRequest} from "@/types/operation/IDeleteOperationRequest";
import {IGetOperationByIdRequest} from "@/types/operation/IGetOperationByIdRequest";
import {IEditOperationRequest} from "@/types/operation/IEditOperationRequest";
import {api} from "@/services/api";

export const operationsService = api.injectEndpoints({
    endpoints: builder => ({

            getOperations: builder.query<IOperationItemResponse[], void>({
                query: () => ({
                    url: "operations"
                }),
                providesTags: ["Operations"]
            }),

            createOperation: builder.mutation<void, ICreateOperationRequest>({
                query: body => ({
                    url: "operations",
                    method: "POST",
                    body: body //serialize(body)
                }),
                invalidatesTags: ['Balances','Balances','Operation','Operations']
            }),

            editOperation: builder.mutation<void, IEditOperationRequest>({
                query: body => ({
                    url: "operations",
                    method: "PUT",
                    body: body
                }),
                invalidatesTags: ['Balances','Balances','Operation','Operations']
            }),

            deleteOperation: builder.mutation<void, IDeleteOperationRequest>({
                query: params => ({
                    url: `operations/${params.id}`,
                    method: "DELETE"
                }),
                invalidatesTags: ["Operations"]
            }),

            getOperationById: builder.query<IOperationItemResponse, IGetOperationByIdRequest>({
                query: params => ({
                    url: `operations/${params.id}`,
                }),
                providesTags: ["Operation"]
            }),
    }),
});

export const {
    useGetOperationsQuery,
    useCreateOperationMutation,
    useEditOperationMutation,
    useDeleteOperationMutation,
    useGetOperationByIdQuery
} = operationsService;