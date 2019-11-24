var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SERVER } from '../constants';
import { Http } from './http.class';
export class User {
    constructor(postJSON) {
        this.id = postJSON.id;
        this.name = postJSON.name;
        this.email = postJSON.email;
        this.password = postJSON.password;
        this.avatar = postJSON.avatar;
        this.me = postJSON.me;
    }
    static getProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.get(`${SERVER}/user/`);
            return resp.posts.map(p => p.id == id);
        });
    }
}
//# sourceMappingURL=user.class.js.map