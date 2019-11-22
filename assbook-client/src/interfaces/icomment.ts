import { IUser } from "./user.interface";

export interface IComment {
    text: string;
    date?: string;
    user?: IUser;
}