import React from 'react'
import { from, Observable, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'

import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'



const url: string = 'https://jsonplaceholder.typicode.com/posts';
const testPost: INewPost = {
    title: 'Hey',
    body: 'Test',
    userId: 7
} 

function downloadPosts(): void {
    const posts: IPosts = new Posts();
    const data$ = ajax.getJSON(url).pipe(
        switchMap((val: any) => from(val)),
        filter((val: any) => typeof(val) === 'object'),
        filter((val: any) => postCheck(val)),
        map((val: IPostData): IPostInstance => new Post(val))
    );
    const sub: Subscription = data$.subscribe({
        next: (val: IPostInstance) => {
            posts.addPost(val);
        },
        complete: () => {
            console.log(posts.getAllPosts());
        }
    });
}

function sendNewPost(post: INewPost): void {
    const data$ = ajax({
        url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).pipe(
        map((res) => {
            console.log(res);
            downloadPosts();
        })
    );
    const sub: Subscription = data$.subscribe({
        next: (val) => {
            console.log(val);
        }
    });
}


sendNewPost(testPost);




export const App: React.FC = () => {
    return (
        <div>
            Hello
        </div>
    )
}