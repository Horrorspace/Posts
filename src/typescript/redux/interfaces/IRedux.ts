import { IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import {ThunkAction} from 'redux-thunk'
import { AnyAction } from 'redux'

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
    post: IreduxState
}

export type IThunkAction = ThunkAction<void, IreduxState, unknown, AnyAction>
export type IAction = IreduxAction | IThunkAction