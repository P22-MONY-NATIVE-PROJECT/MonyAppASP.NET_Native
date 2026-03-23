import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "@/utilities/createBaseQuery";

export const api = createApi({
    reducerPath: "api",
    baseQuery: createBaseQuery(""),
    tagTypes: [
        "Balances",
        "Balance",
        "Operations",
        "Operation",
        "Categories",
        "Category",
        "Account",
        "AccountPassword"
    ],
    endpoints: () => ({})
});