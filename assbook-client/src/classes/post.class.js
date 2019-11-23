var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SERVER } from '../constants';
import { Http } from './http.class';
import * as moment from 'moment';
const postTemplate = require('../../templates/post.handlebars');
export class Post {
    constructor(postJSON) {
        this.id = postJSON.id;
        this.title = postJSON.title;
        this.description = postJSON.description;
        this.mood = postJSON.mood;
        this.image = postJSON.image;
        this.lat = postJSON.lat;
        this.lng = postJSON.lng;
        this.place = postJSON.place;
        this.date = postJSON.date;
        this.totalLikes = postJSON.totalLikes;
        this.vote = postJSON.vote;
        this.creator = postJSON.creator;
        this.mine = postJSON.mine;
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.get(`${SERVER}/posts/`);
            return resp.posts.map(p => new Post(p));
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.get(`${SERVER}/posts/`);
            return resp.posts.map(p => p.id == id);
        });
    }
    post() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.post(`${SERVER}/posts`, this);
            this.id = resp.post.id;
            this.title = resp.post.title;
            this.description = resp.post.description;
            this.mood = resp.post.mood;
            this.image = resp.post.image;
            this.lat = resp.post.lat;
            this.lng = resp.post.lng;
            this.place = resp.post.place;
            this.date = resp.post.date;
            return new Post(resp.post);
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            return Http.delete(`${SERVER}/posts/${this.id}`);
        });
    }
    getComments() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.get(`${SERVER}/comments`);
            return resp.comment.map(p => new Post(p));
        });
    }
    addComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.post(`${SERVER}/posts/${this.id}/comments`, this);
            return comment; //Fix
        });
    }
    postVote(likes) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.post(`${SERVER}/posts/${this.id}/likes`, { likes });
            return resp.totalLikes;
        });
    }
    deleteVote() {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield Http.delete(`${SERVER}/posts/${this.id}/likes`);
            return resp.totalLikes;
        });
    }
    toHTML() {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-4', 'shadow');
        switch (this.mood) {
            case 2:
                card.classList.add('border-success');
                break;
            case 3:
                card.classList.add('border-danger');
        }
        let postJSON = Object.assign({}, this); // Copy post
        postJSON.image = this.image ? SERVER + '/' + this.image : '';
        postJSON.creator = Object.assign(Object.assign({}, this.creator), { avatar: SERVER + '/' + this.creator.avatar }); // Copy creator object
        postJSON.date = moment(this.date).fromNow();
        let post = postTemplate(postJSON);
        console.log(postJSON);
        card.innerHTML = post;
        const like = card.querySelector('i.fa-thumbs-up');
        const dislike = card.querySelector('i.fa-thumbs-down');
        const likes = card.querySelector('small.likes');
        like.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            let total;
            if (this.vote && this.vote.likes) { // Already voted this (delete like)
                total = yield this.deleteVote();
                dislike.classList.remove("text-muted");
                dislike.classList.add("text-danger");
                this.vote = null;
            }
            else { // New vote
                total = yield this.postVote(true);
                like.classList.remove("text-muted");
                like.classList.add("text-primary");
                dislike.classList.add("text-muted");
                dislike.classList.remove("text-danger");
                this.vote = { likes: true };
            }
            this.totalLikes = total;
            likes.innerText = `${total} likes`;
        }));
        dislike.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            let total;
            if (this.vote && !this.vote.likes) { // Already voted this (delete like)
                total = yield this.deleteVote();
                like.classList.remove("text-muted");
                like.classList.add("text-primary");
                this.vote = null;
            }
            else { // New vote
                total = yield this.postVote(false);
                like.classList.add("text-muted");
                like.classList.remove("text-primary");
                dislike.classList.remove("text-muted");
                dislike.classList.add("text-danger");
                this.vote = { likes: false };
            }
            this.totalLikes = total;
            likes.innerText = `${total} likes`;
        }));
        return card;
    }
}
//# sourceMappingURL=post.class.js.map