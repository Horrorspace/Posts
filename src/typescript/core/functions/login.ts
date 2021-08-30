import { IUser, ILoginRes } from '@core/interfaces/IUser'
import { Subscription } from 'rxjs'
import { ajax, AjaxResponse } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { authUrl } from '@core/constants/urlConst'


export default function login(user: IUser): Promise<ILoginRes> {
    return new Promise(resolve => {
        let success: boolean;
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
                const status: number = val.status;
                return status;
            })
        );
        const sub: Subscription = data$.subscribe({
            next: (status) => {
                if(status == 200) {
                    success = true
                }
                else {
                    success = false
                }
            },
            complete: () => {
                resolve(status);
            }
        });
    })
}
