import {EChargeType} from "@/types/operation/EChargeType";
import { EChargeApplicationType } from "./EChargeApplicationType";

export interface ICreateOperationChargeRequest {
    amount: number;
    percentage: number;
    applicationType: EChargeApplicationType;
    type: EChargeType;
}