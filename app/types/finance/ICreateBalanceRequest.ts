import {IImageFile} from "@/types/common/IImageFile";

export interface ICreateBalanceRequest {
    name: string;
    icon?: IImageFile;
    currencyId: number;
    amount: number;
    isSaving: boolean;
}
