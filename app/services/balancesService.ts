import { serialize } from "object-to-formdata";
import { IBalanceResponse } from "@/types/finance/IBalanceResponse";
import { ICreateBalanceRequest } from "@/types/finance/ICreateBalanceRequest";
import {IBalanceGetByIdRequest} from "@/types/finance/IBalanceGetByIdRequest";
import {IEditBalanceRequest} from "@/types/finance/IEditBalanceRequest";
import {api} from "@/services/api";

export const balancesService =  api.injectEndpoints({
    endpoints: builder => ({

        getBalances: builder.query<IBalanceResponse[], void>({
            query: () => ({
                url: "balances",
            }),
            providesTags: ["Balances"]
        }),

        getBalancesBySaving: builder.query<IBalanceResponse[], { isSaving: boolean }>({
            query: ({ isSaving }) => ({
                url: "balances/by-saving",
                params: { isSaving },
            }),
            providesTags: ["Balances"]
        }),

        createBalance: builder.mutation<void, ICreateBalanceRequest>({
            query: body => ({
                url: "balances",
                method: "POST",
                body: serialize(body)
            }),
            invalidatesTags: ["Balances","Balance"]
        }),

        editBalance: builder.mutation<void, IEditBalanceRequest>({
            query: body => ({
                url: "balances",
                method: "PUT",
                body: serialize(body)
            }),
            invalidatesTags: ["Balances", "Balances", 'Operation','Operations']
        }),

        deleteBalance: builder.mutation<void, number>({
            query: id => ({
                url: `balances/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Balances","Balance"]
        }),

        getBalanceById: builder.query<IBalanceResponse, IBalanceGetByIdRequest>({
            query: params => ({
                url: `balances/${params.id}`,
            }),
            providesTags: ["Balance"]
        }),
    }),
});

export const {
    useGetBalancesQuery,
    useCreateBalanceMutation,
    useDeleteBalanceMutation,
    useGetBalanceByIdQuery,
    useEditBalanceMutation,
    useGetBalancesBySavingQuery
} = balancesService;
