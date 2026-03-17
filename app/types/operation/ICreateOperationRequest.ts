import { ICreateOperationChargeRequest } from "./ICreateOperationChargeRequest";

export interface ICreateOperationRequest {
    comment: string;
    initAmount: number;
    categoryId: number;
    balanceId: number;
    charges: ICreateOperationChargeRequest[];
}