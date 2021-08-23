import { IUser } from '@core/interfaces/IUser'
import { Subscription } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { authUrl } from '@core/constants/urlConst'

interface IMessage {
    message: string;
}

export default function register(user: IUser): Promise<string> {
    return new Promise(resolve => {
        let response: string;
        const url = `${authUrl}register`;
        const data$ = ajax({
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).pipe(
            map((val: AjaxResponse<any>) => {
                console.log(val);
                const res: Response = val.response as Response;
                return res as unknown;
            })
        );
        const sub: Subscription = data$.subscribe({
            next: (val) => {
                const data = val as IMessage;
                const {message} = data;
                response = message;
            },
            complete: () => {
                resolve(response);
            }
        });
    })
}