import { IUser } from '../interfaces/user.interface';
import { User } from './user.class';
import { Http } from './http.class';
import { SERVER } from '../constants';
import crypto from '../../node_modules/crypto-browserify';
export class Auth {
    static async login(userInfo: IUser): Promise<void> {
        const resp = await Http.post(`${SERVER}/auth/login`, this);
        resp.then(resultado => {
            new User(userInfo);
            let accessToken = crypto.createHash('md5');
            localStorage.setItem("accessToken", accessToken);
            resultado.status(200)
                .send({
                    ok: true, resultado: accessToken
                });
        }).catch(error => {
            error.status(401)
                .send({ ok: false, error: "Not authorised" });
        });
    }
    static async register(userInfo: IUser): Promise<void>{
        const resp = await Http.post(`${SERVER}/auth/register`, this);
        resp.then(resultado => {
            new User(userInfo);
            resultado.status(200)
                .send({
                    ok: true, resultado: userInfo });
        }).catch(error => {
            error.status(500)
                .send({ ok: false, error: "Bad Request: " + error });
        });
    }
    //static async checkToken(): Promise<void>
    //static logout()
}
