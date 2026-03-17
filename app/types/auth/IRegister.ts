import {IImageFile} from "@/types/common/IImageFile";


export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    imageFile?: IImageFile;
}