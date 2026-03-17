import {EChargeType} from "@/types/operation/EChargeType";
import {EChargeApplicationType} from "@/types/operation/EChargeApplicationType";

export interface IEditOperationChargeRequest {
    id: number;
    amount: number;
    percentage: number;
    type: EChargeType;
    applicationType: EChargeApplicationType;
}