import { Post } from './classes/post.class';
import { User } from './classes/user.class';
import { mapboxgl } from '../node_modules/mapbox-gl';
import { MapboxGeocoder } from '@mapbox/mapbox-gl-geocoder';
import { Http } from './classes/http.class';
import { PositionOptions } from 'mapbox-gl';
import { Auth } from './classes/auth.class';

let container: HTMLElement;
let search: String = '';
let posts: Post[];
let logout = null;

async function loadPosts() {
    posts = await Post.getAll();
    showPosts(posts);
}

function showPosts(posts) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    posts.forEach(p => {
        if (search === '' || (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
        ) {
            container.appendChild(p.toHTML());
        }
    });
}

window.addEventListener("DOMContentLoaded", e => {
    Auth.checkToken();
    container = document.getElementById("postContainer");
    loadPosts();

    logout = document.getElementById("logout") as HTMLLinkElement;
    logout.addEventListener("click", Auth.logout());

    document.getElementById("search").addEventListener("keyup", e => {
        search = (<HTMLInputElement>e.target).value;
        showPosts(posts);
    });
});