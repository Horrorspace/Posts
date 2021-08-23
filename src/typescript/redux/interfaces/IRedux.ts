import { IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import {IreduxAuthState} from '@redux/interfaces/IReduxAuth'
import {ThunkAction} from 'redux-thunk'
import { AnyAction } from 'redux'
import { from } from 'rxjs'

export interface IreduxAction {
    type: string;
    newPost?: INewPost;
    post?: IPostInstance;
    posts?: IPosts;
}

export interface IreduxState {
    posts: IPosts;
    isDataUpdating: Boolean;
}

export interface IRootReducer {
    post: IreduxState,
    auth: IreduxAuthState
}

export type IThunkAction = ThunkAction<void, IreduxState, unknown, AnyAction>
export type IThunkState = () => IreduxState
export type IAction = IreduxAction | IThunkAction