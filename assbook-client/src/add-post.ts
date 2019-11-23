import { Post } from './classes/post.class';
import { mapboxgl } from '../node_modules/mapbox-gl';
import { MapboxGeocoder} from '@mapbox/mapbox-gl-geocoder';

let newPostForm: HTMLFormElement = null;
let errorMsg: HTMLDivElement = null;
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

async function validateForm(event) {
    event.preventDefault();
    let title: string = newPostForm.title.trim();
    let image = newPostForm.image.value ? (document.getElementById("imgPreview") as HTMLImageElement).src : '';
    let description = newPostForm.description.value.trim();
    let mood = +newPostForm.mood.value;

    if ((!title && !image && !description) || !mood) {
        errorMsg.classList.remove("hidden");
        setTimeout(() => errorMsg.classList.add("hidden"), 3000)
    } else {
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
            await newPost.post();
            location.assign("index.html");
        } catch (e) {
            alert(e);
        }
    }
}

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    if (file) reader.readAsDataURL(file);

    reader.addEventListener('load', e => {
        (document.getElementById("imgPreview") as HTMLImageElement).src = reader.result as string;
    });
}

window.addEventListener("DOMContentLoaded", e => {
    newPostForm = document.getElementById("newPlace") as HTMLFormElement;
    errorMsg = document.getElementById("errorMsg") as HTMLDivElement;

    newPostForm.image.addEventListener('change', loadImage);

    newPostForm.addEventListener('submit', validateForm);
});