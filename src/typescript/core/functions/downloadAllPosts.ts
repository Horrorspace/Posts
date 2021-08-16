import { IPostData, IPostInstance, IPosts } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import { from, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function downloadAllPosts(): Promise<IPosts> {
    return new Promise(resolve => {
        const headers = {
            'Content-Type': 'application/json'
        };
        const posts: IPosts = new Posts();
        const data$ = ajax.getJSON(url, headers).pipe(
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
