import {authActTypes} from '@redux/types/authActTypes'
import {IreduxAuthAction, IThunkAuthAction} from '@redux/interfaces/IReduxAuth'
import { IUser, ILoginRes } from '@core/interfaces/IUser'
import login from '@core/functions/login'
import register from '@core/functions/register'
import { Dispatch } from 'react'


export const setLogin = ({token, userId}: ILoginRes): IreduxAuthAction => {
    return {
        type: authActTypes.setLogin,
        token,
        userId
    }
};
export const clearLogin = (): IreduxAuthAction => {
    return {
        type: authActTypes.clearLogin,
        token: '',
        userId: 0
    }
};
export const setMessage = (message: string): IreduxAuthAction => {
    return {
        type: authActTypes.setMessage,
        message
    }
};
export const toggleShow = (): IreduxAuthAction => {
    return {
        type: authActTypes.toggleShow
    }
};
export const toLogin = (user: IUser): IThunkAuthAction => {
    return async (dispatch: Dispatch<IreduxAuthAction>): Promise<void> => {
        const userData: ILoginRes = await login(user);
        dispatch(setLogin(userData));
    }
};
export const toRegister = (user: IUser): IThunkAuthAction => {
    return async (dispatch: Dispatch<IreduxAuthAction | IThunkAuthAction>): Promise<void> => {
        const message: string = await register(user);
        dispatch(setMessage(message));
        dispatch(toLogin(user));
    }
};