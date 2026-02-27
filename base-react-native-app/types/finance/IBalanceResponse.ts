export interface IBalanceResponse {
    id: number;
    name: string;
    icon?: string;
    currencyId: number;
    currency?: {
        id: number;
        name: string;
        code: string;
        symbol: string;
    };
    amount: number;
    isSaving: boolean;
}
