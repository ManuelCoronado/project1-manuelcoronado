import { Post } from './classes/post.class';
import { User } from './classes/user.class';
import { mapboxgl } from '../node_modules/mapbox-gl';
import { MapboxGeocoder } from '@mapbox/mapbox-gl-geocoder';
import { Http } from './classes/http.class';
import { PositionOptions } from 'mapbox-gl';
import { Auth } from './classes/auth.class';

let container: HTMLElement;
let search: String = '';
let posts = [];
let postId: number;
let post: Post;
let logout = null;

let comments;
let commentList;
async function loadPost(postId) {
    post = await Post.get(postId);
    showPosts(post);
}

async function loadComment(postId) {
    //comments = await getComments();
    /*
    <li class="list-group-item d-flex flex-row" >
        <div>
        <img class="rounded-circle mr-3" style = "wpostIdth: 40px;" src = "http://localhost:3000/img/profile.jpg" alt = "" >
            </div>
            < div >
            <div><strong>User's name: </strong>Comment text....</div>
                < small > 03 / 10 / 2018 15: 26: 24 < /small>
                    < /div>
                    < /li>*/
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
    let url = location.search;
    let split = url.split('=');
    postId = parseInt(split[1]);
    container = document.getElementById("cardContainer");
    commentList = document.getElementById("comments");
    loadPost(postId);

    logout = document.getElementById("logout") as HTMLLinkElement;
    logout.addEventListener("click", Auth.logout());

    document.getElementById("search").addEventListener("keyup", e => {
        search = (<HTMLInputElement>e.target).value;
        showPosts(posts);
    });
});