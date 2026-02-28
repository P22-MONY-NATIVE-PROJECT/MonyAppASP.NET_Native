import {IImageFile} from "@/types/common/IImageFile";

export interface IEditBalanceRequest {
    id: number;
    name: string;
    icon?: IImageFile;
    currencyId: number;
    amount: number;
    isSaving: boolean;
}
