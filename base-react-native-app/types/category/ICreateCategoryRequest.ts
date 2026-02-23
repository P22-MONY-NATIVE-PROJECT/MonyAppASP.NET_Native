import {IImageFile} from "@/types/common/IImageFile";

export interface ICreateCategoryRequest {
    name: string;
    icon: IImageFile;
}