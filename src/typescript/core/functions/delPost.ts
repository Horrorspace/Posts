import { IPostInstance } from '@core/interfaces/IPost'
import { from, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function delPost(post: IPostInstance): Promise<void> {
    return new Promise(resolve => {
        const id: number = post.getId();
        const delUrl = `${url}/${id}`;
        const data$ = ajax({
            url: delUrl,
            method: 'DELETE',
            body: JSON.stringify(id)
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