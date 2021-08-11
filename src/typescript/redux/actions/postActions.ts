import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction} from '@redux/interfaces/IRedux'

export const downloadPosts = (): IreduxAction => {
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
