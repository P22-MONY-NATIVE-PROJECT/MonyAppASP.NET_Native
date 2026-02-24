import {IImageFile} from "@/types/common/IImageFile";

export interface IEditCategoryRequest {
    id: number;
    name: string;
    icon: IImageFile;
}