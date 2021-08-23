import { IUser, ILoginRes } from '@core/interfaces/IUser'
import { Subscription } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { authUrl } from '@core/constants/urlConst'


export default function login(user: IUser): Promise<ILoginRes> {
    return new Promise(resolve => {
        let response: ILoginRes;
        const url = `${authUrl}login`;
        const data$ = ajax({
            url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).pipe(
            map((val: AjaxResponse<any>) => {
                const res: Response = val.response as Response;
                return res as unknown;
            })
        );
        const sub: Subscription = data$.subscribe({
            next: (val) => {
                const data = val as ILoginRes;
                const {userId, token} = data;
                response = {userId, token};
            },
            complete: () => {
                resolve(response);
            }
        });
    })
}