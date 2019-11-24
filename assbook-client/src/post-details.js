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
let container;
let search = '';
let posts = [];
let postId;
let post;
let logout = null;
let comments;
let commentList;
function loadPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        post = yield Post.get(postId);
        showPosts(post);
    });
}
function loadComment(postId) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
function showPosts(posts) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    posts.forEach(p => {
        if (search === '' || (p.title && p.title.toLowerCase().includes(search.toLowerCase())) ||
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()))) {
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
    logout = document.getElementById("logout");
    logout.addEventListener("click", Auth.logout());
    document.getElementById("search").addEventListener("keyup", e => {
        search = e.target.value;
        showPosts(posts);
    });
});
//# sourceMappingURL=post-details.js.map