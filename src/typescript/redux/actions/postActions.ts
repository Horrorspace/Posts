import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction} from '@redux/interfaces/IRedux'
import { IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import downloadPosts from '@core/functions/downloadPosts'


export const downloadPosts = (): IreduxAction => {
    return async (dispatch) => {
        const posts: IPosts = await downloadPosts();
        dispatch(updatePosts(posts));
    }
    
    return {
        type: PostActTypes.downloadPosts,
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
        type: PostActTypes.putPost,
        posts
    }
};
export const updatePosts = (): IreduxAction => {
    return {
        type: PostActTypes.setDefault,
    }
};
