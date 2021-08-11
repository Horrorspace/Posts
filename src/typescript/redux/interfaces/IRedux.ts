import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'


export interface IreduxAction {
    type: string;
    post?: INewPost;
    posts?: IPosts;
}

export interface IreduxState {
    posts: IPosts;
    isDataUpdating: Boolean;
}