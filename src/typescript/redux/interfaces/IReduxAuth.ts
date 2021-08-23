import { ILoginRes } from '@core/interfaces/IUser'
import {ThunkAction} from 'redux-thunk'
import { AnyAction } from 'redux'

export interface IreduxAuthAction {
    type: string;
    token?: string;
    userId?: number;
    message?: string;
    isShow?: boolean;
    isLogin?: boolean;
}

export interface IreduxAuthState extends ILoginRes {
    message: string;
    isShow: boolean;
    isLogin: boolean;
}



export type IThunkAuthAction = ThunkAction<void, IreduxAuthState, unknown, AnyAction>
export type IThunkAuthState = () => IreduxAuthState
export type IAction = IreduxAuthAction | IThunkAuthAction