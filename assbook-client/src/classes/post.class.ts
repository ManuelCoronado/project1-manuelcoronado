import { SERVER } from '../constants';
import { Http } from './http.class';
import { IComment } from '../interfaces/icomment';
import { IPost } from '../interfaces/post.interface';
import * as moment from 'moment';

const postTemplate = require('../../templates/post.handlebars');

export class Post implements IPost {
    id: number;
    title?: string;
    description?: string;
    mood: number;
    image?: string;
    lat?: number;
    lng?: number;
    place?: string;
    date?: string;
    totalLikes?: number;
    vote?: { likes: boolean; };
    creator?: import("../interfaces/user.interface").IUser;
    mine?: boolean;
    constructor(postJSON: IPost) {
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
    static async getAll(): Promise<Post[]> {
        const resp = await Http.get(`${SERVER}/posts/`);
        return resp.posts.map(p => new Post(p));
    }
    static async get(id: number): Promise<Post> {
        const resp = await Http.get(`${SERVER}/posts/`);
        return resp.posts.map(p => p.id == id);
    }
    async post(): Promise<Post> {
        const resp = await Http.post(`${SERVER}/posts`, this);
        return new Post(resp.post);
    }
    async delete(): Promise<void> {
        return Http.delete(`${SERVER}/posts/${this.id}`);
    }
    async getComments(): Promise<IComment[]> {
        const resp = await Http.get(`${SERVER}/comments`);
        return resp.comment.map(p => new Post(p));
    }
    async addComment(comment: IComment): Promise<IComment> {
        const resp = await Http.post(`${SERVER}/posts/${this.id}/comments`, this);
        return comment; //Fix
    }

    async postVote(likes) {
        const resp = await Http.post(`${SERVER}/posts/${this.id}/likes`, { likes });
        return resp.totalLikes;
    }

    async deleteVote() {
        const resp = await Http.delete(`${SERVER}/posts/${this.id}/likes`);
        return resp.totalLikes;
    }

    toHTML(): HTMLDivElement {
        const card:HTMLDivElement = document.createElement('div');
        card.classList.add('card', 'mb-4', 'shadow');
        switch (this.mood) {
            case 2:
                card.classList.add('border-success');
                break;
            case 3:
                card.classList.add('border-danger');
        }

        let postJSON = { ...this }; // Copy post
        postJSON.image = this.image ? SERVER + '/' + this.image : '';
        postJSON.creator = { ...this.creator, avatar: SERVER + '/' + this.creator.avatar }; // Copy creator object
        postJSON.date = moment(this.date).fromNow();
        let post = postTemplate(postJSON);
        console.log(postJSON);

        card.innerHTML = post;

        const like: HTMLElement = card.querySelector('i.fa-thumbs-up');
        const dislike: HTMLElement = card.querySelector('i.fa-thumbs-down');
        const likes: HTMLElement = card.querySelector('small.likes');

        like.addEventListener('click', async () => {
            let total;
            if (this.vote && this.vote.likes) { // Already voted this (delete like)
                total = await this.deleteVote();
                dislike.classList.remove("text-muted");
                dislike.classList.add("text-danger");
                this.vote = null;
            } else { // New vote
                total = await this.postVote(true);
                like.classList.remove("text-muted");
                like.classList.add("text-primary");
                dislike.classList.add("text-muted");
                dislike.classList.remove("text-danger");
                this.vote = { likes: true };
            }
            this.totalLikes = total;
            likes.innerText = `${total} likes`;
        });

        dislike.addEventListener('click', async () => {
            let total;
            if (this.vote && !this.vote.likes) { // Already voted this (delete like)
                total = await this.deleteVote();
                like.classList.remove("text-muted");
                like.classList.add("text-primary");
                this.vote = null;
            } else { // New vote
                total = await this.postVote(false);
                like.classList.add("text-muted");
                like.classList.remove("text-primary");
                dislike.classList.remove("text-muted");
                dislike.classList.add("text-danger");
                this.vote = { likes: false };
            }
            this.totalLikes = total;
            likes.innerText = `${total} likes`;
        });

        return card;
    }
}