var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//require('crypto').randomBytes(16);
import { User } from './classes/user.class';
import { Auth } from './classes/auth.class';
/*
import  Swal  from 'sweetalert2';
Swal.fire({
            title: 'Error!',
            text: 'Email or Password incorrect',
            icon: 'error',
            confirmButtonText: 'Accept'
        })*/
let newLoginForm = null;
//Add geolocation
document.addEventListener('DOMContentLoaded', (e) => __awaiter(void 0, void 0, void 0, function* () {
    newLoginForm = document.getElementById("form-login");
    newLoginForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        let email = newLoginForm.email.value;
        let password = newLoginForm.password.value;
        let newLoginUser = new User({
            email: email,
            password: password
        });
        yield Auth.login(newLoginUser);
        location.assign('index.html');
    }));
}));
//# sourceMappingURL=login.js.map