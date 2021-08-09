import React from 'react'
import { from, Observable } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'

import { IPost, IPostData, IPostInstance, IPosts } from '@core'
import {postCheck} from './src/typescript/core/functions/postCheck'
//import userData from '@core/classes/userData'



abstract class userData {
    protected id: number
    
    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id
    }
}

class Post extends userData implements IPostInstance {
    private title: string;
    private body: string;

    constructor({id, title, body}: IPost) {
        super(id);
        this.title = title;
        this.body = body;
    }

    public getTitle(): string {
        return this.title
    }
    public getBody(): string {
        return this.body
    }

    public setTitle(title: string): void {
        this.title = title
    }
    public setBody(body: string): void {
        this.body = body
    }
} 

class Posts implements IPosts {
    private posts: IPostInstance[]

    constructor() {
        this.posts = []
    }

    public checkId(id: number): boolean {
        return this.posts.filter(post => post.getId() === id).length > 0
    }
    public getAllPosts(): IPostInstance[] {
        return this.posts
    } 
    public getPostById(id: number): IPostInstance {
        if(this.checkId(id)) {
            return this.posts.filter(post => post.getId() === id)[0]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
    public getPostByNumber(num: number): IPostInstance {
        if(this.posts.length < num + 1) {
            return this.posts[num]
        }
        else {
            throw 'post with this number is not exist'
        }
    } 
    public addPost(Post: IPostInstance): void {
        if(!this.checkId(Post.getId())) {
            this.posts = [...this.posts, Post]
        }
        else {
            throw 'post id is not unique'
        }
    } 
    public editPost(Post: IPostInstance): void {
        if(this.checkId(Post.getId())) {
            const i: number = this.posts.indexOf(Post);
            this.posts = [...this.posts.slice(0, i), Post, ...this.posts.slice(i + 1)]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
    public removePostById(id: number): void {
        if(this.checkId(id)) {
            const Post: IPostInstance = this.getPostById(id);
            const i: number = this.posts.indexOf(Post);
            this.posts = [...this.posts.slice(0, i), ...this.posts.slice(i + 1)]
        }
        else {
            throw 'post with this id is not exist'
        }
    } 
}


const posts: IPosts = new Posts();
const url: string = 'https://jsonplaceholder.typicode.com/posts';
const data$ = ajax.getJSON(url).pipe(
    switchMap((val: any) => from(val)),
    filter((val: any) => typeof(val) === 'object'),
    filter((val: any) => postCheck(val)),
    map((val: IPostData): IPost => {
        return{
            id: val.id,
            title: val.title,
            body: val.title
        }
    }),
    map((val: IPost): IPostInstance => new Post(val))
);
data$.subscribe((val: IPostInstance) => {
    posts.addPost(val);
    console.log(posts.getAllPosts());
});



export const App: React.FC = () => {
    return (
        <div>
            Hello
        </div>
    )
}
