import { User } from './classes/user.class';
import { Auth } from './classes/auth.class';

let newUserForm: HTMLFormElement = null;
let imagePreview: HTMLImageElement = null;

function convertBase64(file: File) {
    let reader = new FileReader();
    reader.addEventListener('load', () => { //Converted into Base64 event (async)
        imagePreview.src = reader.result as string;
    }, false);
    if (file) { // File has been selected (convert to Base64)
        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', async e => {
    newUserForm = document.getElementById("form-register") as HTMLFormElement;
    imagePreview = document.getElementById('imagePreview') as HTMLImageElement;

    document.getElementById('photo').addEventListener('change', () => {
        let file = (document.getElementById('photo') as HTMLInputElement).files[0];
        convertBase64(file);
    });

    newUserForm.addEventListener('submit', async e => {
        e.preventDefault();
        if (newUserForm.email.value !== newUserForm.email2.value) {
            alert("Emails are not equal");
        } else {
            let newUser = new User({
                name: (newUserForm.name as any).value,
                email: newUserForm.email.value,
                password: newUserForm.password.value,
                avatar: imagePreview.src
            });

            await Auth.register(newUser);
            location.assign('index.html');
        }
    });
});