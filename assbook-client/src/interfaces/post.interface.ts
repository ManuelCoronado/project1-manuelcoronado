import { IUser } from "./user.interface";

export interface IPost {
    id?: number;
    title?: string;
    description?: string;
    mood: number;
    image?: string;
    lat?: number;
    lng?: number;
    place?: string;
    date?: string;
    totalLikes?: number;
    vote?: {
        likes: boolean
    };
    creator?: IUser;
    mine?: boolean;
}