var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from './classes/user.class';
import { Auth } from './classes/auth.class';
let newUserForm = null;
let imagePreview = null;
function convertBase64(file) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        imagePreview.src = reader.result;
    }, false);
    if (file) { // File has been selected (convert to Base64)
        reader.readAsDataURL(file);
    }
}
document.addEventListener('DOMContentLoaded', (e) => __awaiter(void 0, void 0, void 0, function* () {
    newUserForm = document.getElementById("form-register");
    imagePreview = document.getElementById('imagePreview');
    document.getElementById('photo').addEventListener('change', () => {
        let file = document.getElementById('photo').files[0];
        convertBase64(file);
    });
    newUserForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (newUserForm.email.value !== newUserForm.email2.value) {
            alert("Emails are not equal");
        }
        else {
            let newUser = new User({
                name: newUserForm.name.value,
                email: newUserForm.email.value,
                password: newUserForm.password.value,
                avatar: imagePreview.src
            });
            yield Auth.register(newUser);
            location.assign('index.html');
        }
    }));
}));
//# sourceMappingURL=register.js.map