import { IPostInstance, IPostData } from '@core/interfaces/IPost'
import { Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function putPost(post: IPostInstance): Promise<void> {
    return new Promise(resolve => {
        const putUrl = `${url}${post.getId()}`;
        const postBody: IPostData = {
            id: post.getId(),
            title: post.getTitle(),
            body: post.getBody(),
            userId: post.getUserId()
        }
        const data$ = ajax({
            url: putUrl,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
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
