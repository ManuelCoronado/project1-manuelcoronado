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
let posts;
let logout = null;
function loadPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        posts = yield Post.getAll();
        showPosts(posts);
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
    container = document.getElementById("postContainer");
    loadPosts();
    logout = document.getElementById("logout");
    logout.addEventListener("click", Auth.logout());
    document.getElementById("search").addEventListener("keyup", e => {
        search = e.target.value;
        showPosts(posts);
    });
});
//# sourceMappingURL=index.js.map