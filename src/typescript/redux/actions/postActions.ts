import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction, IThunkAction, IreduxState, IThunkState} from '@redux/interfaces/IRedux'
import { IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import downloadAllPosts from '@core/functions/downloadAllPosts'
import sendNewPostFunc from '@core/functions/sendNewPost'
import putPostFunc from '@core/functions/putPost'
import delPostFunc from '@core/functions/delPost'
import { Dispatch } from 'react'


export const setUpdating = (): IreduxAction => {
    return {
        type: PostActTypes.setUpdating,
    }
};
export const downloadPosts = (): IThunkAction => {
    console.log('dispatch');
    return async (dispatch: Dispatch<IreduxAction>): Promise<void> => {
        const posts: IPosts = await downloadAllPosts();
        console.log(posts);
        dispatch(updatePosts(posts));
    }
};
export const sendNewPost = (newPost: INewPost): IThunkAction => {
    return async (dispatch: Dispatch<IreduxAction>): Promise<void> => {
        await sendNewPostFunc(newPost);
        dispatch(setUpdating());
    }
};
export const putPost = (post: IPostInstance): IThunkAction => {
    return async (dispatch: Dispatch<IreduxAction>): Promise<void> => {
        await putPostFunc(post);
        dispatch(setUpdating());
    }
};
export const delPost = (post: IPostInstance): IThunkAction => {
    return async (dispatch: Dispatch<IreduxAction>): Promise<void> => {
        await delPostFunc(post);
        dispatch(setUpdating());
    }
};
export const updatePosts = (posts: IPosts): IreduxAction => {
    console.log(posts)
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
