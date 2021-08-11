import {Reducer} from 'redux'
import {PostActTypes} from '@redux/types/PostActTypes'
import { from, Observable, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import {IreduxAction, IreduxState} from '@redux/interfaces/IRedux'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
//import downloadPosts from '@core/functions/downloadPosts'
//import sendNewPost from '@core/functions/sendNewPost'



const url: string = 'https://jsonplaceholder.typicode.com/posts';
const testPost: INewPost = {
    title: 'Hey',
    body: 'Test',
    userId: 7
} 

function downloadPosts(): Promise<IPosts> {
    return new Promise(resolve => {
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
                resolve(posts)
            }
        });
    })
}

console.log(downloadPosts().then(val => console.log(val.getAllPosts)));

function sendNewPost(post: INewPost): Promise<void> {
    return new Promise(resolve => {
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
            })
        );
        const sub: Subscription = data$.subscribe({
            complete: () => {
                resolve();
            }
        });
    })
}

function putPost(post: IPostInstance): Promise<void> {
    return new Promise(resolve => {
        const putUrl = `${url}/${post.getId()}`;
        const data$ = ajax({
            url: putUrl,
            method: 'PUT',
            body: JSON.stringify(post)
        }).pipe(
            map((res) => {
                console.log(res);
            })
        );
        const sub: Subscription = data$.subscribe({
            complete: () => {
                resolve();
            }
        });
    })
}


const defaultState: IreduxState = {
    posts: new Posts(),
    isDataUpdating: false
};

export const postReducer: Reducer = (state: IreduxState = defaultState, action: IreduxAction): IreduxState => {
    switch (action.type) {
        case PostActTypes.downloadPosts:
            downloadPosts();
            return {
                ...state,
                isDataUpdating: false
            }
        case PostActTypes.sendNewPost:
            if(action.post) {
                sendNewPost(action.post);
                return {
                    ...state,
                    isDataUpdating: false
                }
            }
            else {
                return state
            }
        case PostActTypes.putPost:
            return {
                ...state,
                isDataUpdating: false
            }
        default:
            return state
    }
}
