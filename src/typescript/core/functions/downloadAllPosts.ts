import { IPostData, IPostInstance, IPosts } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import { from, Subscription } from 'rxjs'
import {fromFetch} from 'rxjs/fetch'
import { ajax, AjaxConfig } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/operators'
import { url } from '@core/constants/urlConst'


export default async function downloadAllPosts(): Promise<IPosts> {
    const headers = {
        'Content-Type': 'application/json',
    };

    const respons: Response = await fetch(url, {
        headers,
        mode: 'no-cors'
    });
    console.log(respons);
    const rawData: any = await respons.json();
    console.log(rawData);


    return new Promise(resolve => {
        const posts: IPosts = new Posts();
        const data$ = from(rawData).pipe(
            filter((val: any) => typeof(val) === 'object'),
            filter((val: any) => postCheck(val)),
            map((val: IPostData): IPostInstance => new Post(val))
        )
        const sub: Subscription = data$.subscribe({
            next: (val: IPostInstance) => {
                posts.addPost(val);
            },
            complete: () => {
                resolve(posts)
            }
        });
    })

    
    
    // return new Promise(resolve => {
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Origin': 'http://37.193.148.113:3007',
    //         'Accept': 'application/json'
    //     };
    //     const ajaxOptions: AjaxConfig = {
    //         url,
    //         headers,
    //         withCredentials: true,
    //         crossDomain: true
    //     }
    //     const posts: IPosts = new Posts();
    //     // const data$ = ajax.getJSON(url, headers).pipe(
    //     //     //map((val) => console.log(val)),
    //     //     switchMap((val: any) => from(val)),
    //     //     filter((val: any) => typeof(val) === 'object'),
    //     //     filter((val: any) => postCheck(val)),
    //     //     map((val: IPostData): IPostInstance => new Post(val))
    //     // );
    //     const data$ = ajax(url).pipe(
    //         map(val => {
    //             console.log(val);
    //             return val.response as string
    //         }),
    //         map(val => JSON.parse(val)),
    //         switchMap((val: any) => from(val)),
    //         filter((val: any) => typeof(val) === 'object'),
    //         filter((val: any) => postCheck(val)),
    //         map((val: IPostData): IPostInstance => new Post(val))
    //     );
    //     const sub: Subscription = data$.subscribe({
    //         next: (val: IPostInstance) => {
    //             posts.addPost(val);
    //         },
    //         complete: () => {
    //             resolve(posts)
    //         }
    //     });
    // })

}
