import { IPostInstance } from '@core/interfaces/IPost'
import { Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function putPost(post: IPostInstance): Promise<void> {
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
