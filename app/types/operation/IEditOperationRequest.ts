import {IEditOperationChargeRequest} from "@/types/operation/IEditOperationChargeRequest";

export interface IEditOperationRequest {
    id: number;
    comment: string;
    amount: number;
    categoryId: number;
    balanceId: number;
    charges: IEditOperationChargeRequest[];
}