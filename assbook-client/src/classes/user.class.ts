import { IUser } from '../interfaces/user.interface';
import { SERVER } from '../constants';
import { Http } from './http.class';

export class User implements IUser {
    name?: string; 
    email: string;
    id?: number;
    password?: string;
    avatar?: string;
    me?: boolean;
    constructor(postJSON: IUser) {
        this.id = postJSON.id;
        this.name = postJSON.name;
        this.email = postJSON.email;
        this.password = postJSON.password;
        this.avatar = postJSON.avatar;
        this.me = postJSON.me;
    }

    static async getProfile(id?: number): Promise<User> {
        const resp = await Http.get(`${SERVER}/user/`);
        return resp.posts.map(p => p.id == id);
    }
    

    /*static async saveProfile(name: string, email: string): Promise<void>
    static async saveAvatar(avatar: string): Promise<string>
    static async savePassword(password: string): Promise<void>*/

}