var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Post } from './classes/post.class';
import { Auth } from './classes/auth.class';
let newPostForm = null;
let errorMsg = null;
let imagePreview = null;
let logout = null;
function convertBase64(file) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        imagePreview.src = reader.result;
    }, false);
    if (file) { // File has been selected (convert to Base64)
        reader.readAsDataURL(file);
    }
}
function validateForm(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        let title = newPostForm.title.trim();
        let image = newPostForm.image.value ? document.getElementById("imgPreview").src : '';
        let description = newPostForm.description.value.trim();
        let mood = +newPostForm.mood.value;
        if ((!title && !image && !description) || !mood) {
            errorMsg.classList.remove("hidden");
            setTimeout(() => errorMsg.classList.add("hidden"), 3000);
        }
        else {
            try {
                let newPost = new Post({
                    title,
                    image,
                    description,
                    mood,
                    lat: newPostForm.lat.value,
                    lng: newPostForm.lng.value,
                    place: newPostForm.place.value,
                    date: newPostForm.date.place,
                });
                yield newPost.post();
                location.assign("index.html");
            }
            catch (e) {
                alert(e);
            }
        }
    });
}
function loadImage(event) {
    Auth.checkToken();
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file)
        reader.readAsDataURL(file);
    reader.addEventListener('load', e => {
        document.getElementById("imgPreview").src = reader.result;
    });
}
window.addEventListener("DOMContentLoaded", e => {
    newPostForm = document.getElementById("newPlace");
    errorMsg = document.getElementById("errorMsg");
    logout = document.getElementById("logout");
    logout = document.getElementById("logout");
    logout.addEventListener("click", Auth.logout());
    newPostForm.image.addEventListener('change', loadImage);
    newPostForm.addEventListener('submit', validateForm);
});
//# sourceMappingURL=add-post.js.map