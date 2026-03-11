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
        dollarExchangeRate: number;
    };
    amount: number;
    isSaving: boolean;
}
