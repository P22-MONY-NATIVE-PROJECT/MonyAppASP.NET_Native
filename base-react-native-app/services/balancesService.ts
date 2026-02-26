import { createApi } from "@reduxjs/toolkit/query/react";
import { serialize } from "object-to-formdata";
import { createBaseQuery } from "@/utilities/createBaseQuery";
import { IBalanceResponse } from "@/types/finance/IBalanceResponse";
import { ICreateBalanceRequest } from "@/types/finance/ICreateBalanceRequest";

export const balancesService = createApi({
    reducerPath: "api/balances",
    tagTypes: ["Balances"],
    baseQuery: createBaseQuery("balances"),
    endpoints: builder => ({

        getBalances: builder.query<IBalanceResponse[], void>({
            query: () => ({
                url: "",
            }),
            providesTags: ["Balances"]
        }),

        createBalance: builder.mutation<void, ICreateBalanceRequest>({
            query: body => ({
                url: "",
                method: "POST",
                body: serialize(body)
            }),
            invalidatesTags: ["Balances"]
        }),

        deleteBalance: builder.mutation<void, number>({
            query: id => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Balances"]
        }),
    }),
});

export const {
    useGetBalancesQuery,
    useCreateBalanceMutation,
    useDeleteBalanceMutation
} = balancesService;
