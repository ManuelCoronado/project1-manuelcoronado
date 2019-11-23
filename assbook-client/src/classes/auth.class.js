var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from './user.class';
import { Http } from './http.class';
import { SERVER } from '../constants';
import crypto from '../../node_modules/crypto-browserify';
export class Auth {
    static login(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.post(`${SERVER}/auth/login`, this);
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
        });
    }
    static register(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.post(`${SERVER}/auth/register`, this);
            resp.then(resultado => {
                new User(userInfo);
                resultado.status(200)
                    .send({
                    ok: true, resultado: userInfo
                });
            }).catch(error => {
                error.status(500)
                    .send({ ok: false, error: "Bad Request: " + error });
            });
        });
    }
}
//# sourceMappingURL=auth.class.js.map