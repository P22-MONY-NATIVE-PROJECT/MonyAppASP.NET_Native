import { IEditOperationChargeRequest } from "./IEditOperationChargeRequest";

interface IEditOperationRequest {
    id: number;
    comment: string;
    amount: number;
    categoryId: number;
    balanceId: number;
    charges: IEditOperationChargeRequest[];
}