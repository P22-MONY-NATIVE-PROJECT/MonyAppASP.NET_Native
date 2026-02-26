export interface ICreateBalanceRequest {
    name: string;
    icon?: any;
    currencyId: number;
    amount: number;
    isSaving: boolean;
}
