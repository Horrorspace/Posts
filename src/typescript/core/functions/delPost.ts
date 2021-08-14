import { IPostInstance } from '@core/interfaces/IPost'
import { from, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function delPost(post: IPostInstance): Promise<void> {
    return new Promise(resolve => {
        const putUrl = `${url}/${post.getId()}`;
        const data$ = ajax({
            url: putUrl,
            method: 'DELETE',
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