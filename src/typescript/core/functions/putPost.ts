import { IPostData, IPostInstance, IPosts } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import { from, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'


const url: string = 'https://jsonplaceholder.typicode.com/posts';

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
