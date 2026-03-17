import {IChargeResponse} from "@/types/operation/IChargeResponse";

export interface IOperationItemResponse {
    id: number;
    initAmount: number;
    calcAmount: number;
    comment: string;
    balanceId: number;
    categoryId: number;
    categoryName: string;
    balanceName: string;
    sign: string;
    dateCreated: string;
    charges: IChargeResponse[];
}