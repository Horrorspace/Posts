import { INewPost } from '@core/interfaces/IPost'
import { Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default function sendNewPost(post: INewPost): Promise<void> {
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