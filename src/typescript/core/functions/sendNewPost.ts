import { IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import { from, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'


const url: string = 'https://jsonplaceholder.typicode.com/posts';


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
