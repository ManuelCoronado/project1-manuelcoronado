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
let newLoginForm: HTMLFormElement = null;

//Add geolocation
document.addEventListener('DOMContentLoaded', async e => {
    newLoginForm = document.getElementById("form-login") as HTMLFormElement;
    
    newLoginForm.addEventListener('submit', async e => {
        e.preventDefault();
        let email: string = newLoginForm.email.value;
        let password: string = newLoginForm.password.value;
        let newLoginUser: User = new User ({
            email: email,
            password: password
        });
        await Auth.login(newLoginUser);
        location.assign('index.html');
    });
});