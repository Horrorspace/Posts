import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction, IThunkAction, IreduxState} from '@redux/interfaces/IRedux'
import { IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import downloadAllPosts from '@core/functions/downloadAllPosts'
import { Dispatch } from 'react'


export const downloadPosts = (): IThunkAction => {
    return async (dispatch: Dispatch<IreduxAction>): Promise<void> => {
        const posts: IPosts = await downloadAllPosts();
        dispatch(updatePosts(posts));
    }
};
export const sendNewPost = (newPost: INewPost): IreduxAction => {
    return {
        type: PostActTypes.sendNewPost,
        newPost
    }
};
export const putPost = (post: IPostInstance): IreduxAction => {
    return {
        type: PostActTypes.putPost,
        post
    }
};
export const updatePosts = (posts: IPosts): IreduxAction => {
    return {
        type: PostActTypes.updatePosts,
        posts
    }
};
export const setDefault = (): IreduxAction => {
    return {
        type: PostActTypes.setDefault,
    }
};
